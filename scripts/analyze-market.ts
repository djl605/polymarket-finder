import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import { AIResearcher } from '../src/ai-researcher';
import { MarketFetcher } from '../src/market-fetcher';
import { StateManager } from '../src/state-manager';
import { ScreenedMarket } from '../src/types';

// Load environment variables
dotenv.config();

/**
 * Extract slug from input (URL or direct slug)
 */
function extractSlug(input: string): string | null {
  // Check if it's a URL
  if (input.includes('polymarket.com')) {
    // Extract slug from URL
    // URL format: https://polymarket.com/event/market-slug or https://polymarket.com/market/market-slug
    const match = input.match(/polymarket\.com\/(?:event|market)\/([^/?#]+)/);
    if (match) {
      return match[1];
    }
    console.error('❌ Could not extract slug from URL');
    return null;
  }
  
  // Otherwise assume it's a slug
  return input;
}

/**
 * Fetch event data by slug using the events API
 * Returns the event object which contains all markets
 */
async function fetchEventBySlug(slug: string): Promise<any | null> {
  try {
    console.log(`📊 Fetching event: ${slug}...\n`);
    
    // Use the events endpoint with slug query parameter
    const url = `https://gamma-api.polymarket.com/events?slug=${encodeURIComponent(slug)}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`❌ Failed to fetch event: ${response.status} ${response.statusText}`);
      return null;
    }

    const events = await response.json() as any[];
    
    if (!events || events.length === 0) {
      console.error(`❌ No event found with slug: ${slug}`);
      console.error('💡 Check that the slug is correct or try copying the full URL from Polymarket');
      return null;
    }
    
    const event = events[0];
    
    if (!event.markets || event.markets.length === 0) {
      console.error('❌ No markets found for this event');
      return null;
    }
    
    return event;
  } catch (error) {
    console.error('❌ Error fetching event:', error);
    return null;
  }
}

/**
 * Main function to analyze a specific market
 */
async function main() {
  console.log('🤖 Polymarket Market Analyzer\n');
  console.log(`⏰ Time: ${new Date().toISOString()}\n`);

  // Get market identifier from command line args or environment variable
  const args = process.argv.slice(2);
  const input = args[0] || process.env.MARKET_ID;
  
  if (!input) {
    console.error('❌ Error: No market identifier provided');
    console.error('\nUsage:');
    console.error('  npm run analyze-market <url-or-slug> [outcome]');
    console.error('  OR set MARKET_ID environment variable');
    console.error('\nExamples:');
    console.error('  npm run analyze-market https://polymarket.com/event/will-bitcoin-hit-100k');
    console.error('  npm run analyze-market will-bitcoin-hit-100k');
    console.error('\nFor multi-outcome markets, add the outcome name:');
    console.error('  npm run analyze-market https://polymarket.com/event/most-rushing-yards-by-a-rookie-rb "Kyle Monangai"');
    console.error('  npm run analyze-market most-rushing-yards-by-a-rookie-rb "Ashton Jeanty"');
    process.exit(1);
  }

  // Load API keys from environment
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const exaApiKey = process.env.EXA_API_KEY;
  
  if (!openaiApiKey) {
    console.error('❌ Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }
  
  if (!exaApiKey) {
    console.error('❌ Error: EXA_API_KEY environment variable is required');
    process.exit(1);
  }

  const verboseLogs = process.env.VERBOSE_LOGS === 'true';
  
  console.log('✅ Configuration loaded');
  console.log(`   OpenAI API Key: ${openaiApiKey.substring(0, 10)}...`);
  console.log(`   Exa API Key: ${exaApiKey.substring(0, 10)}...`);
  console.log(`   Verbose logs: ${verboseLogs}\n`);

  // Extract slug from input (URL or direct slug)
  const slug = extractSlug(input);
  
  if (!slug) {
    console.error('❌ Invalid input format');
    process.exit(1);
  }
  
  // Fetch the event (which contains all markets)
  const event = await fetchEventBySlug(slug);
  
  if (!event) {
    console.error('❌ Failed to fetch event');
    process.exit(1);
  }
  
  // Check if this is a multi-outcome market
  const outcomeMarkets = event.markets;
  const isMultiOutcome = outcomeMarkets.length > 1;

  let rawMarket: any;

  if (isMultiOutcome) {
    // This is a multi-outcome market - need to specify which outcome
    console.log(`✅ Found ${outcomeMarkets.length} outcome markets:\n`);
    
    // Display all outcomes
    outcomeMarkets.forEach((m: any, idx: number) => {
      const outcomeName = m.groupItemTitle || m.question;
      
      let yesPrice = 0;
      if (m.outcomePrices) {
        const prices = typeof m.outcomePrices === 'string' ? JSON.parse(m.outcomePrices) : m.outcomePrices;
        yesPrice = parseFloat(prices?.[0] || '0');
      }
      
      console.log(`${idx + 1}. ${outcomeName}`);
      console.log(`   Probability: ${(yesPrice * 100).toFixed(1)}%`);
      console.log(`   Volume: $${parseFloat(m.volume || '0').toLocaleString()}`);
      console.log('');
    });
    
    // Check if user specified which outcome to analyze
    const outcomeFilter = args.slice(1).join(' '); // Everything after the first arg
    
    let selectedMarket: any;
    
    if (outcomeFilter) {
      // User specified an outcome - find the matching market
      console.log(`🔍 Looking for outcome matching: "${outcomeFilter}"\n`);
      
      const lowerFilter = outcomeFilter.toLowerCase();
      selectedMarket = outcomeMarkets.find((m: any) => {
        const outcomeName = m.groupItemTitle || m.question;
        return outcomeName.toLowerCase().includes(lowerFilter);
      });
      
      if (!selectedMarket) {
        console.error(`❌ No outcome found matching: "${outcomeFilter}"`);
        console.error('\n💡 Available outcomes:');
        outcomeMarkets.forEach((m: any) => {
          const outcomeName = m.groupItemTitle || m.question;
          console.error(`   - ${outcomeName}`);
        });
        process.exit(1);
      }
      
      const selectedOutcomeName = selectedMarket.groupItemTitle || selectedMarket.question;
      console.log(`✅ Selected outcome: ${selectedOutcomeName}\n`);
    } else {
      // No outcome specified - list them and exit
      console.error('❌ Please specify which outcome to analyze');
      console.error('\nUsage:');
      console.error(`  npm run analyze-market ${input} "<outcome-name>"`);
      console.error('\nExamples:');
      outcomeMarkets.slice(0, 3).forEach((m: any) => {
        const outcomeName = m.groupItemTitle || m.question;
        console.error(`  npm run analyze-market ${input} "${outcomeName}"`);
      });
      process.exit(1);
    }
    
    rawMarket = selectedMarket;
  } else {
    // Single market - use it directly
    console.log(`✅ Single market found\n`);
    rawMarket = outcomeMarkets[0];
  }
  
  // Enrich the market data
  const market = MarketFetcher.enrichMarketData(rawMarket);

  console.log('✅ Market ready for analysis');
  console.log(`   Question: ${market.question}`);
  console.log(`   Status: ${market.active ? 'Active' : 'Inactive'}${market.closed ? ' (Closed)' : ''}`);
  console.log(`   Current probability: ${(market.mainProbability * 100).toFixed(1)}%`);
  console.log(`   Volume: $${market.volume.toLocaleString()}`);
  console.log(`   Age: ${market.ageInDays.toFixed(1)} days`);
  console.log(`   Spread: ${market.spread.toFixed(1)}¢\n`);

  // Build a reason string (minimal, since we're not doing pre-screening)
  const reason = `Direct analysis request (Volume: $${market.volume.toLocaleString()}, Age: ${market.ageInDays.toFixed(0)}d, Spread: ${market.spread.toFixed(1)}¢)`;

  // Create a screened market object for the analyzer
  const screenedMarket: ScreenedMarket = {
    market,
    reason,
    score: 0, // Not used for direct analysis
  };

  // Initialize AI researcher (no research file manager for console output only)
  const aiResearcher = new AIResearcher(
    openaiApiKey,
    exaApiKey,
    1, // Single concurrent call
    verboseLogs
  );

  console.log('🤖 Running AI analysis...\n');
  console.log('='.repeat(80));
  
  const startTime = Date.now();
  
  // Run the analysis with research logging enabled
  const analysis = await aiResearcher.analyzeMarket(
    screenedMarket,
    undefined, // No log buffer - output directly to console
    true       // Log research context
  );
  
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('='.repeat(80));
  console.log('\n✅ Analysis complete!\n');
  console.log(`⏱️  Time taken: ${elapsed}s\n`);
  
  // Print results
  console.log('📊 ANALYSIS RESULTS');
  console.log('='.repeat(80));
  console.log(`Market: ${analysis.question}`);
  console.log(`Market ID: ${analysis.marketId}`);
  console.log(`\nConfidence: ${analysis.confidence.toUpperCase()}`);
  console.log(`Expected Value: ${analysis.expectedValue.toFixed(1)}¢`);
  console.log(`Research Version: ${analysis.researchVersion}`);
  console.log('\n--- SUMMARY ---');
  console.log(analysis.summary);
  console.log('\n--- FULL ANALYSIS ---');
  console.log(analysis.fullAnalysis);
  console.log('='.repeat(80));
  
  // Exit successfully
  process.exit(0);
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
}

