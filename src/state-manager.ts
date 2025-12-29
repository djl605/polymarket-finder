import * as fs from 'fs';
import * as path from 'path';
import { BotState, AlertedMarket, CachedAnalysis, AIAnalysis } from './types';

/**
 * Manages bot state persistence using a JSON file
 */
export class StateManager {
  private stateFilePath: string;
  private state: BotState;

  constructor(stateFilePath: string = 'state.json') {
    this.stateFilePath = path.resolve(stateFilePath);
    this.state = this.loadState();
  }

  /**
   * Load state from file
   */
  private loadState(): BotState {
    try {
      if (fs.existsSync(this.stateFilePath)) {
        const data = fs.readFileSync(this.stateFilePath, 'utf-8');
        const state = JSON.parse(data);
        console.log(`📁 Loaded state: ${Object.keys(state.alertedMarkets).length} previously alerted markets`);
        return state;
      }
    } catch (error) {
      console.warn('⚠️  Could not load state file, starting fresh');
    }

    // Return default state
    return {
      lastRun: new Date().toISOString(),
      alertedMarkets: {},
      cachedAnalyses: {},
    };
  }

  /**
   * Save state to file
   */
  saveState(): void {
    try {
      const data = JSON.stringify(this.state, null, 2);
      fs.writeFileSync(this.stateFilePath, data, 'utf-8');
      console.log('✅ State saved successfully');
    } catch (error) {
      console.error('❌ Error saving state:', error);
      throw error;
    }
  }

  /**
   * Check if a market has already been alerted
   */
  hasBeenAlerted(marketId: string): boolean {
    return marketId in this.state.alertedMarkets;
  }

  /**
   * Check if we've recently alerted about this market (within N days)
   */
  hasRecentlyAlerted(marketId: string, cooldownDays: number): boolean {
    const alert = this.state.alertedMarkets[marketId];
    if (!alert) return false;

    const alertDate = new Date(alert.alertedAt);
    const now = new Date();
    const daysSinceAlert = (now.getTime() - alertDate.getTime()) / (1000 * 60 * 60 * 24);

    return daysSinceAlert < cooldownDays;
  }

  /**
   * Mark a market as alerted
   */
  markAsAlerted(alertedMarket: AlertedMarket): void {
    this.state.alertedMarkets[alertedMarket.marketId] = alertedMarket;
    this.state.lastRun = new Date().toISOString();
  }

  /**
   * Get cached analysis for a market
   */
  getCachedAnalysis(marketId: string): CachedAnalysis | undefined {
    return this.state.cachedAnalyses[marketId];
  }

  /**
   * Check if cached analysis is still fresh (within N days)
   */
  isCachedAnalysisFresh(marketId: string, maxAgeDays: number): boolean {
    const cached = this.getCachedAnalysis(marketId);
    if (!cached) return false;

    const cachedDate = new Date(cached.lastAnalyzed);
    const now = new Date();
    const ageInDays = (now.getTime() - cachedDate.getTime()) / (1000 * 60 * 60 * 24);

    return ageInDays < maxAgeDays;
  }

  /**
   * Save analysis to cache
   */
  cacheAnalysis(
    marketId: string,
    question: string,
    price: number,
    analysis: AIAnalysis
  ): void {
    this.state.cachedAnalyses[marketId] = {
      marketId,
      question,
      lastAnalyzed: new Date().toISOString(),
      lastPrice: price,
      analysis,
    };
  }

  /**
   * Clean up old data (alerts and cached analyses)
   */
  cleanupOldData(daysToKeep: number): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    const cutoffTimestamp = cutoffDate.toISOString();

    let removedAlerts = 0;
    for (const [marketId, alert] of Object.entries(this.state.alertedMarkets)) {
      if (alert.alertedAt < cutoffTimestamp) {
        delete this.state.alertedMarkets[marketId];
        removedAlerts++;
      }
    }

    let removedAnalyses = 0;
    for (const [marketId, cached] of Object.entries(this.state.cachedAnalyses)) {
      if (cached.lastAnalyzed < cutoffTimestamp) {
        delete this.state.cachedAnalyses[marketId];
        removedAnalyses++;
      }
    }

    if (removedAlerts > 0 || removedAnalyses > 0) {
      console.log(`🧹 Cleaned up ${removedAlerts} old alerts, ${removedAnalyses} old analyses (>30 days)`);
    }
  }

  /**
   * Get statistics about alerted markets and cached analyses
   */
  getStats(): { 
    totalAlerts: number; 
    alerts7Days: number; 
    alerts30Days: number;
    totalCached: number;
  } {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let alerts7Days = 0;
    let alerts30Days = 0;

    for (const alert of Object.values(this.state.alertedMarkets)) {
      const alertDate = new Date(alert.alertedAt);
      if (alertDate > sevenDaysAgo) {
        alerts7Days++;
      }
      if (alertDate > thirtyDaysAgo) {
        alerts30Days++;
      }
    }

    return {
      totalAlerts: Object.keys(this.state.alertedMarkets).length,
      alerts7Days,
      alerts30Days,
      totalCached: Object.keys(this.state.cachedAnalyses).length,
    };
  }
}

