import fetch from 'node-fetch';
import { EnrichedMarket, ScreeningCriteria } from './types';

/**
 * Fetches market data from Polymarket Gamma API
 */
export class MarketFetcher {
  private gammaApiUrl = 'https://gamma-api.polymarket.com';
  private readonly MAX_MARKETS_TO_FETCH = 10000; // Safety limit

  constructor() {
  }

  /**
   * Fetch active markets from Gamma API with immediate filtering and enrichment
   * Returns only markets that pass all screening criteria
   */
  async fetchActiveMarkets(criteria: ScreeningCriteria): Promise<EnrichedMarket[]> {
    try {
      console.log('📊 Fetching and screening markets from Gamma API...');
      
      const enrichedMarkets: EnrichedMarket[] = [];
      let offset = 0;
      const limit = 100; // Fetch in batches of 100
      let totalFetched = 0;
      let totalKept = 0;

      while (enrichedMarkets.length < this.MAX_MARKETS_TO_FETCH) {
        const url = `${this.gammaApiUrl}/markets?limit=${limit}&offset=${offset}&active=true&closed=false`;
        
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Gamma API request failed: ${response.status} ${response.statusText}`);
        }

        const batch = await response.json() as any[];
        
        if (!batch || batch.length === 0) {
          break;
        }

        totalFetched += batch.length;

        for (const rawMarket of batch) {
          // Skip invalid markets
          if (!rawMarket || !rawMarket.question || rawMarket.closed) {
            continue;
          }

          // Enrich the market with calculated fields
          const market = this.enrichMarket(rawMarket);

          if (!this.meetsAllCriteria(market, criteria)) {
            continue;
          }

          // Keep only markets that pass all filters
          enrichedMarkets.push(market);
          totalKept++;
        }

        if (totalFetched % 500 === 0) {
          console.log(`   Fetched ${totalFetched} markets, kept ${totalKept}...`);
        }

        offset += limit;

        // Check if we got fewer results than requested (indicates last page)
        if (batch.length < limit) {
          break;
        }

        // Add small delay to be respectful to the API
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (enrichedMarkets.length >= this.MAX_MARKETS_TO_FETCH) {
        console.log(`   ⚠️  Reached safety limit of ${this.MAX_MARKETS_TO_FETCH} markets`);
      }

      console.log(`   ✅ Fetched ${totalFetched} total markets, ${totalKept} passed screening\n`);
      return enrichedMarkets;

    } catch (error) {
      console.error('❌ Error fetching markets:', error);
      throw error;
    }
  }

  /**
   * Check if a market meets all screening criteria
   */
  private meetsAllCriteria(market: EnrichedMarket, criteria: ScreeningCriteria): boolean {
    // Check if actually active and not closed (defensive)
    if (!market.active || market.closed) {
      return false;
    }

    // Check market age
    if (market.ageInDays < criteria.minMarketAgeDays) {
      return false;
    }

    // Check volume
    if (market.volume > criteria.maxTotalVolume) {
      return false;
    }

    // Check probability range
    if (market.mainProbability < criteria.minProbability || 
        market.mainProbability > criteria.maxProbability) {
      return false;
    }

    // Check spread
    if (market.spread > criteria.maxSpreadCents) {
      return false;
    }

    return true;
  }

  /**
   * Process a single market with calculated metrics and order book data from Gamma API
   */
  private enrichMarket(market: any): EnrichedMarket {
    const now = new Date();
    const createdAt = new Date(market.startDate || market.createdAt || now);
    const ageInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

    // Get outcome prices (probabilities)
    // Note: outcomePrices comes as a JSON string from the API, e.g., "[\"0.6\", \"0.4\"]"
    const outcomePricesRaw = market.outcomePrices || '["0.5", "0.5"]';
    const outcomePrices = typeof outcomePricesRaw === 'string' 
      ? JSON.parse(outcomePricesRaw) 
      : outcomePricesRaw;
    const mainProbability = parseFloat(outcomePrices[0] || '0.5');

    // Parse outcomes (also comes as JSON string)
    const outcomesRaw = market.outcomes || '["Yes", "No"]';
    const outcomes = typeof outcomesRaw === 'string' 
      ? JSON.parse(outcomesRaw) 
      : outcomesRaw;

    // Parse volume data
    const volume = parseFloat(market.volume || '0');
    const volume24hr = parseFloat(market.volume24hr || '0');

    // Get the token ID for the primary outcome
    const tokenId = market.tokens?.[0]?.token_id || '';
    const conditionId = market.condition_id || market.conditionId || '';

    // Get order book data directly from Gamma API
    // The Gamma API includes bestBid, bestAsk, and spread in the response
    const bestBid = parseFloat(market.bestBid || '0');
    const bestAsk = parseFloat(market.bestAsk || '1');
    const spreadRaw = bestAsk - bestBid;
    const spread = spreadRaw * 100; // Convert to cents

    return {
      market,
      tokenId,
      conditionId,
      question: market.question,
      description: market.description || '',
      outcomes,
      active: market.active !== false,
      closed: market.closed || false,
      createdAt,
      endDate: new Date(market.endDate || market.end_date || now),
      volume,
      volume24hr,
      outcomePrices,
      ageInDays,
      mainProbability,
      bestBid,
      bestAsk,
      spread,
    };
  }

}

