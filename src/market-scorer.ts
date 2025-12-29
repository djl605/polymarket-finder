import { EnrichedMarket, ScreeningCriteria } from './types';

/**
 * Calculates interest scores and formats market information
 */
export class MarketScorer {
  constructor(private criteria: ScreeningCriteria) {}

  /**
   * Calculate interest score for markets
   * Lower volume + tighter spread + older = more interesting (lower score)
   */
  calculateScore(market: EnrichedMarket): number {
    const volumeScore = market.volume / this.criteria.maxTotalVolume;
    const spreadScore = market.spread / this.criteria.maxSpreadCents;
    const ageScore = 1 - Math.min(market.ageInDays / 365, 1);
    
    return (volumeScore * 0.5) + (spreadScore * 0.3) + (ageScore * 0.2);
  }

  /**
   * Build formatted reason string describing why a market is interesting
   */
  buildReasonString(market: EnrichedMarket): string {
    return [
      `Age: ${Math.round(market.ageInDays)}d`,
      `Total Vol: $${Math.round(market.volume)}`,
      `Price: ${(market.mainProbability * 100).toFixed(1)}%`,
      `Spread: ${market.spread.toFixed(1)}¢`,
    ].join(' | ');
  }
}

