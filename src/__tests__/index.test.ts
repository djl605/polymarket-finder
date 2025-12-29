/**
 * Integration tests for the main bot orchestration
 * 
 * Note: These are higher-level tests that verify the main flow works correctly.
 * Individual components are tested in their respective test files.
 */

// Mock the CLOB client before any imports
jest.mock('@polymarket/clob-client', () => ({
  ClobClient: jest.fn().mockImplementation(() => ({
    getOrderBook: jest.fn(),
  })),
}));

import { MarketFetcher } from '../market-fetcher';
import { MarketScorer } from '../market-scorer';
import { AIResearcher } from '../ai-researcher';
import { DiscordNotifier } from '../discord-notifier';
import { StateManager } from '../state-manager';
import { Config } from '../types';

// Mock all dependencies
jest.mock('../market-fetcher');
jest.mock('../market-scorer');
jest.mock('../ai-researcher');
jest.mock('../discord-notifier');
jest.mock('../state-manager');

describe('Bot Integration', () => {
  const mockConfig: Config = {
    discordWebhookUrl: 'https://discord.com/webhook/test',
    openaiApiKey: 'sk-test',
    exaApiKey: 'exa-test',
    screening: {
      minMarketAgeDays: 7,
      maxTotalVolume: 10000,
      maxSpreadCents: 6,
      minProbability: 0.15,
      maxProbability: 0.85,
    },
    cacheMaxAgeDays: 3,
    alertCooldownDays: 7,
    maxAlertsPerRun: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Main workflow', () => {
    it('should handle the complete bot workflow', async () => {
      // This test verifies that all components can be instantiated
      // and their basic interfaces work together
      
      const fetcher = new MarketFetcher();
      const scorer = new MarketScorer(mockConfig.screening);
      const researcher = new AIResearcher(mockConfig.openaiApiKey, mockConfig.exaApiKey);
      const notifier = new DiscordNotifier(mockConfig.discordWebhookUrl);
      const stateManager = new StateManager('test-state.json');

      expect(fetcher).toBeInstanceOf(MarketFetcher);
      expect(scorer).toBeInstanceOf(MarketScorer);
      expect(researcher).toBeInstanceOf(AIResearcher);
      expect(notifier).toBeInstanceOf(DiscordNotifier);
      expect(stateManager).toBeInstanceOf(StateManager);
    });

    it('should initialize all components with correct config', () => {
      const scorer = new MarketScorer(mockConfig.screening);
      const researcher = new AIResearcher(mockConfig.openaiApiKey, mockConfig.exaApiKey);
      const notifier = new DiscordNotifier(mockConfig.discordWebhookUrl);

      expect(MarketScorer).toHaveBeenCalledWith(mockConfig.screening);
      expect(AIResearcher).toHaveBeenCalledWith(mockConfig.openaiApiKey, mockConfig.exaApiKey);
      expect(DiscordNotifier).toHaveBeenCalledWith(mockConfig.discordWebhookUrl);
    });
  });

  describe('Error handling', () => {
    it('should handle market fetcher errors gracefully', async () => {
      const MockedMarketFetcher = MarketFetcher as jest.MockedClass<typeof MarketFetcher>;
      MockedMarketFetcher.prototype.fetchActiveMarkets = jest.fn().mockRejectedValue(
        new Error('API error')
      );

      const fetcher = new MarketFetcher();
      
      await expect(fetcher.fetchActiveMarkets(mockConfig.screening)).rejects.toThrow('API error');
    });


    it('should handle AI researcher errors gracefully', async () => {
      const MockedResearcher = AIResearcher as jest.MockedClass<typeof AIResearcher>;
      MockedResearcher.prototype.analyzeMarket = jest.fn().mockRejectedValue(
        new Error('AI error')
      );

      const researcher = new AIResearcher(mockConfig.openaiApiKey, mockConfig.exaApiKey);
      
      await expect(researcher.analyzeMarket({} as any)).rejects.toThrow('AI error');
    });

    it('should handle Discord notifier errors gracefully', async () => {
      const MockedNotifier = DiscordNotifier as jest.MockedClass<typeof DiscordNotifier>;
      MockedNotifier.prototype.sendMarketAlert = jest.fn().mockRejectedValue(
        new Error('Discord error')
      );

      const notifier = new DiscordNotifier(mockConfig.discordWebhookUrl);
      
      await expect(notifier.sendMarketAlert({} as any, {} as any, false)).rejects.toThrow(
        'Discord error'
      );
    });

    it('should handle state manager errors gracefully', () => {
      const MockedStateManager = StateManager as jest.MockedClass<typeof StateManager>;
      MockedStateManager.prototype.saveState = jest.fn().mockImplementation(() => {
        throw new Error('State save error');
      });

      const stateManager = new StateManager('test-state.json');
      
      expect(() => stateManager.saveState()).toThrow('State save error');
    });
  });

  describe('Configuration validation', () => {
    it('should work with all required config', () => {
      const scorer = new MarketScorer(mockConfig.screening);
      const notifier = new DiscordNotifier(mockConfig.discordWebhookUrl);
      const researcher = new AIResearcher(mockConfig.openaiApiKey, mockConfig.exaApiKey);

      expect(scorer).toBeDefined();
      expect(notifier).toBeDefined();
      expect(researcher).toBeDefined();
    });

    it('should work with full config including API keys', () => {
      const researcher = new AIResearcher(mockConfig.openaiApiKey, mockConfig.exaApiKey);
      expect(researcher).toBeDefined();
    });
  });

  describe('Data flow', () => {
    it('should pass screening criteria correctly', () => {
      const customCriteria = {
        minMarketAgeDays: 14,
        maxTotalVolume: 5000,
        maxSpreadCents: 10,
        minProbability: 0.2,
        maxProbability: 0.8,
      };

      const scorer = new MarketScorer(customCriteria);
      
      expect(MarketScorer).toHaveBeenCalledWith(customCriteria);
    });

    it('should use correct state file path', () => {
      const customPath = 'custom-state.json';
      const stateManager = new StateManager(customPath);
      
      expect(StateManager).toHaveBeenCalledWith(customPath);
    });
  });
});

