import OpenAI from 'openai';
import { AIAnalysis, ScreenedMarket, ResearchContent } from './types';
import { ResearchFileManager } from './research-file-manager';
import { RESEARCH_VERSION } from './research-version';

interface ParsedSource {
  title: string;
  url: string;
  author: string;
  date: string;
  summary: string;
}

/**
 * Uses OpenAI gpt-4.1 with web_search for research + reasoning in a single call
 */
export class AIResearcher {
  private activeCalls = 0;
  private readonly maxConcurrentCalls: number;
  private readonly minDelayMs = 100;
  private readonly verboseLogs: boolean;
  private readonly openaiClient: OpenAI;

  constructor(
    openaiApiKey: string,
    maxConcurrentCalls: number = 10,
    verboseLogs: boolean = false,
    private researchFileManager?: ResearchFileManager
  ) {
    this.maxConcurrentCalls = maxConcurrentCalls;
    this.verboseLogs = verboseLogs;
    this.openaiClient = new OpenAI({ apiKey: openaiApiKey });
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

      // Build prompt for web search + reasoning
      log(`   🤖 Running AI research + reasoning...`);
      const prompt = this.buildReasoningPrompt(
        market.question,
        market.description,
        reason,
        market.mainProbability,
      );

      // Single API call: web search + reasoning
      const response = await this.callResearchModel(prompt);

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

      // Parse sources from the response for research files
      const sources = this.parseSources(response);
      const researchContext = this.formatSourcesAsContext(sources);
      log(`   📚 Found ${sources.length} sources`);

      // Strip the SOURCES block from fullAnalysis so it only contains the reasoning
      const sourcesIdx = response.lastIndexOf('SOURCES:');
      if (sourcesIdx !== -1) {
        analysis.fullAnalysis = response.substring(0, sourcesIdx).trim();
      }

      // Save research content to file (after AI reasoning, so we can include the analysis)
      if (this.researchFileManager && researchContext) {
        try {
          const researchContent: ResearchContent = {
            marketId: market.conditionId,
            question: market.question,
            searchQuery: market.question,
            contextString: researchContext,
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
   * Call OpenAI gpt-4.1 with web_search for research + reasoning
   * Throws descriptive errors for upstream handling
   */
  private async callResearchModel(prompt: string): Promise<string> {
    try {
      const response = await this.openaiClient.responses.create({
        model: 'gpt-4.1',
        tools: [
          {
            type: 'web_search',
            search_context_size: 'high',
          },
        ],
        input: prompt,
      });

      const text = response.output_text;

      if (!text) {
        throw new Error('OpenAI response missing expected data structure');
      }

      return text;
    } catch (error: unknown) {
      // Handle OpenAI SDK errors with descriptive messages
      if (error instanceof OpenAI.APIError) {
        if (this.verboseLogs) {
          console.error(error);
        }
        if (error.status === 429) {
          const rateLimitInfo = this.extractRateLimitInfo(error.headers);
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
   * Build a prompt for gpt-4.1 with web search + reasoning
   */
  private buildReasoningPrompt(
    question: string,
    description: string,
    metrics: string,
    probability: number,
  ): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `Evaluate this prediction market to determine if there is credible evidence of mispricing.

Use web search to research this topic. Search for recent news, analyses, and discussions relevant to predicting the outcome. Exclude prediction market sites (polymarket.com, kalshi.com, metaculus.com, manifold.markets) from your searches — focus on primary sources like news outlets, government sites, and expert analyses. Do not rely on potentially outdated training data for facts about recent events, current officeholders, or election results.

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
You have access to web search. Research this topic thoroughly, then objectively evaluate whether there is credible evidence of mispricing, without initially assuming the market is correct or incorrect. Since this is a prediction market for a future event, you should not expect to find conclusive proof for one side or the other. Instead, you should look for information that is contextually relevant to predicting the outcome. Use chain-of-thought reasoning to analyze the following:

1. CONTEXT ANALYSIS: What is this market asking about? What would need to happen for it to resolve as YES vs NO?

2. EVIDENCE EVALUATION: Based on your research findings, evaluate ALL relevant evidence:
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

IMPORTANT: You must end your response with these sections in this exact order:

EXPECTED_VALUE: [numeric value in cents, e.g., 12.5]
SUMMARY: [2-3 sentence summary of key findings for a notification]
CONFIDENCE: [EXACTLY one of: low, medium, high]

SOURCES:
After the above three lines, list each web source you referenced in your analysis using this exact format. Include one entry per source, separated by "---":

---
Title: [page title]
URL: [full URL starting with https:// — do NOT use shortened names like "Newsweek article", always provide the complete URL]
Author: [author name, or "Unknown" if not available]
Date: [publication date in YYYY-MM-DD format, or "Unknown" if not available]
Summary: [3-5 sentence summary. Explain what specific information in this source is relevant to predicting the market outcome. Describe the key data points, findings, or arguments from the source. Then explain how this information affects the market analysis — does it support or challenge the current market price, and why?]
---`;

  }

  /**
   * Extract rate limit information from OpenAI error headers
   */
  private extractRateLimitInfo(headers?: Headers): string {
    if (!headers) return '';

    const limitRequests = headers.get('x-ratelimit-limit-requests');
    const remainingRequests = headers.get('x-ratelimit-remaining-requests');
    const limitTokens = headers.get('x-ratelimit-limit-tokens');
    const remainingTokens = headers.get('x-ratelimit-remaining-tokens');
    const resetRequests = headers.get('x-ratelimit-reset-requests');
    const resetTokens = headers.get('x-ratelimit-reset-tokens');

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
   * Parse structured sources from the SOURCES block in the model response
   */
  private parseSources(response: string): ParsedSource[] {
    const sourcesIdx = response.lastIndexOf('SOURCES:');
    if (sourcesIdx === -1) return [];

    const sourcesBlock = response.substring(sourcesIdx + 'SOURCES:'.length);

    // Split by --- delimiters and parse each block
    const blocks = sourcesBlock.split('---').filter(b => b.trim().length > 0);

    return blocks.map(block => {
      const title = block.match(/Title:\s*(.+)/i)?.[1]?.trim() || 'Unknown';
      const url = block.match(/URL:\s*(.+)/i)?.[1]?.trim() || '';
      const author = block.match(/Author:\s*(.+)/i)?.[1]?.trim() || 'Unknown';
      const date = block.match(/Date:\s*(.+)/i)?.[1]?.trim() || 'Unknown';
      const summary = block.match(/Summary:\s*([\s\S]+?)$/i)?.[1]?.trim() || '';
      return { title, url, author, date, summary };
    }).filter(s => s.url.length > 0);
  }

  /**
   * Format parsed sources as a context string for research files
   */
  private formatSourcesAsContext(sources: ParsedSource[]): string {
    if (sources.length === 0) return 'No sources found.';

    return sources.map(s =>
      `### [${s.title}](${s.url})\n` +
      `**Author:** ${s.author} | **Published:** ${s.date}\n\n` +
      `${s.summary}`
    ).join('\n\n');
  }

}
