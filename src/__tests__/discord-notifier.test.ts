import { DiscordNotifier } from '../discord-notifier';
import { AIAnalysis, EnrichedMarket, ScreenedMarket } from '../types';
import fetch from 'node-fetch';

jest.mock('node-fetch');
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('DiscordNotifier', () => {
  const mockWebhookUrl = 'https://discord.com/api/webhooks/test';
  let notifier: DiscordNotifier;

  const createMockScreenedMarket = (): ScreenedMarket => ({
    market: {
      market: {},
      tokenId: 'token123',
      conditionId: 'cond123',
      slug: 'will-it-rain-tomorrow',
      question: 'Will it rain tomorrow?',
      description: 'This market resolves YES if it rains in NYC tomorrow.',
      outcomes: ['Yes', 'No'],
      active: true,
      closed: false,
      createdAt: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      volume: 5000,
      volume24hr: 100,
      outcomePrices: ['0.6', '0.4'],
      ageInDays: 30,
      mainProbability: 0.6,
      bestBid: 0.58,
      bestAsk: 0.61,
      spread: 3,
    },
    reason: 'Age: 30d | Total Vol: $5000 | Price: 60.0% | Spread: 3¢',
    score: 0.5,
  });

  const createMockAnalysis = (overrides: Partial<AIAnalysis> = {}): AIAnalysis => ({
    marketId: 'cond123',
    question: 'Will it rain tomorrow?',
    fullAnalysis: 'Detailed analysis...',
    summary: 'Market appears fairly priced.',
    confidence: 'medium',
    suggestedAction: 'research',
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    notifier = new DiscordNotifier(mockWebhookUrl);
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('sendMarketAlert', () => {
    it('should send market alert successfully', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
      } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis();

      await notifier.sendMarketAlert(market, analysis, false);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        mockWebhookUrl,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1]?.body as string);
      
      expect(body.embeds).toHaveLength(1);
      expect(body.embeds[0].title).toContain('Will it rain tomorrow?');
      expect(body.embeds[0].description).toContain('This market resolves YES');
    });

    it('should include correct metrics in alert', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis();

      await notifier.sendMarketAlert(market, analysis, false);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      const metricsField = body.embeds[0].fields.find((f: any) => f.name === '📊 Market Metrics');
      
      expect(metricsField.value).toContain('30 days');
      expect(metricsField.value).toContain('$5000');
      expect(metricsField.value).toContain('60.0¢');
      expect(metricsField.value).toContain('3.0¢');
    });

    it('should include AI analysis summary', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis({
        summary: 'Strong evidence of mispricing detected.',
      });

      await notifier.sendMarketAlert(market, analysis, false);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      const analysisField = body.embeds[0].fields.find((f: any) => f.name === '🤖 AI Analysis');
      
      expect(analysisField.value).toBe('Strong evidence of mispricing detected.');
    });

    it('should use correct color for high confidence', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis({ confidence: 'high' });

      await notifier.sendMarketAlert(market, analysis, false);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(body.embeds[0].color).toBe(0x00FF00); // Green
    });

    it('should use correct color for medium confidence', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis({ confidence: 'medium' });

      await notifier.sendMarketAlert(market, analysis, false);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(body.embeds[0].color).toBe(0xFFA500); // Orange
    });

    it('should use correct color for low confidence', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis({ confidence: 'low' });

      await notifier.sendMarketAlert(market, analysis, false);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(body.embeds[0].color).toBe(0x808080); // Gray
    });

    it('should format strong_signal action correctly', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis({ suggestedAction: 'strong_signal' });

      await notifier.sendMarketAlert(market, analysis, false);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      const recommendationField = body.embeds[0].fields.find((f: any) => f.name === '📈 Recommendation');
      
      expect(recommendationField.value).toContain('🚨');
      expect(recommendationField.value).toContain('STRONG SIGNAL');
    });

    it('should format research action correctly', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis({ suggestedAction: 'research' });

      await notifier.sendMarketAlert(market, analysis, false);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      const recommendationField = body.embeds[0].fields.find((f: any) => f.name === '📈 Recommendation');
      
      expect(recommendationField.value).toContain('🔍');
      expect(recommendationField.value).toContain('Worth researching');
    });

    it('should include Polymarket links', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis();

      await notifier.sendMarketAlert(market, analysis, false);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      const linksField = body.embeds[0].fields.find((f: any) => f.name === '🔗 Links');
      
      expect(linksField.value).toContain('https://polymarket.com/event/will-it-rain-tomorrow');
      expect(linksField.value).toContain('https://clob.polymarket.com/book?market=token123');
    });

    it('should show re-alert prefix when isRealert is true', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis();

      await notifier.sendMarketAlert(market, analysis, true);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(body.embeds[0].title).toContain('🔄 Re-Alert');
    });

    it('should show normal prefix when isRealert is false', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis();

      await notifier.sendMarketAlert(market, analysis, false);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(body.embeds[0].title).toContain('🎯 Potential Opportunity');
    });

    it('should handle Discord API errors', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
      } as any);

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis();

      await expect(notifier.sendMarketAlert(market, analysis, false)).rejects.toThrow(
        'Discord webhook failed: 500'
      );
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const market = createMockScreenedMarket();
      const analysis = createMockAnalysis();

      await expect(notifier.sendMarketAlert(market, analysis, false)).rejects.toThrow('Network error');
    });

    it('should truncate long descriptions', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      const market = createMockScreenedMarket();
      market.market.description = 'a'.repeat(1000);
      const analysis = createMockAnalysis();

      await notifier.sendMarketAlert(market, analysis, false);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(body.embeds[0].description.length).toBeLessThanOrEqual(500);
    });
  });

  describe('sendSummary', () => {
    it('should send summary notification successfully', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      await notifier.sendSummary(1000, 50, 5);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        mockWebhookUrl,
        expect.objectContaining({
          method: 'POST',
        })
      );

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(body.embeds[0].title).toBe('📊 Scan Complete');
      expect(body.embeds[0].fields).toHaveLength(3);
    });

    it('should include correct statistics', async () => {
      mockFetch.mockResolvedValue({ ok: true } as any);

      await notifier.sendSummary(1000, 50, 5);

      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      const fields = body.embeds[0].fields;

      expect(fields[0].value).toBe('1000');
      expect(fields[1].value).toBe('50');
      expect(fields[2].value).toBe('5');
    });

    it('should handle errors gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      // Should not throw
      await notifier.sendSummary(1000, 50, 5);

      expect(console.error).toHaveBeenCalled();
    });
  });
});

