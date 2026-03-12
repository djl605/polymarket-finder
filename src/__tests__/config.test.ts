import { loadConfig } from '../config';

describe('Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('loadConfig', () => {
    it('should throw error if DISCORD_WEBHOOK_URL is missing', () => {
      delete process.env.DISCORD_WEBHOOK_URL;
      process.env.OPENAI_API_KEY = 'sk-test';
      expect(() => loadConfig()).toThrow('DISCORD_WEBHOOK_URL environment variable is required');
    });

    it('should throw error if OPENAI_API_KEY is missing', () => {
      process.env.DISCORD_WEBHOOK_URL = 'https://discord.com/webhook/test';
      delete process.env.OPENAI_API_KEY;
      expect(() => loadConfig()).toThrow('OPENAI_API_KEY environment variable is required');
    });

    it('should throw error if OPENAI_MODEL is missing', () => {
      process.env.DISCORD_WEBHOOK_URL = 'https://discord.com/webhook/test';
      process.env.OPENAI_API_KEY = 'sk-test';
      delete process.env.OPENAI_MODEL;
      expect(() => loadConfig()).toThrow('OPENAI_MODEL environment variable is required');
    });

    it('should load config with default values', () => {
      process.env.DISCORD_WEBHOOK_URL = 'https://discord.com/webhook/test';
      process.env.OPENAI_API_KEY = 'sk-test';
      process.env.OPENAI_MODEL = 'gpt-4.1-mini';

      const config = loadConfig();

      expect(config.discordWebhookUrl).toBe('https://discord.com/webhook/test');
      expect(config.openaiApiKey).toBe('sk-test');
      expect(config.screening.minMarketAgeDays).toBe(7);
      expect(config.screening.maxTotalVolume).toBe(10000);
      expect(config.screening.maxSpreadCents).toBe(6);
      expect(config.screening.minProbability).toBe(0.15);
      expect(config.screening.maxProbability).toBe(0.85);
      expect(config.cacheMinAgeDays).toBe(4);
      expect(config.cacheMaxAgeDays).toBe(10);
      expect(config.alertCooldownDays).toBe(7);
      expect(config.maxAlertsPerRun).toBe(5);
      expect(config.maxConcurrentAnalyses).toBe(10);
      expect(config.verboseLogs).toBe(false);
    });

    it('should load config with custom values from environment', () => {
      process.env.DISCORD_WEBHOOK_URL = 'https://discord.com/webhook/custom';
      process.env.OPENAI_API_KEY = 'sk-test-key';
      process.env.OPENAI_MODEL = 'gpt-4.1';
      process.env.MIN_MARKET_AGE_DAYS = '14';
      process.env.MAX_MARKET_VOLUME_DOLLARS = '5000';
      process.env.MAX_SPREAD_CENTS = '10';
      process.env.MIN_MARKET_PROBABILITY = '0.2';
      process.env.MAX_MARKET_PROBABILITY = '0.8';
      process.env.CACHE_MIN_AGE_DAYS = '2';
      process.env.CACHE_MAX_AGE_DAYS = '14';
      process.env.ALERT_COOLDOWN_DAYS = '14';
      process.env.MAX_ALERTS_PER_RUN = '10';
      process.env.MAX_CONCURRENT_ANALYSES = '20';
      process.env.VERBOSE_LOGS = 'true';

      const config = loadConfig();

      expect(config.discordWebhookUrl).toBe('https://discord.com/webhook/custom');
      expect(config.openaiApiKey).toBe('sk-test-key');
      expect(config.screening.minMarketAgeDays).toBe(14);
      expect(config.screening.maxTotalVolume).toBe(5000);
      expect(config.screening.maxSpreadCents).toBe(10);
      expect(config.screening.minProbability).toBe(0.2);
      expect(config.screening.maxProbability).toBe(0.8);
      expect(config.cacheMinAgeDays).toBe(2);
      expect(config.cacheMaxAgeDays).toBe(14);
      expect(config.alertCooldownDays).toBe(14);
      expect(config.maxAlertsPerRun).toBe(10);
      expect(config.maxConcurrentAnalyses).toBe(20);
      expect(config.openaiModel).toBe('gpt-4.1');
      expect(config.verboseLogs).toBe(true);
    });

    it('should parse numeric values correctly', () => {
      process.env.DISCORD_WEBHOOK_URL = 'https://discord.com/webhook/test';
      process.env.OPENAI_API_KEY = 'sk-test';
      process.env.OPENAI_MODEL = 'gpt-4.1-mini';
      process.env.MIN_MARKET_AGE_DAYS = '3.5';
      process.env.MAX_MARKET_VOLUME_DOLLARS = '15000.75';
      process.env.MAX_SPREAD_CENTS = '8.2';

      const config = loadConfig();

      expect(config.screening.minMarketAgeDays).toBe(3.5);
      expect(config.screening.maxTotalVolume).toBe(15000.75);
      expect(config.screening.maxSpreadCents).toBe(8.2);
    });

    it('should enforce minimum value of 1 for maxConcurrentAnalyses', () => {
      process.env.DISCORD_WEBHOOK_URL = 'https://discord.com/webhook/test';
      process.env.OPENAI_API_KEY = 'sk-test';
      process.env.OPENAI_MODEL = 'gpt-4.1-mini';
      process.env.MAX_CONCURRENT_ANALYSES = '0';

      const config = loadConfig();

      expect(config.maxConcurrentAnalyses).toBe(1);
    });

    it('should handle negative maxConcurrentAnalyses', () => {
      process.env.DISCORD_WEBHOOK_URL = 'https://discord.com/webhook/test';
      process.env.OPENAI_API_KEY = 'sk-test';
      process.env.OPENAI_MODEL = 'gpt-4.1-mini';
      process.env.MAX_CONCURRENT_ANALYSES = '-5';

      const config = loadConfig();

      expect(config.maxConcurrentAnalyses).toBe(1);
    });
  });
});
