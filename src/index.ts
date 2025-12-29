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
    console.log(`     - Reasoning: ${config.openaiApiKey ? 'OpenAI o1-mini' : 'Disabled'}`);
    console.log(`     - Research: ${config.exaApiKey ? 'Exa AI' : 'Disabled'}\n`);

    // Initialize components
    const fetcher = new MarketFetcher();
    const scorer = new MarketScorer(config.screening);
    const aiResearcher = new AIResearcher(config.openaiApiKey, config.exaApiKey);
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

    // Step 2: Analyze ALL candidates (with caching)
    console.log('🤖 Analyzing candidates...\n');

    interface AnalyzedMarket {
      screenedMarket: ScreenedMarket;
      analysis: AIAnalysis;
      rank: number; // Lower = better
    }

    const analyzedMarkets: AnalyzedMarket[] = [];

    for (const market of screenedMarkets) {
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

      console.log(`📊 ${market.question.substring(0, 80)}...`);
      console.log(`   ${reason}`);

      // Check for cached analysis
      let analysis: AIAnalysis;
      if (stateManager.isCachedAnalysisFresh(marketId, config.cacheMaxAgeDays)) {
        const cached = stateManager.getCachedAnalysis(marketId)!;
        analysis = cached.analysis;
        console.log(`   ♻️  Using cached analysis (${Math.round((Date.now() - new Date(cached.lastAnalyzed).getTime()) / (1000 * 60 * 60))}h old)`);
      } else {
        // Run AI analysis
        analysis = await aiResearcher.analyzeMarket(screenedMarket);
        console.log(`   AI: ${analysis.suggestedAction} (${analysis.confidence} confidence)`);
        
        // Cache the analysis
        stateManager.cacheAnalysis(marketId, market.question, price, analysis);
        
        // Rate limiting for API calls
        await sleepImpl.sleep(2000);
      }

      // Calculate rank (lower = better)
      const rank = calculateRank(analysis);
      
      analyzedMarkets.push({
        screenedMarket,
        analysis,
        rank,
      });

      console.log('');
    }

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

