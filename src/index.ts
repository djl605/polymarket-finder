import * as dotenv from 'dotenv';
import { loadConfig } from './config';
import { MarketFetcher } from './market-fetcher';
import { MarketScorer } from './market-scorer';
import { AIResearcher } from './ai-researcher';
import { DiscordNotifier } from './discord-notifier';
import { StateManager } from './state-manager';
import { EnrichedMarket, ScreenedMarket, AIAnalysis } from './types';

// Load environment variables
dotenv.config();

/**
 * Main bot execution
 */
export async function main() {
  console.log('🤖 Polymarket Scanner Bot Starting...\n');
  console.log(`⏰ Run time: ${new Date().toISOString()}\n`);

  try {
    // Load configuration
    const config = loadConfig();
    console.log('✅ Configuration loaded');
    console.log(`   Screening:`);
    console.log(`     - Min age: ${config.screening.minMarketAgeDays} days`);
    console.log(`     - Max total volume: $${config.screening.maxTotalVolume}`);
    console.log(`     - Max spread: ${config.screening.maxSpreadCents}¢`);
    console.log(`     - Probability range: ${(config.screening.minProbability * 100).toFixed(0)}%-${(config.screening.maxProbability * 100).toFixed(0)}%`);
    console.log(`   Behavior:`);
    console.log(`     - Cache age: ${config.cacheMaxAgeDays} days`);
    console.log(`     - Alert cooldown: ${config.alertCooldownDays} days`);
    console.log(`     - Max alerts per run: ${config.maxAlertsPerRun}`);
    console.log(`   AI:`);
    console.log(`     - Reasoning: ${config.openaiApiKey ? 'OpenAI o4-mini' : 'Disabled'}`);
    console.log(`     - Research: ${config.exaApiKey ? 'Exa AI' : 'Disabled'}`);
    console.log(`     - Concurrent analyses: ${config.maxConcurrentAnalyses}`);
    console.log(`     - Verbose logs: ${config.verboseLogs ? 'Enabled' : 'Disabled'}\n`);

    // Initialize components
    const fetcher = new MarketFetcher();
    const scorer = new MarketScorer(config.screening);
    const aiResearcher = new AIResearcher(
      config.openaiApiKey,
      config.exaApiKey,
      config.maxConcurrentAnalyses,
      config.verboseLogs
    );
    const notifier = new DiscordNotifier(config.discordWebhookUrl);
    const stateManager = new StateManager();

    // Clean up old alerts
    stateManager.cleanupOldData(30);

    // Step 1: Fetch and screen markets (filtering happens during fetch for efficiency)
    const screenedMarkets = await fetcher.fetchActiveMarkets(config.screening);
    
    if (screenedMarkets.length === 0) {
      console.log('✅ No opportunities found this scan');
      return;
    }

    // Step 2: Analyze ALL candidates (with caching) - CONCURRENTLY
    console.log(`🤖 Analyzing ${screenedMarkets.length} market${screenedMarkets.length === 1 ? '' : 's'} (up to ${config.maxConcurrentAnalyses} concurrent)...\n`);

    interface AnalyzedMarket {
      screenedMarket: ScreenedMarket;
      analysis: AIAnalysis;
      rank: number; // Lower = better
    }

    interface AnalysisResult {
      analyzedMarket: AnalyzedMarket;
      logs: string[];
    }

    // Track progress
    let completed = 0;
    const total = screenedMarkets.length;
    const startTime = Date.now();

    // Process all markets concurrently
    const analysisPromises = screenedMarkets.map(async (market) => {
      const logs: string[] = [];
      const marketId = market.conditionId;
      const price = market.mainProbability;

      // Calculate score and format reason string
      const score = scorer.calculateScore(market);
      const reason = scorer.buildReasonString(market);
      const screenedMarket: ScreenedMarket = {
        market,
        reason,
        score,
      };

      logs.push(`📊 ${market.question.substring(0, 80)}...`);
      logs.push(`   ${reason}`);

      // Check for cached analysis
      let analysis: AIAnalysis;
      if (stateManager.isCachedAnalysisFresh(marketId, config.cacheMaxAgeDays)) {
        const cached = stateManager.getCachedAnalysis(marketId)!;
        analysis = cached.analysis;
        logs.push(`   ♻️  Using cached analysis (${Math.round((Date.now() - new Date(cached.lastAnalyzed).getTime()) / (1000 * 60 * 60))}h old)`);
      } else {
        // Run AI analysis (pass logs buffer to keep organized)
        analysis = await aiResearcher.analyzeMarket(screenedMarket, logs);
        logs.push(`   AI: ${analysis.suggestedAction} (${analysis.confidence} confidence)`);
        
        // Cache the analysis (but NOT if it's a failed analysis)
        if (!analysis.fullAnalysis.startsWith('Analysis failed:')) {
          stateManager.cacheAnalysis(marketId, market.question, price, analysis);
        }
      }

      // Calculate rank (lower = better)
      const rank = calculateRank(analysis);
      
      logs.push(''); // Empty line between markets

      for (const log of logs) {
        console.log(log);
      }

      // Update progress
      completed++;
      const percent = Math.round((completed / total) * 100);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      process.stderr.write(`\r⏳ Progress: ${completed}/${total} (${percent}%) - ${elapsed}s elapsed`);

      return {
        analyzedMarket: {
          screenedMarket,
          analysis,
          rank,
        },
        logs,
      };
    });

    // Wait for all analyses to complete
    const results: AnalysisResult[] = await Promise.all(analysisPromises);
    
    // Final progress update
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    process.stderr.write(`\r✅ Completed ${total} market${total === 1 ? '' : 's'} in ${totalTime}s\n\n`);

    // Extract analyzed markets for further processing
    const analyzedMarkets: AnalyzedMarket[] = results.map(r => r.analyzedMarket);

    // Step 6: Sort by rank and alert top opportunities
    analyzedMarkets.sort((a, b) => a.rank - b.rank);

    let alertCount = 0;

    console.log('📣 Sending alerts for top opportunities...\n');

    for (const { screenedMarket, analysis } of analyzedMarkets) {
      const marketId = screenedMarket.market.conditionId;

      // Skip if AI said skip
      if (analysis.suggestedAction === 'skip') {
        continue;
      }

      // Skip if we've alerted recently (within cooldown period)
      if (stateManager.hasRecentlyAlerted(marketId, config.alertCooldownDays)) {
        continue;
      }

      // Stop if we've hit the alert limit
      if (alertCount >= config.maxAlertsPerRun) {
        break;
      }

      const isRealert = stateManager.hasBeenAlerted(marketId);
      
      console.log(`🎯 ${screenedMarket.market.question.substring(0, 80)}...`);
      console.log(`   ${analysis.suggestedAction} (${analysis.confidence} confidence)${isRealert ? ' [RE-ALERT]' : ''}`);

      await notifier.sendMarketAlert(screenedMarket, analysis, isRealert);
      
      stateManager.markAsAlerted({
        marketId,
        question: screenedMarket.market.question,
        alertedAt: new Date().toISOString(),
        price: screenedMarket.market.mainProbability,
      });

      alertCount++;
      console.log(`   ✅ Alert sent\n`);
    }

    // Save state
    stateManager.saveState();

    // Send summary
    await notifier.sendSummary(0, screenedMarkets.length, alertCount);

    // Print stats
    const stats = stateManager.getStats();
    console.log('\n📈 Bot Statistics:');
    console.log(`   - Total alerts (all time): ${stats.totalAlerts}`);
    console.log(`   - Last 7 days: ${stats.alerts7Days}`);
    console.log(`   - Last 30 days: ${stats.alerts30Days}`);
    console.log(`   - Cached analyses: ${stats.totalCached}`);

    console.log('\n✅ Scan complete!');
  } catch (error) {
    console.error('\n❌ Error during scan:', error);
    process.exit(1);
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// For testing: export a function that can be replaced
export const sleepImpl = {
  sleep: (ms: number) => sleep(ms)
};

/**
 * Calculate rank for an analyzed market (lower = better)
 */
export function calculateRank(analysis: AIAnalysis): number {
  // Action ranking: strong_signal = 0, research = 10, skip = 1000
  let actionScore = 1000;
  if (analysis.suggestedAction === 'strong_signal') {
    actionScore = 0;
  } else if (analysis.suggestedAction === 'research') {
    actionScore = 10;
  }

  // Confidence ranking: high = 0, medium = 5, low = 10
  let confidenceScore = 10;
  if (analysis.confidence === 'high') {
    confidenceScore = 0;
  } else if (analysis.confidence === 'medium') {
    confidenceScore = 5;
  }

  return actionScore + confidenceScore;
}

// Run the bot if this file is executed directly (not imported for testing)
if (require.main === module) {
  main();
}

