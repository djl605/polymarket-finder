import { StateManager } from '../state-manager';
import { AlertedMarket, CachedAnalysis, AIAnalysis } from '../types';
import * as fs from 'fs';
import * as path from 'path';

describe('StateManager', () => {
  const testStateFile = path.join(__dirname, 'test-state.json');
  let stateManager: StateManager;

  beforeEach(() => {
    // Clean up test file before each test
    if (fs.existsSync(testStateFile)) {
      fs.unlinkSync(testStateFile);
    }
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    // Clean up test file after each test
    if (fs.existsSync(testStateFile)) {
      fs.unlinkSync(testStateFile);
    }
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create new state when file does not exist', () => {
      stateManager = new StateManager(testStateFile);
      const stats = stateManager.getStats();
      
      expect(stats.totalAlerts).toBe(0);
      expect(stats.totalCached).toBe(0);
    });

    it('should load existing state from file', () => {
      const existingState = {
        lastRun: '2024-01-01T00:00:00.000Z',
        alertedMarkets: {
          market1: {
            marketId: 'market1',
            question: 'Test market',
            alertedAt: '2024-01-01T00:00:00.000Z',
            price: 0.5,
          },
        },
        cachedAnalyses: {},
      };

      fs.writeFileSync(testStateFile, JSON.stringify(existingState), 'utf-8');
      stateManager = new StateManager(testStateFile);

      expect(stateManager.hasBeenAlerted('market1')).toBe(true);
    });

    it('should handle corrupted state file', () => {
      fs.writeFileSync(testStateFile, 'invalid json', 'utf-8');
      stateManager = new StateManager(testStateFile);

      const stats = stateManager.getStats();
      expect(stats.totalAlerts).toBe(0);
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('saveState', () => {
    it('should save state to file', () => {
      stateManager = new StateManager(testStateFile);
      
      const alert: AlertedMarket = {
        marketId: 'market1',
        question: 'Test market',
        alertedAt: new Date().toISOString(),
        price: 0.5,
      };
      
      stateManager.markAsAlerted(alert);
      stateManager.saveState();

      expect(fs.existsSync(testStateFile)).toBe(true);
      
      const savedData = JSON.parse(fs.readFileSync(testStateFile, 'utf-8'));
      expect(savedData.alertedMarkets.market1).toBeDefined();
    });

    it('should format JSON with indentation', () => {
      stateManager = new StateManager(testStateFile);
      stateManager.saveState();

      const content = fs.readFileSync(testStateFile, 'utf-8');
      expect(content).toContain('\n');
      expect(content).toContain('  '); // Indentation
    });
  });

  describe('hasBeenAlerted', () => {
    beforeEach(() => {
      stateManager = new StateManager(testStateFile);
    });

    it('should return false for new market', () => {
      expect(stateManager.hasBeenAlerted('new-market')).toBe(false);
    });

    it('should return true for alerted market', () => {
      const alert: AlertedMarket = {
        marketId: 'market1',
        question: 'Test',
        alertedAt: new Date().toISOString(),
        price: 0.5,
      };
      
      stateManager.markAsAlerted(alert);
      expect(stateManager.hasBeenAlerted('market1')).toBe(true);
    });
  });

  describe('hasRecentlyAlerted', () => {
    beforeEach(() => {
      stateManager = new StateManager(testStateFile);
    });

    it('should return false for market never alerted', () => {
      expect(stateManager.hasRecentlyAlerted('new-market', 7)).toBe(false);
    });

    it('should return true for recently alerted market', () => {
      const alert: AlertedMarket = {
        marketId: 'market1',
        question: 'Test',
        alertedAt: new Date().toISOString(),
        price: 0.5,
      };
      
      stateManager.markAsAlerted(alert);
      expect(stateManager.hasRecentlyAlerted('market1', 7)).toBe(true);
    });

    it('should return false for market alerted outside cooldown', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 10);
      
      const alert: AlertedMarket = {
        marketId: 'market1',
        question: 'Test',
        alertedAt: oldDate.toISOString(),
        price: 0.5,
      };
      
      stateManager.markAsAlerted(alert);
      expect(stateManager.hasRecentlyAlerted('market1', 7)).toBe(false);
    });

    it('should handle edge case at cooldown boundary', () => {
      const exactlySevenDaysAgo = new Date();
      exactlySevenDaysAgo.setDate(exactlySevenDaysAgo.getDate() - 7);
      exactlySevenDaysAgo.setHours(exactlySevenDaysAgo.getHours() - 1); // Just over 7 days
      
      const alert: AlertedMarket = {
        marketId: 'market1',
        question: 'Test',
        alertedAt: exactlySevenDaysAgo.toISOString(),
        price: 0.5,
      };
      
      stateManager.markAsAlerted(alert);
      expect(stateManager.hasRecentlyAlerted('market1', 7)).toBe(false);
    });
  });

  describe('markAsAlerted', () => {
    beforeEach(() => {
      stateManager = new StateManager(testStateFile);
    });

    it('should mark market as alerted', () => {
      const alert: AlertedMarket = {
        marketId: 'market1',
        question: 'Test market',
        alertedAt: new Date().toISOString(),
        price: 0.5,
      };
      
      stateManager.markAsAlerted(alert);
      expect(stateManager.hasBeenAlerted('market1')).toBe(true);
    });

    it('should update lastRun timestamp', () => {
      const alert: AlertedMarket = {
        marketId: 'market1',
        question: 'Test',
        alertedAt: new Date().toISOString(),
        price: 0.5,
      };
      
      stateManager.markAsAlerted(alert);
      stateManager.saveState();
      
      const savedData = JSON.parse(fs.readFileSync(testStateFile, 'utf-8'));
      expect(savedData.lastRun).toBeDefined();
    });

    it('should overwrite existing alert', () => {
      const alert1: AlertedMarket = {
        marketId: 'market1',
        question: 'Test',
        alertedAt: '2024-01-01T00:00:00.000Z',
        price: 0.5,
      };
      
      const alert2: AlertedMarket = {
        marketId: 'market1',
        question: 'Test Updated',
        alertedAt: '2024-01-02T00:00:00.000Z',
        price: 0.6,
      };
      
      stateManager.markAsAlerted(alert1);
      stateManager.markAsAlerted(alert2);
      stateManager.saveState();
      
      const savedData = JSON.parse(fs.readFileSync(testStateFile, 'utf-8'));
      expect(savedData.alertedMarkets.market1.price).toBe(0.6);
    });
  });

  describe('cacheAnalysis', () => {
    beforeEach(() => {
      stateManager = new StateManager(testStateFile);
    });

    it('should cache analysis', () => {
      const analysis: AIAnalysis = {
        marketId: 'market1',
        question: 'Test',
        fullAnalysis: 'Full analysis text',
        summary: 'Summary',
        confidence: 'high',
        suggestedAction: 'research',
      };
      
      stateManager.cacheAnalysis('market1', 'Test', 0.5, analysis);
      
      const cached = stateManager.getCachedAnalysis('market1');
      expect(cached).toBeDefined();
      expect(cached?.analysis.confidence).toBe('high');
    });

    it('should include timestamp in cached analysis', () => {
      const analysis: AIAnalysis = {
        marketId: 'market1',
        question: 'Test',
        fullAnalysis: 'Full analysis',
        summary: 'Summary',
        confidence: 'medium',
        suggestedAction: 'research',
      };
      
      stateManager.cacheAnalysis('market1', 'Test', 0.5, analysis);
      
      const cached = stateManager.getCachedAnalysis('market1');
      expect(cached?.lastAnalyzed).toBeDefined();
      expect(new Date(cached!.lastAnalyzed).getTime()).toBeLessThanOrEqual(Date.now());
    });
  });

  describe('getCachedAnalysis', () => {
    beforeEach(() => {
      stateManager = new StateManager(testStateFile);
    });

    it('should return undefined for non-existent cache', () => {
      expect(stateManager.getCachedAnalysis('nonexistent')).toBeUndefined();
    });

    it('should return cached analysis', () => {
      const analysis: AIAnalysis = {
        marketId: 'market1',
        question: 'Test',
        fullAnalysis: 'Full analysis',
        summary: 'Summary',
        confidence: 'high',
        suggestedAction: 'strong_signal',
      };
      
      stateManager.cacheAnalysis('market1', 'Test', 0.5, analysis);
      
      const cached = stateManager.getCachedAnalysis('market1');
      expect(cached?.marketId).toBe('market1');
      expect(cached?.analysis.suggestedAction).toBe('strong_signal');
    });
  });

  describe('isCachedAnalysisFresh', () => {
    beforeEach(() => {
      stateManager = new StateManager(testStateFile);
    });

    it('should return false for non-existent cache', () => {
      expect(stateManager.isCachedAnalysisFresh('nonexistent', 3)).toBe(false);
    });

    it('should return true for fresh cache', () => {
      const analysis: AIAnalysis = {
        marketId: 'market1',
        question: 'Test',
        fullAnalysis: 'Full analysis',
        summary: 'Summary',
        confidence: 'medium',
        suggestedAction: 'research',
      };
      
      stateManager.cacheAnalysis('market1', 'Test', 0.5, analysis);
      expect(stateManager.isCachedAnalysisFresh('market1', 3)).toBe(true);
    });

    it('should return false for stale cache', () => {
      const analysis: AIAnalysis = {
        marketId: 'market1',
        question: 'Test',
        fullAnalysis: 'Full analysis',
        summary: 'Summary',
        confidence: 'low',
        suggestedAction: 'skip',
      };
      
      stateManager.cacheAnalysis('market1', 'Test', 0.5, analysis);
      
      // Manually set old date
      const cached = stateManager.getCachedAnalysis('market1');
      if (cached) {
        const oldDate = new Date();
        oldDate.setDate(oldDate.getDate() - 5);
        cached.lastAnalyzed = oldDate.toISOString();
      }
      
      expect(stateManager.isCachedAnalysisFresh('market1', 3)).toBe(false);
    });
  });

  describe('cleanupOldData', () => {
    beforeEach(() => {
      stateManager = new StateManager(testStateFile);
    });

    it('should remove old alerts', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 40);
      
      const oldAlert: AlertedMarket = {
        marketId: 'old-market',
        question: 'Old',
        alertedAt: oldDate.toISOString(),
        price: 0.5,
      };
      
      const recentAlert: AlertedMarket = {
        marketId: 'recent-market',
        question: 'Recent',
        alertedAt: new Date().toISOString(),
        price: 0.6,
      };
      
      stateManager.markAsAlerted(oldAlert);
      stateManager.markAsAlerted(recentAlert);
      
      stateManager.cleanupOldData(30);
      
      expect(stateManager.hasBeenAlerted('old-market')).toBe(false);
      expect(stateManager.hasBeenAlerted('recent-market')).toBe(true);
    });

    it('should remove old cached analyses', () => {
      const analysis: AIAnalysis = {
        marketId: 'market1',
        question: 'Test',
        fullAnalysis: 'Full',
        summary: 'Summary',
        confidence: 'medium',
        suggestedAction: 'research',
      };
      
      stateManager.cacheAnalysis('market1', 'Test', 0.5, analysis);
      
      // Manually set old date
      const cached = stateManager.getCachedAnalysis('market1');
      if (cached) {
        const oldDate = new Date();
        oldDate.setDate(oldDate.getDate() - 40);
        cached.lastAnalyzed = oldDate.toISOString();
      }
      
      stateManager.cleanupOldData(30);
      
      expect(stateManager.getCachedAnalysis('market1')).toBeUndefined();
    });

    it('should not remove recent data', () => {
      const alert: AlertedMarket = {
        marketId: 'market1',
        question: 'Test',
        alertedAt: new Date().toISOString(),
        price: 0.5,
      };
      
      stateManager.markAsAlerted(alert);
      stateManager.cleanupOldData(30);
      
      expect(stateManager.hasBeenAlerted('market1')).toBe(true);
    });
  });

  describe('getStats', () => {
    beforeEach(() => {
      stateManager = new StateManager(testStateFile);
    });

    it('should return zero stats for empty state', () => {
      const stats = stateManager.getStats();
      
      expect(stats.totalAlerts).toBe(0);
      expect(stats.alerts7Days).toBe(0);
      expect(stats.alerts30Days).toBe(0);
      expect(stats.totalCached).toBe(0);
    });

    it('should count total alerts correctly', () => {
      const alert1: AlertedMarket = {
        marketId: 'market1',
        question: 'Test 1',
        alertedAt: new Date().toISOString(),
        price: 0.5,
      };
      
      const alert2: AlertedMarket = {
        marketId: 'market2',
        question: 'Test 2',
        alertedAt: new Date().toISOString(),
        price: 0.6,
      };
      
      stateManager.markAsAlerted(alert1);
      stateManager.markAsAlerted(alert2);
      
      const stats = stateManager.getStats();
      expect(stats.totalAlerts).toBe(2);
    });

    it('should count alerts within 7 days', () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 3);
      
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 10);
      
      const recentAlert: AlertedMarket = {
        marketId: 'recent',
        question: 'Recent',
        alertedAt: recentDate.toISOString(),
        price: 0.5,
      };
      
      const oldAlert: AlertedMarket = {
        marketId: 'old',
        question: 'Old',
        alertedAt: oldDate.toISOString(),
        price: 0.6,
      };
      
      stateManager.markAsAlerted(recentAlert);
      stateManager.markAsAlerted(oldAlert);
      
      const stats = stateManager.getStats();
      expect(stats.alerts7Days).toBe(1);
      expect(stats.alerts30Days).toBe(2);
    });

    it('should count cached analyses', () => {
      const analysis: AIAnalysis = {
        marketId: 'market1',
        question: 'Test',
        fullAnalysis: 'Full',
        summary: 'Summary',
        confidence: 'medium',
        suggestedAction: 'research',
      };
      
      stateManager.cacheAnalysis('market1', 'Test 1', 0.5, analysis);
      stateManager.cacheAnalysis('market2', 'Test 2', 0.6, analysis);
      
      const stats = stateManager.getStats();
      expect(stats.totalCached).toBe(2);
    });
  });
});

