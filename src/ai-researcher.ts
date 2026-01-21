import Exa from 'exa-js';
import { AIAnalysis, ScreenedMarket, ResearchContent } from './types';
import { ResearchFileManager } from './research-file-manager';
import { RESEARCH_VERSION } from './research-version';

/**
 * Output schema for structured research results
 */
interface ResearchOutput {
  analysis: string;
  links: Array<{ url: string; description: string }>;
  expectedValue: number;
  summary: string;
  confidence: 'low' | 'medium' | 'high';
}

/**
 * Uses Exa's Research API for integrated web research + AI analysis
 */
export class AIResearcher {
  private activeCalls = 0;
  private readonly maxConcurrentCalls: number;
  private readonly minDelayMs = 100;
  private readonly verboseLogs: boolean;
  private readonly exaClient: Exa;
  
  // Exa-specific rate limiting
  private activeExaCalls = 0;
  private readonly maxConcurrentExaCalls = 5;
  private lastExaCallTime = 0;
  private readonly minExaDelayMs = 250;
  
  // Research API polling settings
  private readonly researchPollIntervalMs = 10000; // Poll every 10 seconds
  private readonly researchMaxWaitMs = 300000; // Max 5 minutes

  constructor(
    exaApiKey: string,
    maxConcurrentCalls: number = 10,
    verboseLogs: boolean = false,
    private researchFileManager?: ResearchFileManager
  ) {
    this.maxConcurrentCalls = maxConcurrentCalls;
    this.verboseLogs = verboseLogs;
    this.exaClient = new Exa(exaApiKey);
  }

  /**
   * Analyze a screened market using Exa's Research API
   * Returns a default "skip" analysis if any errors occur
   * @param screenedMarket - The market to analyze
   * @param logBuffer - Optional array to collect log messages instead of outputting directly
   * @param logResearch - If true, log the full research report (for single-market debugging)
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

      // Build research instructions for Exa's Research API
      const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const instructions = this.buildResearchInstructions(
        market.question,
        market.description,
        reason,
        market.mainProbability,
        currentDate
      );
      
      log(`   🤖 Submitting research task to Exa...`);

      // Use Exa's Research API (integrated search + analysis with structured output)
      const { output: researchOutput, cost } = await this.performResearch(instructions, logBuffer);
      
      log(`   ✅ Research complete`);

      // Log the full research analysis if requested (for single-market debugging)
      if (logResearch && researchOutput.analysis) {
        log(`\n${'='.repeat(80)}`);
        log(`RESEARCH ANALYSIS`);
        log(`${'='.repeat(80)}`);
        log(researchOutput.analysis);
        log(`${'='.repeat(80)}`);
        log(`SOURCES (${researchOutput.links.length})`);
        log(`${'='.repeat(80)}`);
        researchOutput.links.forEach((link, i) => {
          log(`[${i + 1}] ${link.description}`);
          log(`    ${link.url}`);
        });
        log(`${'='.repeat(80)}`);
        log(`Expected Value: ${researchOutput.expectedValue} cents`);
        log(`Summary: ${researchOutput.summary}`);
        log(`Confidence: ${researchOutput.confidence}`);
        log(`Cost: $${cost.total.toFixed(4)} (${cost.numSearches} searches, ${cost.numPages} pages, ${cost.reasoningTokens.toLocaleString()} tokens)`);
        log(`${'='.repeat(80)}\n`);
      }

      // Log verbose output if enabled
      if (this.verboseLogs) {
        log(`\n${'='.repeat(80)}`);
        log(`RESEARCH ANALYSIS FOR: ${market.question.substring(0, 70)}...`);
        log(`${'='.repeat(80)}`);
        log(researchOutput.analysis);
        log(`\nSOURCES (${researchOutput.links.length}):`);
        researchOutput.links.forEach((link, i) => {
          log(`  [${i + 1}] ${link.description}`);
          log(`      ${link.url}`);
        });
        log(`\nCOST: $${cost.total.toFixed(4)} (${cost.numSearches} searches, ${cost.numPages} pages, ${cost.reasoningTokens.toLocaleString()} tokens)`);
        log(`${'='.repeat(80)}\n`);
      }

      // Convert structured output to AIAnalysis
      const analysis: AIAnalysis = {
        marketId: market.conditionId,
        question: market.question,
        fullAnalysis: researchOutput.analysis,
        summary: researchOutput.summary,
        confidence: researchOutput.confidence,
        expectedValue: researchOutput.expectedValue,
        researchVersion: RESEARCH_VERSION,
      };

      // Save research content to file
      if (this.researchFileManager && researchOutput.analysis) {
        try {
          // Format complete research output including sources
          const contextString = [
            '=== ANALYSIS ===',
            researchOutput.analysis,
            '',
            '=== SOURCES ===',
            ...researchOutput.links.map((link, i) => 
              `[${i + 1}] ${link.description}\n    ${link.url}`
            ),
            '',
            '=== RESULTS ===',
            `Expected Value: ${researchOutput.expectedValue} cents`,
            `Confidence: ${researchOutput.confidence}`,
            `Summary: ${researchOutput.summary}`,
          ].join('\n');

          const researchContent: ResearchContent = {
            marketId: market.conditionId,
            question: market.question,
            searchQuery: instructions,
            contextString, // Complete formatted research output
            researchedAt: new Date().toISOString(),
            analysis: {
              fullAnalysis: analysis.fullAnalysis,
              summary: analysis.summary,
              confidence: analysis.confidence,
              expectedValue: analysis.expectedValue,
              links: researchOutput.links,
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
      console.log(error);
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
   * Build research instructions for Exa's Research API
   */
  private buildResearchInstructions(
    question: string,
    description: string,
    metrics: string,
    probability: number,
    currentDate: string
  ): string {
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

TASK:
Research relevant information from the web and analyze whether this market is likely mispriced. Since this is a prediction market for a future event, you should not expect to find conclusive proof for one side or the other. Instead, you should look for information that is contextually relevant to predicting the outcome of the market. Use chain-of-thought reasoning to analyze the following:

1. CONTEXT ANALYSIS: What is this market asking about? What would need to happen for it to resolve as YES vs NO?

2. EVIDENCE EVALUATION: Based on your research findings, what SPECIFIC EVIDENCE exists that indicates the current price of ${(probability * 100).toFixed(1)}% is incorrect?
   - Look for concrete facts, events, or information that point toward a different probability
   - Evaluate source credibility and recency
   - Focus on affirmative evidence of mispricing
   - Avoid reasoning like "there's no evidence supporting the current price" - that's not evidence FOR a mispricing

3. MARKET PSYCHOLOGY: Why might this market have low volume? Is it genuinely overlooked, or is it just boring/obvious?

4. MISPRICING ASSESSMENT: Given the current probability of ${(probability * 100).toFixed(1)}%, and the specific evidence you identified above, is there a mispricing? If so, in which direction and by approximately how much?

   ⚠️ CRITICAL CHECK: If you believe there is a LARGE mispricing (>15 cents), especially if you think something is highly likely or guaranteed but the market doesn't price it that way, STOP and re-verify:
   - Do you truly understand the EXACT resolution criteria?
       - If you believe the resolution criteria have already been met and the market is still very mispriced, that is a very strong indication that you are missing something (for example, the qualifying event might have happened before the beginning of the market).
   - Are there any edge cases, technicalities, or specific conditions in the market description that you might have missed?
   - Could there be a valid reason the market prices this differently than you expect?
   - Re-read the market question and description carefully before proceeding.
   
   Common pitfalls: confusing similar events, missing time bounds, misunderstanding "will X happen" vs "will X be announced", missing specific conditions.

5. EXPECTED VALUE CALCULATION: Estimate the expected value of investigating this market by considering BOTH:
   - STRENGTH of evidence: How strong and reliable is the specific evidence you found? How confident are you that it indicates a mispricing? (0-100%)
   - MAGNITUDE of mispricing: If mispriced, how large is the error? (cents)
   - Expected value = (Strength of evidence) × (Magnitude of mispricing)
   
   Examples:
   - 80% confidence in 15 cents mispricing = 12 cents expected value
   - 40% confidence in 20 cents mispricing = 8 cents expected value
   - 90% confidence in 3 cents mispricing = 2.7 cents expected value
   - 20% confidence in 10 cents mispricing = 2 cents expected value

6. CONFIDENCE: Rate your confidence in this assessment.
   - Use EXACTLY one of: low, medium, high

OUTPUT FORMAT:
Your response will be automatically structured into JSON with these fields:
- analysis: Your complete analysis (all 6 sections above)
- links: Links to the sources you used for your analysis with a brief description of the content
- expectedValue: Numeric value in cents (e.g., 12.5)
- summary: 2-3 sentence summary of key findings for a notification
- confidence: Exactly one of: "low", "medium", or "high"`;
  }

  /**
   * Perform research using Exa's Research API
   * This includes both web search and AI analysis in one step
   * Returns the structured ResearchOutput and cost data
   */
  private async performResearch(instructions: string, logBuffer?: string[]): Promise<{
    output: ResearchOutput;
    cost: { numPages: number; numSearches: number; reasoningTokens: number; total: number };
  }> {
    const log = (message: string) => {
      if (logBuffer) {
        logBuffer.push(message);
      }
    };

    // Wait if we've hit the Exa concurrency limit
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
      // Define the output schema for structured JSON response
      const outputSchema = {
        type: 'object',
        properties: {
          analysis: {
            type: 'string',
            description: 'Complete chain-of-thought analysis covering all 6 sections'
          },
          links: {
            type: 'array',
            description: 'Links to the sources you used for your analysis with a brief description of the content',
            items: {
              type: 'object',
              properties: {
                url: { type: 'string', description: 'The URL of the source' },
                description: { type: 'string', description: 'A brief description of the content' }
              },
              required: ['url', 'description']
            }
          },
          expectedValue: {
            type: 'number',
            description: 'Expected value in cents (e.g., 12.5)'
          },
          summary: {
            type: 'string',
            description: '2-3 sentence summary of key findings for a notification'
          },
          confidence: {
            type: 'string',
            enum: ['low', 'medium', 'high'],
            description: 'Confidence level in the assessment'
          }
        },
        required: ['analysis', 'expectedValue', 'summary', 'confidence']
      };

      // Start the research task
      const researchTask = await this.exaClient.research.create({
        instructions,
        model: 'exa-research', // Use standard model for balance of speed and quality
        outputSchema,
      });

      const researchId = researchTask.researchId;
      log(`   ⏳ Research task started (ID: ${researchId}), waiting for completion...`);
      const result = await this.exaClient.research.pollUntilFinished(researchId, {
        pollInterval: this.researchPollIntervalMs,
        timeoutMs: this.researchMaxWaitMs,
      });

      // Check if the result has the output field (completed status)
      if (result.status === 'completed' && 'output' in result) {
        const parsed = result.output.parsed as ResearchOutput | undefined;
        if (parsed) {
          // Extract cost data (always available on completed status)
          const cost = result.costDollars;
          
          // Log cost information
          log(`   💰 Research cost: $${cost.total.toFixed(4)} (${cost.numSearches} searches, ${cost.numPages} pages, ${cost.reasoningTokens.toLocaleString()} tokens)`);

          return { output: parsed, cost };
        }
      }
      
      // Fallback: if no parsed output, throw an error
      throw new Error('Research completed but no parsed output was returned');
    } catch (error: any) {
      // Handle Exa SDK errors
      if (error.message?.includes('429') || error.message?.includes('rate limit')) {
        log(`   ⚠️  Exa rate limit hit. Consider reducing MAX_CONCURRENT_ANALYSES or upgrading your Exa plan.`);
      } else {
        log(`   ⚠️  Error calling Exa Research API: ${error instanceof Error ? error.message : error}`);
      }
      throw error;
    } finally {
      this.activeExaCalls--;
    }
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
