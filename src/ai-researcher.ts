import fetch from 'node-fetch';
import { AIAnalysis, EnrichedMarket, ScreenedMarket } from './types';

interface ExaResult {
  title: string;
  url: string;
  publishedDate?: string;
  author?: string;
  text: string;
}

/**
 * Uses Exa for web research + OpenAI o4-mini for reasoning
 */
export class AIResearcher {
  private activeCalls = 0;
  private readonly maxConcurrentCalls: number;
  private readonly minDelayMs = 100;
  private readonly verboseLogs: boolean;
  
  // Exa-specific rate limiting (5 QPS limit)
  private activeExaCalls = 0;
  private readonly maxConcurrentExaCalls = 5; // Stay under 5 QPS limit
  private lastExaCallTime = 0;
  private readonly minExaDelayMs = 250; // 4 calls per second max

  constructor(
    private openaiApiKey: string,
    private exaApiKey: string,
    maxConcurrentCalls: number = 10,
    verboseLogs: boolean = false
  ) {
    this.maxConcurrentCalls = maxConcurrentCalls;
    this.verboseLogs = verboseLogs;
  }

  /**
   * Analyze a screened market using web research + AI reasoning
   * Returns a default "skip" analysis if any errors occur
   * @param screenedMarket - The market to analyze
   * @param logBuffer - Optional array to collect log messages instead of outputting directly
   */
  async analyzeMarket(screenedMarket: ScreenedMarket, logBuffer?: string[]): Promise<AIAnalysis> {
    while (this.activeCalls >= this.maxConcurrentCalls) {
      await this.sleep(50);
    }

    this.activeCalls++;
    const startTime = Date.now();

    const log = (message: string) => {
      if (logBuffer) {
        logBuffer.push(message);
      } else {
        console.log(message);
      }
    };

    try {
      const { market, reason } = screenedMarket;

      log(`   🔍 Researching market...`);

      // Step 1: Generate optimal search query using GPT-4o-mini
      const searchQuery = await this.generateSearchQuery(market.question, market.description, reason, logBuffer);
      log(`   🔎 Search query: "${searchQuery}"`);

      // Step 2: Perform web research using Exa with optimized query
      const exaResults = await this.researchWithExa(searchQuery, logBuffer);
      const researchContext = this.formatExaResults(exaResults);
      log(`   📚 Found ${exaResults.length} relevant sources`);

      // Step 3: Use o4-mini for reasoning
      log(`   🤖 Running AI reasoning...`);
      const prompt = this.buildReasoningPrompt(
        market.question,
        market.description,
        reason,
        market.mainProbability,
        researchContext
      );
      
      const response = await this.callOpenAIO1Mini(prompt);
      
      // Log the full response for debugging (only if verbose logging is enabled)
      if (this.verboseLogs) {
        log(`\n${'='.repeat(80)}`);
        log(`AI RESPONSE FOR: ${market.question.substring(0, 70)}...`);
        log(`${'='.repeat(80)}`);
        log(response);
        log(`${'='.repeat(80)}\n`);
      }

      return this.parseAIResponse(market.conditionId, market.question, response);
    } catch (error) {
      // Log error but don't fail the job - return a skip analysis
      const errorMsg = `   ❌ Failed to analyze market: ${error instanceof Error ? error.message : error}`;
      log(errorMsg);
      log(`   ⏭️  Skipping this market and continuing...`);
      
      // Return a default "skip" analysis so the job can continue
      return {
        marketId: screenedMarket.market.conditionId,
        question: screenedMarket.market.question,
        fullAnalysis: `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        summary: 'Analysis failed due to API error',
        confidence: 'low',
        suggestedAction: 'skip',
      };
    } finally {
      // Ensure minimum delay between calls
      const elapsed = Date.now() - startTime;
      if (elapsed < this.minDelayMs) {
        await this.sleep(this.minDelayMs - elapsed);
      }
      this.activeCalls--;
    }
  }

  /**
   * Sleep helper
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate an optimal search query using GPT-4o-mini
   */
  private async generateSearchQuery(question: string, description: string, metrics: string, logBuffer?: string[]): Promise<string> {
    const log = (message: string) => {
      if (logBuffer) {
        logBuffer.push(message);
      }
    };

    try {
      const prompt = `You are a research assistant helping to find information about a prediction market.

MARKET QUESTION:
${question}

MARKET DESCRIPTION & RULES:
${description}

MARKET METRICS:
${metrics}

TASK:
Generate an optimal search query to find relevant discussions, news, and analysis about this market. The search will be used on Twitter, Reddit, news sites, and forums.

GUIDELINES:
- Focus on the core topic/event
- Include key entities (people, organizations, events, dates)
- Keep it concise (max 100 words)
- Use natural language that would appear in discussions
- If there are multiple aspects to research, focus on the most uncertain/important one

OUTPUT:
Provide ONLY the search query, nothing else.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3, // Low temperature for focused output
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        let errorMessage = '';
        
        try {
          const errorJson = JSON.parse(errorBody);
          errorMessage = errorJson.error?.message || errorBody;
        } catch {
          errorMessage = errorBody;
        }

        // Log different error types with helpful context
        if (response.status === 429) {
          log(`   ⚠️  OpenAI rate limit hit for search query generation (429)`);
          log(`   Consider reducing MAX_CONCURRENT_ANALYSES or upgrading your OpenAI tier`);
        } else if (response.status === 401) {
          log(`   ❌ OpenAI authentication failed (401) - check your OPENAI_API_KEY`);
        } else if (response.status === 400) {
          log(`   ⚠️  OpenAI bad request (400): ${errorMessage.substring(0, 200)}`);
        } else {
          log(`   ⚠️  OpenAI API error (${response.status}): ${errorMessage.substring(0, 200)}`);
        }
        
        return question; // Fallback to question
      }

      const data = await response.json() as any;
      const generatedQuery = data.choices[0].message.content.trim();
      
      // Remove quotes if the model added them
      return generatedQuery.replace(/^["']|["']$/g, '');
    } catch (error) {
      log(`   ⚠️  Error generating search query: ${error instanceof Error ? error.message : error}`);
      return question; // Fallback
    }
  }

  /**
   * Research a market using Exa's neural search
   * Implements rate limiting: max 5 concurrent calls, 250ms between calls
   */
  private async researchWithExa(searchQuery: string, logBuffer?: string[]): Promise<ExaResult[]> {
    const log = (message: string) => {
      if (logBuffer) {
        logBuffer.push(message);
      }
    };
    // Wait if we've hit the Exa concurrency limit (5 QPS)
    while (this.activeExaCalls >= this.maxConcurrentExaCalls) {
      await this.sleep(50);
    }

    // Enforce minimum delay between Exa calls
    const timeSinceLastCall = Date.now() - this.lastExaCallTime;
    if (timeSinceLastCall < this.minExaDelayMs) {
      await this.sleep(this.minExaDelayMs - timeSinceLastCall);
    }

    this.activeExaCalls++;
    this.lastExaCallTime = Date.now();

    try {
      const response = await fetch('https://api.exa.ai/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.exaApiKey!,
        },
        body: JSON.stringify({
          query: searchQuery.substring(0, 500), // Ensure it's not too long
          type: 'neural', // Semantic search
          useAutoprompt: true, // Let Exa optimize the query further
          numResults: 10,
          contents: {
            text: { maxCharacters: 2000 }, // Get text content
          },
          category: 'tweet,discussion,news', // Focus on social + news
          startPublishedDate: this.getDateDaysAgo(30), // Last 30 days
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          log(`   ⚠️  Exa rate limit hit. Consider reducing MAX_CONCURRENT_ANALYSES or upgrading your Exa plan.`);
        } else {
          log(`   ⚠️  Exa API error: ${response.status}`);
        }
        return [];
      }

      const data = await response.json() as any;
      const results = data.results || [];

      return results.map((r: any) => ({
        title: r.title || '',
        url: r.url || '',
        publishedDate: r.publishedDate,
        author: r.author,
        text: r.text || r.snippet || '',
      }));
    } catch (error) {
      log(`   ⚠️  Error calling Exa API: ${error instanceof Error ? error.message : error}`);
      return [];
    } finally {
      this.activeExaCalls--;
    }
  }

  /**
   * Format Exa results for the AI prompt
   */
  private formatExaResults(results: ExaResult[]): string {
    if (results.length === 0) {
      return 'No relevant sources found.';
    }

    return results
      .map((r, i) => {
        return `
[Source ${i + 1}] ${r.title}
URL: ${r.url}
${r.publishedDate ? `Date: ${r.publishedDate}` : ''}
${r.author ? `Author: ${r.author}` : ''}

${r.text.substring(0, 1500)}
${r.text.length > 1500 ? '...' : ''}
---`;
      })
      .join('\n\n');
  }

  /**
   * Build a prompt for o4-mini reasoning
   */
  private buildReasoningPrompt(
    question: string,
    description: string,
    metrics: string,
    probability: number,
    researchContext: string
  ): string {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    return `Analyze this prediction market for mispricing:

CURRENT DATE: ${currentDate}

MARKET QUESTION:
${question}

MARKET DESCRIPTION:
${description || 'No description provided'}

MARKET METRICS:
${metrics}
Current probability: ${(probability * 100).toFixed(1)}%

This market has low total trading volume and a tight bid-ask spread, suggesting it may be overlooked by the broader market.

RESEARCH FINDINGS:
${researchContext}

IMPORTANT: Base your analysis on the RESEARCH FINDINGS above, which contain current information. Do not rely on potentially outdated training data for facts about recent events, current officeholders, or election results.

TASK:
Use chain-of-thought reasoning to analyze whether this market is likely mispriced:

1. CONTEXT ANALYSIS: What is this market asking about? What would need to happen for it to resolve as YES vs NO?

2. BASE RATE: What is a reasonable base rate or prior probability for this type of event?

3. EVIDENCE EVALUATION: Based on the research findings above, what evidence exists that would move the probability away from the base rate? Evaluate source credibility and recency.

4. MARKET PSYCHOLOGY: Why might this market have low volume? Is it genuinely overlooked, or is it just boring/obvious?

5. MISPRICING ASSESSMENT: Given the current probability of ${(probability * 100).toFixed(1)}%, is there evidence of mispricing? If so, in which direction and by approximately how much?

6. RECOMMENDATION: Should this be flagged for human research?
   - Use EXACTLY one of: skip, research, strong_signal
   - "skip" if the market appears efficiently priced or lacks actionable information
   - "research" if there are moderate signs of mispricing worth investigating
   - "strong_signal" if there is strong evidence of significant mispricing

7. CONFIDENCE: Rate your confidence in this assessment.
   - Use EXACTLY one of: low, medium, high (no other values or combinations)

IMPORTANT: You must end your response with these three lines using ONLY the exact values specified:
SUMMARY: [2-3 sentence summary of key findings for a notification]
RECOMMENDATION: [EXACTLY one of: skip, research, strong_signal]
CONFIDENCE: [EXACTLY one of: low, medium, high]`;
  }

  /**
   * Call OpenAI o4-mini for reasoning
   * Throws descriptive errors for upstream handling
   */
  private async callOpenAIO1Mini(prompt: string): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'o4-mini',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          // o4 models don't support temperature, max_tokens, or system messages
          // They use their own reasoning approach
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        let errorMessage = '';
        
        try {
          const errorDetails = JSON.parse(errorBody);
          errorMessage = errorDetails.error?.message || errorBody;
        } catch {
          errorMessage = errorBody;
        }

        // Create descriptive error messages based on status code
        if (response.status === 429) {
          throw new Error(`OpenAI rate limit exceeded (429). Consider reducing MAX_CONCURRENT_ANALYSES.`);
        } else if (response.status === 401) {
          throw new Error('OpenAI authentication failed (401) - Check your OPENAI_API_KEY');
        } else if (response.status === 400) {
          throw new Error(`OpenAI bad request (400): ${errorMessage.substring(0, 200)}`);
        } else if (response.status === 403) {
          throw new Error('OpenAI forbidden (403) - Check API key permissions');
        } else if (response.status === 404) {
          throw new Error('OpenAI model not found (404) - o4-mini may not be available for your account');
        } else if (response.status === 500 || response.status === 502 || response.status === 503) {
          throw new Error(`OpenAI server error (${response.status}) - Service temporarily unavailable`);
        } else {
          throw new Error(`OpenAI API error (${response.status}): ${errorMessage.substring(0, 200)}`);
        }
      }

      const data = await response.json() as any;
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('OpenAI response missing expected data structure');
      }

      return data.choices[0].message.content;
    } catch (error) {
      // Re-throw with context if it's already our error
      if (error instanceof Error && error.message.includes('OpenAI')) {
        throw error;
      }
      
      // Wrap other errors (network issues, etc.)
      throw new Error(`OpenAI API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse the AI response to extract structured data
   */
  private parseAIResponse(marketId: string, question: string, response: string): AIAnalysis {
    const lowerResponse = response.toLowerCase();

    // Extract summary
    const summaryMatch = response.match(/SUMMARY:\s*(.+?)(?=\nRECOMMENDATION:|$)/is);
    const summary = summaryMatch 
      ? summaryMatch[1].trim().substring(0, 500)
      : this.extractKeySummary(response); // Fallback

    // Extract recommendation
    let suggestedAction: 'skip' | 'research' | 'strong_signal' = 'research';
    if (lowerResponse.includes('recommendation: strong_signal') || 
        lowerResponse.includes('recommendation: strong signal')) {
      suggestedAction = 'strong_signal';
    } else if (lowerResponse.includes('recommendation: skip')) {
      suggestedAction = 'skip';
    } else if (lowerResponse.includes('recommendation: research')) {
      suggestedAction = 'research';
    }

    // Extract confidence
    let confidence: 'low' | 'medium' | 'high' = 'medium';
    if (lowerResponse.includes('confidence: high')) {
      confidence = 'high';
    } else if (lowerResponse.includes('confidence: low')) {
      confidence = 'low';
    }

    return {
      marketId,
      question,
      fullAnalysis: response, // Keep the complete analysis
      summary,
      confidence,
      suggestedAction,
    };
  }

  /**
   * Extract a short summary for notifications
   */
  private extractKeySummary(response: string): string {
    // Try to extract the mispricing assessment section
    const mispricingMatch = response.match(/5\.\s*MISPRICING ASSESSMENT:(.*?)(?=6\.|$)/is);
    if (mispricingMatch) {
      return mispricingMatch[1].trim().substring(0, 400);
    }

    // Fall back to first substantial paragraphs
    const paragraphs = response
      .split('\n\n')
      .filter(p => p.trim().length > 50)
      .slice(0, 2);
    
    return paragraphs.join(' ').substring(0, 400);
  }

  /**
   * Get ISO date string for N days ago
   */
  private getDateDaysAgo(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }

}
