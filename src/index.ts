import * as dotenv from 'dotenv';
import { loadConfig } from './config';
import { MarketFetcher } from './market-fetcher';
import { MarketScorer } from './market-scorer';
import { AIResearcher } from './ai-researcher';
import { DiscordNotifier } from './discord-notifier';
import { StateManager } from './state-manager';
import { ResearchFileManager } from './research-file-manager';
import { EnrichedMarket, ScreenedMarket, AIAnalysis } from './types';

// Load environment variables
dotenv.config();

/**
 * Main bot execution
 */
export async function main() {
  console.log('🤖 Polymarket Scanner Bot Starting...\n');
  console.log(`⏰ Run time: ${new Date().toISOString()}\n`);
  
  const mainStartTime = Date.now();

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
    console.log(`     - Cache expiry: ${config.cacheMinAgeDays}-${config.cacheMaxAgeDays} days (random per market)`);
    console.log(`     - Alert cooldown: ${config.alertCooldownDays} days`);
    console.log(`     - Max alerts per run: ${config.maxAlertsPerRun}`);
    console.log(`   AI:`);
    console.log(`     - Reasoning: ${config.openaiApiKey ? 'OpenAI' : 'Disabled'}`);
    console.log(`     - Research: ${config.exaApiKey ? 'Exa AI' : 'Disabled'}`);
    console.log(`     - Concurrent analyses: ${config.maxConcurrentAnalyses}`);
    console.log(`     - Verbose logs: ${config.verboseLogs ? 'Enabled' : 'Disabled'}\n`);

    // Initialize components
    const fetcher = new MarketFetcher();
    const scorer = new MarketScorer(config.screening);
    const researchFileManager = new ResearchFileManager('research');
    const aiResearcher = new AIResearcher(
      config.openaiApiKey,
      config.exaApiKey,
      config.maxConcurrentAnalyses,
      config.verboseLogs,
      researchFileManager
    );
    const notifier = new DiscordNotifier(config.discordWebhookUrl, config.githubRepo, researchFileManager);
    const stateManager = new StateManager('state.json', config.cacheMinAgeDays, config.cacheMaxAgeDays);

    // Clean up old alerts
    stateManager.cleanupOldData(30);

    // Step 1: Fetch and screen markets (filtering happens during fetch for efficiency)
    const { markets: screenedMarkets, totalFetched, totalScreened } = await fetcher.fetchActiveMarkets(config.screening);
    
    if (screenedMarkets.length === 0) {
      console.log('✅ No opportunities found this scan');
      const totalRuntime = (Date.now() - mainStartTime) / 1000;
      await notifier.sendSummary(totalFetched, totalScreened, 0, 0, totalRuntime);
      return;
    }

    // Step 2: Analyze ALL candidates (with caching) - CONCURRENTLY
    console.log(`🤖 Analyzing ${screenedMarkets.length} market${screenedMarkets.length === 1 ? '' : 's'} (up to ${config.maxConcurrentAnalyses} concurrent)...\n`);
    
    // Track new vs cached analyses
    let newAnalysesCount = 0;
    let cachedAnalysesCount = 0;

    interface AnalyzedMarket {
      screenedMarket: ScreenedMarket;
      analysis: AIAnalysis;
    }

    interface AnalysisResult {
      analyzedMarket: AnalyzedMarket;
      logs: string[];
      usedCache: boolean;
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
      let usedCache = false;
      if (stateManager.isCachedAnalysisFresh(marketId)) {
        const cached = stateManager.getCachedAnalysis(marketId)!;
        analysis = cached.analysis;
        logs.push(`   ♻️  Using cached analysis (${Math.round((Date.now() - new Date(cached.lastAnalyzed).getTime()) / (1000 * 60 * 60))}h old)`);
        usedCache = true;
      } else {
        // Run AI analysis (pass logs buffer to keep organized)
        analysis = await aiResearcher.analyzeMarket(screenedMarket, logs);
        logs.push(`   AI: ${analysis.confidence} confidence, EV: ${analysis.expectedValue.toFixed(1)}¢`);
        
        // Cache the analysis (but NOT if it's a failed analysis)
        if (!analysis.fullAnalysis.startsWith('Analysis failed:')) {
          stateManager.cacheAnalysis(marketId, market.question, price, analysis);
        }
      }

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
        },
        logs,
        usedCache,
      };
    });

    // Wait for all analyses to complete
    const results: AnalysisResult[] = await Promise.all(analysisPromises);
    
    // Count new vs cached analyses
    for (const result of results) {
      if (result.usedCache) {
        cachedAnalysesCount++;
      } else {
        newAnalysesCount++;
      }
    }
    
    // Final progress update
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    process.stderr.write(`\r✅ Completed ${total} market${total === 1 ? '' : 's'} in ${totalTime}s\n\n`);

    // Extract analyzed markets for further processing
    const analyzedMarkets: AnalyzedMarket[] = results.map(r => r.analyzedMarket);

    // Step 6: Sort by expected value (higher is better) and alert top opportunities
    analyzedMarkets.sort((a, b) => b.analysis.expectedValue - a.analysis.expectedValue);

    let alertCount = 0;

    console.log('📣 Sending alerts for top opportunities...\n');

    for (const { screenedMarket, analysis } of analyzedMarkets) {
      const marketId = screenedMarket.market.conditionId;

      // Skip if expected value is not high enough (threshold: 10 cents)
      if (analysis.expectedValue <= 10) {
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
      console.log(`   ${analysis.confidence} confidence, EV: ${analysis.expectedValue.toFixed(1)}¢${isRealert ? ' [RE-ALERT]' : ''}`);

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
    const totalRuntime = (Date.now() - mainStartTime) / 1000;
    await notifier.sendSummary(totalFetched, totalScreened, newAnalysesCount, cachedAnalysesCount, totalRuntime);

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


// Run the bot if this file is executed directly (not imported for testing)
if (require.main === module) {
  main();
}

