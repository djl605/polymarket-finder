/**
 * Tests for the main bot orchestration
 */

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

import { main, sleep, sleepImpl } from '../index';
import { MarketFetcher } from '../market-fetcher';
import { MarketScorer } from '../market-scorer';
import { AIResearcher } from '../ai-researcher';
import { DiscordNotifier } from '../discord-notifier';
import { StateManager } from '../state-manager';
import { loadConfig } from '../config';
import { EnrichedMarket, AIAnalysis } from '../types';

// Mock all dependencies
jest.mock('../market-fetcher');
jest.mock('../market-scorer');
jest.mock('../ai-researcher');
jest.mock('../discord-notifier');
jest.mock('../state-manager');
jest.mock('../config');

describe('Bot Orchestration', () => {
  let mockExit: jest.SpyInstance;

  beforeAll(() => {
    // Mock process.exit to prevent tests from exiting
    mockExit = jest.spyOn(process, 'exit').mockImplementation(((code?: number) => {
      throw new Error(`process.exit called with ${code}`);
    }) as any);
  });

  afterAll(() => {
    mockExit.mockRestore();
  });

  const mockConfig = {
    discordWebhookUrl: 'https://discord.com/webhook/test',
    openaiApiKey: 'sk-test',
    screening: {
      minMarketAgeDays: 7,
      maxTotalVolume: 10000,
      maxSpreadCents: 6,
      minProbability: 0.15,
      maxProbability: 0.85,
    },
    cacheMinAgeDays: 4,
    cacheMaxAgeDays: 10,
    alertCooldownDays: 7,
    maxAlertsPerRun: 5,
    maxConcurrentAnalyses: 10,
    verboseLogs: false,
    githubRepo: 'test-owner/test-repo',
  };

  const mockMarket: EnrichedMarket = {
    market: {},
    tokenId: 'token1',
    conditionId: 'cond1',
    slug: 'test-market',
    question: 'Test market?',
    description: 'Test',
    outcomes: ['Yes', 'No'],
    active: true,
    closed: false,
    createdAt: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    volume: 5000,
    volume24hr: 100,
    outcomePrices: ['0.5', '0.5'],
    ageInDays: 30,
    mainProbability: 0.5,
    bestBid: 0.48,
    bestAsk: 0.52,
    spread: 4,
  };

  const mockAnalysis: AIAnalysis = {
    marketId: 'cond1',
    question: 'Test market?',
    fullAnalysis: 'Full analysis text',
    summary: 'Summary text',
    confidence: 'high',
    expectedValue: 15.0, // High EV to trigger alert
    researchVersion: '1.0',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock sleepImpl to resolve immediately
    sleepImpl.sleep = jest.fn().mockResolvedValue(undefined);
    (loadConfig as jest.Mock).mockReturnValue(mockConfig);
    
    // Setup default mocks
    const mockFetcher = MarketFetcher as jest.MockedClass<typeof MarketFetcher>;
    mockFetcher.prototype.fetchActiveMarkets = jest.fn().mockResolvedValue({
      markets: [mockMarket],
      totalFetched: 100,
      totalScreened: 1,
    });

    const mockScorer = MarketScorer as jest.MockedClass<typeof MarketScorer>;
    mockScorer.prototype.calculateScore = jest.fn().mockReturnValue(0.5);
    mockScorer.prototype.buildReasonString = jest.fn().mockReturnValue('Test reason');

    const mockResearcher = AIResearcher as jest.MockedClass<typeof AIResearcher>;
    mockResearcher.prototype.analyzeMarket = jest.fn().mockResolvedValue(mockAnalysis);

    const mockNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
    mockNotifier.prototype.sendMarketAlert = jest.fn().mockResolvedValue(undefined);
    mockNotifier.prototype.sendSummary = jest.fn().mockResolvedValue(undefined);

    const mockStateManager = StateManager as jest.MockedClass<typeof StateManager>;
    mockStateManager.prototype.cleanupOldData = jest.fn();
    mockStateManager.prototype.isCachedAnalysisFresh = jest.fn().mockReturnValue(false);
    mockStateManager.prototype.hasRecentlyAlerted = jest.fn().mockReturnValue(false);
    mockStateManager.prototype.canAlert = jest.fn().mockReturnValue(true);
    mockStateManager.prototype.cacheAnalysis = jest.fn();
    mockStateManager.prototype.markAsAlerted = jest.fn();
    mockStateManager.prototype.saveState = jest.fn();
    mockStateManager.prototype.getStats = jest.fn().mockReturnValue({
      totalAlerts: 0,
      alerts7Days: 0,
      alerts30Days: 0,
      totalCached: 0,
    });
  });

  describe('sleep', () => {
    it('should resolve after specified milliseconds', async () => {
      // Use the real sleep function for this test
      const realSleep = sleep;
      const start = Date.now();
      await realSleep(50);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(45);
      expect(elapsed).toBeLessThan(100);
    });
  });

  describe('main', () => {
    it('should complete successfully with markets found', async () => {
      await main();

      // Verify config was loaded
      expect(loadConfig).toHaveBeenCalled();

      // Verify components were instantiated
      expect(MarketFetcher).toHaveBeenCalled();
      expect(MarketScorer).toHaveBeenCalledWith(mockConfig.screening);
      expect(AIResearcher).toHaveBeenCalledWith(
        mockConfig.openaiApiKey,
        mockConfig.maxConcurrentAnalyses,
        mockConfig.verboseLogs,
        expect.any(Object) // ResearchFileManager
      );
      expect(DiscordNotifier).toHaveBeenCalledWith(
        mockConfig.discordWebhookUrl, 
        mockConfig.githubRepo,
        expect.any(Object) // ResearchFileManager
      );
      expect(StateManager).toHaveBeenCalled();

      // Verify workflow steps
      const mockFetcher = MarketFetcher as jest.MockedClass<typeof MarketFetcher>;
      expect(mockFetcher.prototype.fetchActiveMarkets).toHaveBeenCalledWith(mockConfig.screening);

      const mockResearcher = AIResearcher as jest.MockedClass<typeof AIResearcher>;
      expect(mockResearcher.prototype.analyzeMarket).toHaveBeenCalled();

      const mockNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
      expect(mockNotifier.prototype.sendMarketAlert).toHaveBeenCalled();
      expect(mockNotifier.prototype.sendSummary).toHaveBeenCalled();

      const mockStateManager = StateManager as jest.MockedClass<typeof StateManager>;
      expect(mockStateManager.prototype.saveState).toHaveBeenCalled();
    });

    it('should handle no markets found', async () => {
      const mockFetcher = MarketFetcher as jest.MockedClass<typeof MarketFetcher>;
      mockFetcher.prototype.fetchActiveMarkets = jest.fn().mockResolvedValue({
        markets: [],
        totalFetched: 100,
        totalScreened: 0,
      });

      await main();

      const mockNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
      expect(mockNotifier.prototype.sendMarketAlert).not.toHaveBeenCalled();
      expect(mockNotifier.prototype.sendSummary).toHaveBeenCalledWith(100, 0, 0, 0, 0, expect.any(Number));
    });

    it('should use cached analysis when available', async () => {
      const mockStateManager = StateManager as jest.MockedClass<typeof StateManager>;
      mockStateManager.prototype.isCachedAnalysisFresh = jest.fn().mockReturnValue(true);
      mockStateManager.prototype.getCachedAnalysis = jest.fn().mockReturnValue({
        marketId: 'cond1',
        question: 'Test?',
        lastAnalyzed: new Date().toISOString(),
        lastPrice: 0.5,
        analysis: mockAnalysis,
      });

      await main();

      const mockResearcher = AIResearcher as jest.MockedClass<typeof AIResearcher>;
      expect(mockResearcher.prototype.analyzeMarket).not.toHaveBeenCalled();

      const mockNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
      expect(mockNotifier.prototype.sendMarketAlert).toHaveBeenCalled();
    });

    it('should skip AI analysis for markets that cannot be alerted', async () => {
      const mockStateManager = StateManager as jest.MockedClass<typeof StateManager>;
      mockStateManager.prototype.canAlert = jest.fn().mockReturnValue(false);
      mockStateManager.prototype.getCachedAnalysis = jest.fn().mockReturnValue({
        marketId: 'cond1',
        question: 'Test?',
        lastAnalyzed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        lastPrice: 0.5,
        analysis: mockAnalysis,
      });

      await main();

      // Should skip AI analysis entirely for markets that cannot be alerted
      const mockResearcher = AIResearcher as jest.MockedClass<typeof AIResearcher>;
      expect(mockResearcher.prototype.analyzeMarket).not.toHaveBeenCalled();

      // And should not send alert
      const mockNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
      expect(mockNotifier.prototype.sendMarketAlert).not.toHaveBeenCalled();
    });

    it('should respect max alerts per run', async () => {
      const markets = Array(10).fill(null).map((_, i) => ({
        ...mockMarket,
        conditionId: `cond${i}`,
        tokenId: `token${i}`,
        question: `Market ${i}?`,
      }));

      const mockFetcher = MarketFetcher as jest.MockedClass<typeof MarketFetcher>;
      mockFetcher.prototype.fetchActiveMarkets = jest.fn().mockResolvedValue({
        markets,
        totalFetched: 1000,
        totalScreened: 10,
      });

      await main();

      const mockNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
      const alertCalls = (mockNotifier.prototype.sendMarketAlert as jest.Mock).mock.calls.length;
      
      expect(alertCalls).toBeLessThanOrEqual(mockConfig.maxAlertsPerRun);
      expect(alertCalls).toBe(mockConfig.maxAlertsPerRun); // Should alert exactly max
    });

    it('should handle errors gracefully', async () => {
      const mockFetcher = MarketFetcher as jest.MockedClass<typeof MarketFetcher>;
      mockFetcher.prototype.fetchActiveMarkets = jest.fn().mockRejectedValue(
        new Error('API error')
      );

      // Should call process.exit(1)
      await expect(main()).rejects.toThrow('process.exit called with 1');
    });

    it('should skip markets with EV <= 10', async () => {
      const lowEVAnalysis: AIAnalysis = {
        ...mockAnalysis,
        expectedValue: 8.0, // Below threshold
      };

      const mockResearcher = AIResearcher as jest.MockedClass<typeof AIResearcher>;
      mockResearcher.prototype.analyzeMarket = jest.fn().mockResolvedValue(lowEVAnalysis);

      await main();

      const mockNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
      expect(mockNotifier.prototype.sendMarketAlert).not.toHaveBeenCalled();
    });

    it('should alert markets with EV > 10', async () => {
      const highEVAnalysis: AIAnalysis = {
        ...mockAnalysis,
        expectedValue: 12.5, // Above threshold
      };

      const mockResearcher = AIResearcher as jest.MockedClass<typeof AIResearcher>;
      mockResearcher.prototype.analyzeMarket = jest.fn().mockResolvedValue(highEVAnalysis);

      await main();

      const mockNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
      expect(mockNotifier.prototype.sendMarketAlert).toHaveBeenCalled();
    });

    it('should refresh analysis older than 1 day before alerting', async () => {
      // Setup: market with high EV and stale cached analysis
      const staleAnalysis: AIAnalysis = {
        ...mockAnalysis,
        expectedValue: 15.0,
        summary: 'Old summary',
      };

      const refreshedAnalysis: AIAnalysis = {
        ...mockAnalysis,
        expectedValue: 18.0,
        summary: 'Refreshed summary',
      };

      const mockStateManager = StateManager as jest.MockedClass<typeof StateManager>;
      mockStateManager.prototype.isCachedAnalysisFresh = jest.fn().mockReturnValue(false); // Not using cache during analysis phase
      mockStateManager.prototype.isCachedAnalysisOlderThan = jest.fn().mockReturnValue(true); // Analysis is > 1 day old
      mockStateManager.prototype.hasBeenAlerted = jest.fn().mockReturnValue(false);

      // First call returns stale analysis, second call returns refreshed
      const mockResearcher = AIResearcher as jest.MockedClass<typeof AIResearcher>;
      mockResearcher.prototype.analyzeMarket = jest.fn()
        .mockResolvedValueOnce(staleAnalysis) // Initial analysis
        .mockResolvedValueOnce(refreshedAnalysis); // Refresh

      await main();

      // Should have called analyzeMarket twice: once for initial, once for refresh
      expect(mockResearcher.prototype.analyzeMarket).toHaveBeenCalledTimes(2);

      // Should cache the refreshed analysis
      expect(mockStateManager.prototype.cacheAnalysis).toHaveBeenCalledWith(
        'cond1',
        'Test market?',
        0.5,
        refreshedAnalysis
      );

      // Should alert with the refreshed analysis
      const mockNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
      expect(mockNotifier.prototype.sendMarketAlert).toHaveBeenCalledWith(
        expect.any(Object),
        refreshedAnalysis,
        false
      );
    });

    it('should not refresh analysis newer than 1 day', async () => {
      const recentAnalysis: AIAnalysis = {
        ...mockAnalysis,
        expectedValue: 15.0,
        summary: 'Recent summary',
      };

      const mockStateManager = StateManager as jest.MockedClass<typeof StateManager>;
      mockStateManager.prototype.isCachedAnalysisFresh = jest.fn().mockReturnValue(false);
      mockStateManager.prototype.isCachedAnalysisOlderThan = jest.fn().mockReturnValue(false); // Analysis is < 1 day old
      mockStateManager.prototype.hasBeenAlerted = jest.fn().mockReturnValue(false);

      const mockResearcher = AIResearcher as jest.MockedClass<typeof AIResearcher>;
      mockResearcher.prototype.analyzeMarket = jest.fn().mockResolvedValue(recentAnalysis);

      await main();

      // Should only call analyzeMarket once (no refresh)
      expect(mockResearcher.prototype.analyzeMarket).toHaveBeenCalledTimes(1);

      // Should still alert with the recent analysis
      const mockNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
      expect(mockNotifier.prototype.sendMarketAlert).toHaveBeenCalledWith(
        expect.any(Object),
        recentAnalysis,
        false
      );
    });

    it('should not cache failed analysis during refresh', async () => {
      const staleAnalysis: AIAnalysis = {
        ...mockAnalysis,
        expectedValue: 15.0,
      };

      const failedAnalysis: AIAnalysis = {
        marketId: 'cond1',
        question: 'Test market?',
        fullAnalysis: 'Analysis failed: API error',
        summary: 'Analysis failed due to API error',
        confidence: 'low',
        expectedValue: 0,
        researchVersion: '0.0',
      };

      const mockStateManager = StateManager as jest.MockedClass<typeof StateManager>;
      mockStateManager.prototype.isCachedAnalysisFresh = jest.fn().mockReturnValue(false);
      mockStateManager.prototype.isCachedAnalysisOlderThan = jest.fn().mockReturnValue(true);
      mockStateManager.prototype.hasBeenAlerted = jest.fn().mockReturnValue(false);

      const mockResearcher = AIResearcher as jest.MockedClass<typeof AIResearcher>;
      mockResearcher.prototype.analyzeMarket = jest.fn()
        .mockResolvedValueOnce(staleAnalysis)
        .mockResolvedValueOnce(failedAnalysis); // Refresh fails

      await main();

      // Should not cache the failed analysis
      const mockStateManager2 = StateManager as jest.MockedClass<typeof StateManager>;
      const cacheAnalysisCalls = (mockStateManager2.prototype.cacheAnalysis as jest.Mock).mock.calls;
      
      // Should have cached the initial analysis but not the failed refresh
      expect(cacheAnalysisCalls.length).toBe(1);
      expect(cacheAnalysisCalls[0][3]).toEqual(staleAnalysis);

      // Should not send alert since EV is 0 for failed analysis
      const mockNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
      expect(mockNotifier.prototype.sendMarketAlert).not.toHaveBeenCalled();
    });
  });
});
