import { AIResearcher } from '../ai-researcher';
import { EnrichedMarket, ScreenedMarket } from '../types';
import fetch from 'node-fetch';

jest.mock('node-fetch');
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('AIResearcher', () => {
  const mockOpenAIKey = 'sk-test-key';
  const mockExaKey = 'exa-test-key';

  const createMockScreenedMarket = (): ScreenedMarket => ({
    market: {
      market: {},
      tokenId: 'token123',
      conditionId: 'cond123',
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

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console logs during tests
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('analyzeMarket', () => {
    it('should perform full analysis with all API keys', async () => {
      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      // Mock search query generation
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'NYC weather forecast tomorrow' } }],
        }),
      } as any);

      // Mock Exa search
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              title: 'Weather forecast',
              url: 'https://example.com',
              text: 'Rain expected tomorrow',
            },
          ],
        }),
      } as any);

      // Mock o1-mini reasoning
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: `Analysis of the market...
SUMMARY: Market appears fairly priced based on weather forecasts.
RECOMMENDATION: skip
CONFIDENCE: high`,
              },
            },
          ],
        }),
      } as any);

      const result = await researcher.analyzeMarket(market);

      expect(result.marketId).toBe('cond123');
      expect(result.question).toBe('Will it rain tomorrow?');
      expect(result.suggestedAction).toBe('skip');
      expect(result.confidence).toBe('high');
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('should throw error on API failures', async () => {
      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      mockFetch.mockRejectedValue(new Error('API error'));

      await expect(researcher.analyzeMarket(market)).rejects.toThrow('API error');
    });
  });

  describe('parseAIResponse', () => {
    it('should parse strong_signal recommendation', async () => {
      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [{ message: { content: 'test query' } }],
          }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ results: [] }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [
              {
                message: {
                  content: `Analysis...
SUMMARY: Strong evidence of mispricing.
RECOMMENDATION: strong_signal
CONFIDENCE: high`,
                },
              },
            ],
          }),
        } as any);

      const result = await researcher.analyzeMarket(market);

      expect(result.suggestedAction).toBe('strong_signal');
      expect(result.confidence).toBe('high');
    });

    it('should parse skip recommendation', async () => {
      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [{ message: { content: 'test query' } }],
          }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ results: [] }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [
              {
                message: {
                  content: `Analysis...
SUMMARY: Market appears efficient.
RECOMMENDATION: skip
CONFIDENCE: low`,
                },
              },
            ],
          }),
        } as any);

      const result = await researcher.analyzeMarket(market);

      expect(result.suggestedAction).toBe('skip');
      expect(result.confidence).toBe('low');
    });

    it('should default to research and medium confidence', async () => {
      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [{ message: { content: 'test query' } }],
          }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ results: [] }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [
              {
                message: {
                  content: 'Some analysis without clear recommendation',
                },
              },
            ],
          }),
        } as any);

      const result = await researcher.analyzeMarket(market);

      expect(result.suggestedAction).toBe('research');
      expect(result.confidence).toBe('medium');
    });
  });

  describe('Exa integration', () => {
    it('should format Exa results correctly', async () => {
      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [{ message: { content: 'test query' } }],
          }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            results: [
              {
                title: 'Article 1',
                url: 'https://example.com/1',
                publishedDate: '2024-01-15',
                author: 'John Doe',
                text: 'Content about the market',
              },
              {
                title: 'Article 2',
                url: 'https://example.com/2',
                text: 'More content',
              },
            ],
          }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [
              {
                message: {
                  content: `Analysis...
SUMMARY: Test summary.
RECOMMENDATION: research
CONFIDENCE: medium`,
                },
              },
            ],
          }),
        } as any);

      const result = await researcher.analyzeMarket(market);

      expect(result.fullAnalysis).toBeTruthy();
      // Verify that o1-mini was called with formatted Exa results
      const o1MiniCall = mockFetch.mock.calls[2];
      const requestBody = JSON.parse(o1MiniCall[1]?.body as string);
      expect(requestBody.messages[0].content).toContain('Article 1');
      expect(requestBody.messages[0].content).toContain('Article 2');
    });

    it('should handle empty Exa results', async () => {
      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [{ message: { content: 'test query' } }],
          }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ results: [] }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [
              {
                message: {
                  content: `Analysis...
SUMMARY: Test.
RECOMMENDATION: research
CONFIDENCE: low`,
                },
              },
            ],
          }),
        } as any);

      const result = await researcher.analyzeMarket(market);

      expect(result).toBeTruthy();
      const o1MiniCall = mockFetch.mock.calls[2];
      const requestBody = JSON.parse(o1MiniCall[1]?.body as string);
      expect(requestBody.messages[0].content).toContain('No relevant sources found');
    });

    it('should handle Exa API errors', async () => {
      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [{ message: { content: 'test query' } }],
          }),
        } as any)
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            choices: [
              {
                message: {
                  content: `Analysis...
SUMMARY: Test.
RECOMMENDATION: research
CONFIDENCE: medium`,
                },
              },
            ],
          }),
        } as any);

      const result = await researcher.analyzeMarket(market);

      expect(result).toBeTruthy();
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Exa API error'));
    });
  });
});

