import { Config } from './types';

/**
 * Load configuration from environment variables
 */
export function loadConfig(): Config {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const openaiModel = process.env.OPENAI_MODEL;

  if (!discordWebhookUrl) {
    throw new Error('DISCORD_WEBHOOK_URL environment variable is required');
  }

  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  if (!openaiModel) {
    throw new Error('OPENAI_MODEL environment variable is required');
  }

  return {
    discordWebhookUrl,
    openaiApiKey,
    screening: {
      minMarketAgeDays: parseFloat(process.env.MIN_MARKET_AGE_DAYS || '7'),
      maxTotalVolume: parseFloat(process.env.MAX_MARKET_VOLUME_DOLLARS || '10000'),
      maxSpreadCents: parseFloat(process.env.MAX_SPREAD_CENTS || '6'),
      minProbability: parseFloat(process.env.MIN_MARKET_PROBABILITY || '0.15'),
      maxProbability: parseFloat(process.env.MAX_MARKET_PROBABILITY || '0.85'),
    },
    cacheMinAgeDays: parseInt(process.env.CACHE_MIN_AGE_DAYS || '4', 10),
    cacheMaxAgeDays: parseInt(process.env.CACHE_MAX_AGE_DAYS || '10', 10),
    alertCooldownDays: parseInt(process.env.ALERT_COOLDOWN_DAYS || '7', 10),
    maxAlertsPerRun: parseInt(process.env.MAX_ALERTS_PER_RUN || '5', 10),
    maxConcurrentAnalyses: Math.max(1, parseInt(process.env.MAX_CONCURRENT_ANALYSES || '10', 10)),
    openaiModel,
    verboseLogs: process.env.VERBOSE_LOGS === 'true',
    githubRepo: process.env.GITHUB_REPOSITORY, // Available in GitHub Actions
  };
}
