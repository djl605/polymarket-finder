import OpenAI from 'openai';
import Exa from 'exa-js';
import { AIAnalysis, ScreenedMarket, ResearchContent } from './types';
import { ResearchFileManager } from './research-file-manager';
import { RESEARCH_VERSION } from './research-version';

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
  private readonly exaClient: Exa;
  private readonly openaiClient: OpenAI;
  
  // Exa-specific rate limiting (5 QPS limit)
  private activeExaCalls = 0;
  private readonly maxConcurrentExaCalls = 5; // Stay under 5 QPS limit
  private lastExaCallTime = 0;
  private readonly minExaDelayMs = 250; // 4 calls per second max

  constructor(
    openaiApiKey: string,
    exaApiKey: string,
    maxConcurrentCalls: number = 10,
    verboseLogs: boolean = false,
    private researchFileManager?: ResearchFileManager
  ) {
    this.maxConcurrentCalls = maxConcurrentCalls;
    this.verboseLogs = verboseLogs;
    this.exaClient = new Exa(exaApiKey);
    this.openaiClient = new OpenAI({ apiKey: openaiApiKey });
  }

  /**
   * Analyze a screened market using web research + AI reasoning
   * Returns a default "skip" analysis if any errors occur
   * @param screenedMarket - The market to analyze
   * @param logBuffer - Optional array to collect log messages instead of outputting directly
   * @param logResearch - If true, log the full research context (for single-market debugging)
   */
  async analyzeMarket(screenedMarket: ScreenedMarket, logBuffer?: string[], logResearch: boolean = false): Promise<AIAnalysis> {
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

      // Step 1: Use Exa AI search to search for articles related to the market question.
      const searchQuery = `Provide information that could be relevant to predicting the following question: ${market.question}`;
      log(`   🔎 Search query: "${searchQuery}"`);

      // Step 2: Perform web research using Exa
      const { results: exaResults, context: exaContext } = await this.researchWithExa(searchQuery, logBuffer);
      // Use Exa's context string if available, otherwise format manually
      const researchContext = exaContext || this.formatExaResults(exaResults);
      log(`   📚 Found ${exaResults.length} relevant sources`);

      // Log the full research context if requested (for single-market debugging)
      if (logResearch && researchContext) {
        log(`\n${'='.repeat(80)}`);
        log(`RESEARCH CONTEXT`);
        log(`${'='.repeat(80)}`);
        log(researchContext);
        log(`${'='.repeat(80)}\n`);
      }

      // Step 3: Use o4-mini for reasoning
      log(`   🤖 Running AI reasoning...`);
      const prompt = this.buildReasoningPrompt(
        market.question,
        market.description,
        reason,
        market.mainProbability,
        researchContext
      );
      
      const response = await this.callReasoningModel(prompt);
      
      // Log the full response for debugging (only if verbose logging is enabled)
      if (this.verboseLogs) {
        log(`\n${'='.repeat(80)}`);
        log(`AI RESPONSE FOR: ${market.question.substring(0, 70)}...`);
        log(`${'='.repeat(80)}`);
        log(response);
        log(`${'='.repeat(80)}\n`);
      }

      const analysis = this.parseAIResponse(market.conditionId, market.question, response);
      
      // Add research version to analysis
      analysis.researchVersion = RESEARCH_VERSION;

      // Save research content to file (after AI reasoning, so we can include the analysis)
      if (this.researchFileManager && researchContext) {
        try {
          const researchContent: ResearchContent = {
            marketId: market.conditionId,
            question: market.question,
            searchQuery,
            contextString: researchContext, // The formatted context used for analysis
            researchedAt: new Date().toISOString(),
            analysis: {
              fullAnalysis: analysis.fullAnalysis,
              summary: analysis.summary,
              confidence: analysis.confidence,
              expectedValue: analysis.expectedValue,
            },
          };
          const filename = this.researchFileManager.saveResearchContent(researchContent);
          log(`   💾 Research saved to: ${filename}`);
        } catch (error) {
          log(`   ⚠️  Failed to save research file: ${error instanceof Error ? error.message : error}`);
        }
      }

      return analysis;
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
        expectedValue: 0,
        researchVersion: "0.0",
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
   * Research a market using Exa's neural search
   * Implements rate limiting: max 5 concurrent calls, 250ms between calls
   * Returns both the individual results and the formatted context string (if available)
   */
  private async researchWithExa(searchQuery: string, logBuffer?: string[]): Promise<{ results: ExaResult[], context?: string }> {
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
      const response = await this.exaClient.searchAndContents(
        searchQuery.substring(0, 500), // Ensure it's not too long
        {
          type: 'deep', // Deep semantic search for better quality
          numResults: 5,
          context: true, // Get Exa's formatted context string for LLM consumption
          startPublishedDate: this.getDateDaysAgo(30), // Last 30 days
        }
      );

      const results = response.results || [];
      const formattedResults = results.map((r: typeof results[number]) => ({
        title: r.title || '',
        url: r.url || '',
        publishedDate: r.publishedDate,
        author: r.author,
        text: r.text || '',
      }));

      return {
        results: formattedResults,
        context: response.context, // Exa's pre-formatted context string
      };
    } catch (error: any) {
      // Handle Exa SDK errors
      if (error.message?.includes('429') || error.message?.includes('rate limit')) {
        log(`   ⚠️  Exa rate limit hit. Consider reducing MAX_CONCURRENT_ANALYSES or upgrading your Exa plan.`);
      } else {
        log(`   ⚠️  Error calling Exa API: ${error instanceof Error ? error.message : error}`);
      }
      return { results: [] };
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
    
    return `Evaluate this prediction market to determine if there is credible evidence of mispricing:

CURRENT DATE: ${currentDate}

MARKET QUESTION:
${question}

MARKET DESCRIPTION:
${description || 'No description provided'}

MARKET METRICS:
${metrics}
Current probability: ${(probability * 100).toFixed(1)}%

IMPORTANT CONTEXT:
This market has low total trading volume and a tight bid-ask spread. Low volume markets present a mixed picture:
- They may be correctly priced if the outcome is straightforward or there's broad consensus
- They may be inefficient if the price is being set by one or a few over-confident traders rather than aggregating diverse information
- They may be overlooked by informed traders who could correct mispricings

TASK:
I have gathered some relevant research materials which are shared with you at the bottom of this prompt. Your job is to review the research materials and objectively evaluate whether there is credible evidence of mispricing, without initially assuming the market is correct or incorrect. Since this is a prediction market for a future event, you should not expect to find conclusive proof for one side or the other. Instead, you should look for information that is contextually relevant to predicting the outcome. Use chain-of-thought reasoning to analyze the following:

1. CONTEXT ANALYSIS: What is this market asking about? What would need to happen for it to resolve as YES vs NO?

2. EVIDENCE EVALUATION: Based on the research findings below, evaluate ALL relevant evidence:
   - What SPECIFIC EVIDENCE suggests the current price of ${(probability * 100).toFixed(1)}% might be incorrect?
   - What evidence SUPPORTS the current market price as reasonable?
   - Evaluate source credibility and recency
   - Consider both bullish and bearish perspectives
   - Be especially skeptical of evidence that seems too obvious - if it's that clear, why hasn't the market already priced it in?

3. MARKET EFFICIENCY ANALYSIS: Evaluate the reliability of this market's price:
   - What reasonable interpretation could justify the current ${(probability * 100).toFixed(1)}% price?
   - Could this represent genuine consensus among informed traders, or might it reflect the view of just one or a few participants?
   - Is the low volume because the outcome is obvious/uncontroversial, or because informed traders haven't engaged with this market yet?

4. MISPRICING ASSESSMENT: Given the current probability of ${(probability * 100).toFixed(1)}%, what does the evidence indicate?
    - Weigh the evidence on both sides objectively
    - Consider the timeline. There is likely more uncertainty about markets that won't resolve for a long time.
    - Consider whether this market shows signs of efficiency or inefficiency
    - Only conclude there is mispricing if you have specific, credible evidence that appears to be missing from the current price

   ⚠️ CRITICAL CHECK - CHALLENGE YOUR REASONING: If you believe there is significant mispricing (especially > 20 cents), STOP and rigorously verify:
   - While low-volume markets can be inefficient, large mispricings are rare. What could YOU be missing or misunderstanding?
   - Do you truly understand the EXACT resolution criteria?
       - If you believe the resolution criteria have already been met or that the outcome is nearly certain, yet the market is still very mispriced, that is almost certainly a sign that you are missing something important (for example, the qualifying event might have happened before the market started, or there's a technicality you don't understand).
   - What is the MOST CHARITABLE interpretation of why informed traders arrived at this price?
   - Could there be information or context that traders have that isn't readily available to you?
   - Re-read the market question and description carefully before proceeding.
   
   Common pitfalls: confusing similar events, missing time bounds, misunderstanding "will X happen" vs "will X be announced", missing specific conditions, over-confidence that a few sources represent consensus.

5. EXPECTED VALUE CALCULATION: Estimate the expected value of investigating this market:
   - STRENGTH of evidence: How strong and reliable is the specific evidence you found? Consider whether this information is truly missing from the current price or likely already considered by traders. (0-100%)
   - MAGNITUDE of mispricing: If genuinely mispriced, how large is the error? (cents)
   - Expected value = (Strength of evidence) × (Magnitude of mispricing)
   
   Examples:
   - 80% confidence in 15 cents mispricing = 12 cents expected value
   - 40% confidence in 20 cents mispricing = 8 cents expected value
   - 90% confidence in 3 cents mispricing = 2.7 cents expected value
   - 20% confidence in 10 cents mispricing = 2 cents expected value

6. CONFIDENCE: Rate your confidence in this assessment.
   - Use EXACTLY one of: low, medium, high (no other values or combinations)

IMPORTANT: You must end your response with these three lines using ONLY the exact values specified:
EXPECTED_VALUE: [numeric value in cents, e.g., 12.5]
SUMMARY: [2-3 sentence summary of key findings for a notification]
CONFIDENCE: [EXACTLY one of: low, medium, high]

IMPORTANT: The research findings you will use are below. Base your analysis ONLY on the RESEARCH FINDINGS, which contain current information. Do not rely on potentially outdated training data for facts about recent events, current officeholders, or election results.

RESEARCH FINDINGS:
${researchContext}`;

  }

  /**
   * Extract rate limit information from OpenAI error headers
   */
  private extractRateLimitInfo(headers?: Record<string, string>): string {
    if (!headers) return '';

    const limitRequests = headers['x-ratelimit-limit-requests'];
    const remainingRequests = headers['x-ratelimit-remaining-requests'];
    const limitTokens = headers['x-ratelimit-limit-tokens'];
    const remainingTokens = headers['x-ratelimit-remaining-tokens'];
    const resetRequests = headers['x-ratelimit-reset-requests'];
    const resetTokens = headers['x-ratelimit-reset-tokens'];

    const parts: string[] = [];

    if (limitRequests && remainingRequests) {
      parts.push(`Requests: ${remainingRequests}/${limitRequests}`);
    }

    if (limitTokens && remainingTokens) {
      parts.push(`Tokens: ${remainingTokens}/${limitTokens}`);
    }

    // Format reset time if available
    if (resetRequests) {
      const resetDate = new Date(resetRequests);
      const secondsUntilReset = Math.ceil((resetDate.getTime() - Date.now()) / 1000);
      if (secondsUntilReset > 0) {
        parts.push(`Requests reset in: ${secondsUntilReset}s`);
      }
    }

    if (resetTokens) {
      const resetDate = new Date(resetTokens);
      const secondsUntilReset = Math.ceil((resetDate.getTime() - Date.now()) / 1000);
      if (secondsUntilReset > 0) {
        parts.push(`Tokens reset in: ${secondsUntilReset}s`);
      }
    }

    return parts.length > 0 ? ` [${parts.join(', ')}]` : '';
  }

  /**
   * Call OpenAI o4-mini for reasoning
   * Throws descriptive errors for upstream handling
   */
  private async callReasoningModel(prompt: string): Promise<string> {
    try {
      const response = await this.openaiClient.chat.completions.create({
        model: 'o4-mini',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        // Reasoning models don't support temperature, max_tokens, or system messages
        // They use their own reasoning approach
      });

      const content = response.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('OpenAI response missing expected data structure');
      }

      return content;
    } catch (error: any) {
      // Handle OpenAI SDK errors with descriptive messages
      if (error instanceof OpenAI.APIError) {
        console.log(error);
        // Create descriptive error messages based on status code
        if (error.status === 429) {
          const rateLimitInfo = this.extractRateLimitInfo(error.headers as Record<string, string>);
          throw new Error(`OpenAI rate limit exceeded${rateLimitInfo}. Consider reducing MAX_CONCURRENT_ANALYSES.`);
        } else if (error.status === 401) {
          throw new Error('OpenAI authentication failed (401) - Check your OPENAI_API_KEY');
        } else if (error.status === 400) {
          throw new Error(`OpenAI bad request (400): ${error.message.substring(0, 200)}`);
        } else if (error.status === 403) {
          throw new Error('OpenAI forbidden (403) - Check API key permissions');
        } else if (error.status === 404) {
          throw new Error('OpenAI model not found (404) - Model may not be available for your account');
        } else if (error.status === 500 || error.status === 502 || error.status === 503) {
          throw new Error(`OpenAI server error (${error.status}) - Service temporarily unavailable`);
        } else {
          throw new Error(`OpenAI API error (${error.status}): ${error.message.substring(0, 200)}`);
        }
      }
      
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
    const summaryMatch = response.match(/SUMMARY:\s*(.+?)(?=\nCONFIDENCE:|$)/is);
    const summary = summaryMatch 
      ? summaryMatch[1].trim().substring(0, 500)
      : this.extractKeySummary(response); // Fallback

    // Extract expected value
    const evMatch = response.match(/EXPECTED_VALUE:\s*([\d.]+)/i);
    let expectedValue = 0;
    if (evMatch) {
        expectedValue = parseFloat(evMatch[1]);
        // Handle NaN from invalid parse
        if (isNaN(expectedValue)) {
          expectedValue = 0;
        }
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
      expectedValue,
      researchVersion: RESEARCH_VERSION,
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
