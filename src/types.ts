/**
 * Type definitions for the Polymarket scanner bot
 */

/**
 * Market data from Gamma API with calculated metrics and order book data
 */
export interface EnrichedMarket {
  market: any; // Raw market data from Gamma API
  tokenId: string;
  conditionId: string;
  question: string;
  description: string;
  outcomes: string[];
  active: boolean;
  closed: boolean;
  createdAt: Date;
  endDate: Date;
  volume: number;
  volume24hr: number;
  outcomePrices: string[];
  
  // Calculated metrics
  ageInDays: number;
  mainProbability: number; // 0-1
  
  // Order book data from Gamma API
  bestBid: number;  // Best bid in USDC (e.g., 0.45 = $0.45)
  bestAsk: number;  // Best ask in USDC (e.g., 0.48 = $0.48)
  spread: number;   // Spread in cents (e.g., 3 = 3¢ difference)
}

/**
 * Criteria for screening markets
 */
export interface ScreeningCriteria {
  minMarketAgeDays: number;
  maxTotalVolume: number;
  maxSpreadCents: number;
  minProbability: number;
  maxProbability: number;
}

/**
 * A market that passed screening
 */
export interface ScreenedMarket {
  market: EnrichedMarket;
  reason: string;
  score: number; // Lower = more interesting
}

/**
 * AI analysis result
 */
export interface AIAnalysis {
  marketId: string;
  question: string;
  fullAnalysis: string;      // Complete reasoning chain from AI
  summary: string;            // Short excerpt for notifications
  confidence: 'low' | 'medium' | 'high';
  suggestedAction: 'skip' | 'research' | 'strong_signal';
}

/**
 * Cached analysis for a market
 */
export interface CachedAnalysis {
  marketId: string;
  question: string;
  lastAnalyzed: string;
  lastPrice: number;
  analysis: AIAnalysis;
}

/**
 * Record of an alerted market
 */
export interface AlertedMarket {
  marketId: string;
  question: string;
  alertedAt: string;
  price: number;
}

/**
 * Bot state persisted between runs
 */
export interface BotState {
  lastRun: string;
  alertedMarkets: Record<string, AlertedMarket>;
  cachedAnalyses: Record<string, CachedAnalysis>;
}

/**
 * Bot configuration
 */
export interface Config {
  discordWebhookUrl: string;
  openaiApiKey: string;
  exaApiKey: string;
  screening: ScreeningCriteria;
  cacheMaxAgeDays: number;
  alertCooldownDays: number;
  maxAlertsPerRun: number;
}

