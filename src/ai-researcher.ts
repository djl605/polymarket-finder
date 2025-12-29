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
  constructor(
    private openaiApiKey: string,
    private exaApiKey: string
  ) {}

  /**
   * Analyze a screened market using web research + AI reasoning
   */
  async analyzeMarket(screenedMarket: ScreenedMarket): Promise<AIAnalysis> {
    const { market, reason } = screenedMarket;

    try {
      console.log(`   🔍 Researching market...`);

      // Step 1: Generate optimal search query using GPT-4o-mini
      const searchQuery = await this.generateSearchQuery(market.question, market.description, reason);
      console.log(`   🔎 Search query: "${searchQuery}"`);

      // Step 2: Perform web research using Exa with optimized query
      const exaResults = await this.researchWithExa(searchQuery);
      const researchContext = this.formatExaResults(exaResults);
      console.log(`   📚 Found ${exaResults.length} relevant sources`);

      // Step 3: Use o4-mini for reasoning
      console.log(`   🤖 Running AI reasoning...`);
      const prompt = this.buildReasoningPrompt(
        market.question,
        market.description,
        reason,
        market.mainProbability,
        researchContext
      );
      
      const response = await this.callOpenAIO1Mini(prompt);
      
      // Log the full response for debugging
      console.log(`\n${'='.repeat(80)}`);
      console.log(`AI RESPONSE FOR: ${market.question.substring(0, 70)}...`);
      console.log(`${'='.repeat(80)}`);
      console.log(response);
      console.log(`${'='.repeat(80)}\n`);

      return this.parseAIResponse(market.conditionId, market.question, response);
    } catch (error) {
      console.error(`   ⚠️  Error analyzing market: ${error}`);
      throw error;
    }
  }

  /**
   * Generate an optimal search query using GPT-4o-mini
   */
  private async generateSearchQuery(question: string, description: string, metrics: string): Promise<string> {
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
        console.warn(`Failed to generate search query: ${response.status}`);
        return question; // Fallback to question
      }

      const data = await response.json() as any;
      const generatedQuery = data.choices[0].message.content.trim();
      
      // Remove quotes if the model added them
      return generatedQuery.replace(/^["']|["']$/g, '');
    } catch (error) {
      console.error('Error generating search query:', error);
      return question; // Fallback
    }
  }

  /**
   * Research a market using Exa's neural search
   */
  private async researchWithExa(searchQuery: string): Promise<ExaResult[]> {
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
        console.warn(`Exa API error: ${response.status}`);
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
      console.error('Error calling Exa API:', error);
      return [];
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
    return `You are analyzing a prediction market to identify potential mispricings.

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

TASK:
Use chain-of-thought reasoning to analyze whether this market is likely mispriced:

1. CONTEXT ANALYSIS: What is this market asking about? What would need to happen for it to resolve as YES vs NO?

2. BASE RATE: What is a reasonable base rate or prior probability for this type of event?

3. EVIDENCE EVALUATION: Based on the research findings above, what evidence exists that would move the probability away from the base rate? Evaluate source credibility and recency.

4. MARKET PSYCHOLOGY: Why might this market have low volume? Is it genuinely overlooked, or is it just boring/obvious?

5. MISPRICING ASSESSMENT: Given the current probability of ${(probability * 100).toFixed(1)}%, is there evidence of mispricing? If so, in which direction and by approximately how much?

6. RECOMMENDATION: Should this be flagged for human research?
   - "skip" if the market appears efficiently priced or lacks actionable information
   - "research" if there are moderate signs of mispricing worth investigating
   - "strong_signal" if there is strong evidence of significant mispricing

7. CONFIDENCE: Rate your confidence (low/medium/high) in this assessment.

Provide your complete reasoning above, then end with these three lines:
SUMMARY: [2-3 sentence summary of key findings for a notification]
RECOMMENDATION: [skip/research/strong_signal]
CONFIDENCE: [low/medium/high]`;
  }

  /**
   * Call OpenAI o4-mini for reasoning
   */
  private async callOpenAIO1Mini(prompt: string): Promise<string> {
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
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json() as any;
    return data.choices[0].message.content;
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
