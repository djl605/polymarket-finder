import { AIResearcher } from '../ai-researcher';
import { ScreenedMarket } from '../types';
import OpenAI from 'openai';

jest.mock('openai');
const MockedOpenAI = OpenAI as jest.MockedClass<typeof OpenAI>;

// Helper to create mock OpenAI client with Responses API
const createMockOpenAIClient = (mockCreate: jest.Mock) => {
  return {
    responses: {
      create: mockCreate,
    },
  } as unknown as OpenAI;
};

// Helper to build a mock response with optional SOURCES block
const buildMockResponse = (
  ev: string,
  summary: string,
  confidence: string,
  sources?: Array<{ title: string; url: string; author?: string; date?: string; summary: string }>
): string => {
  let response = `Analysis...\nEXPECTED_VALUE: ${ev}\nSUMMARY: ${summary}\nCONFIDENCE: ${confidence}`;
  if (sources && sources.length > 0) {
    response += '\n\nSOURCES:';
    for (const s of sources) {
      response += `\n---\nTitle: ${s.title}\nURL: ${s.url}\nAuthor: ${s.author || 'Unknown'}\nDate: ${s.date || 'Unknown'}\nSummary: ${s.summary}\n---`;
    }
  }
  return response;
};

describe('AIResearcher', () => {
  const mockOpenAIKey = 'sk-test-key';

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
    it('should perform full analysis with web search', async () => {
      const market = createMockScreenedMarket();

      const mockCreate = jest.fn().mockResolvedValue({
        output_text: buildMockResponse('2.0', 'Market appears fairly priced based on weather forecasts.', 'high', [
          { title: 'Weather forecast', url: 'https://example.com', summary: 'Rain expected tomorrow' },
        ]),
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey);
      const result = await researcher.analyzeMarket(market);

      expect(result.marketId).toBe('cond123');
      expect(result.question).toBe('Will it rain tomorrow?');
      expect(result.expectedValue).toBe(2.0);
      expect(result.confidence).toBe('high');
      expect(mockCreate).toHaveBeenCalledTimes(1);

      // Verify the Responses API was called with web_search tool
      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs.model).toBe('gpt-4.1');
      expect(callArgs.tools).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'web_search' }),
        ])
      );
    });

    it('should return skip analysis on API failures instead of throwing', async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error('API error'));
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      // Should not throw, instead returns a skip analysis
      expect(result.expectedValue).toBe(0);
      expect(result.confidence).toBe('low');
      expect(result.marketId).toBe('cond123');
      expect(result.summary).toContain('Analysis failed');
    });
  });

  describe('parseAIResponse', () => {
    it('should parse expected value and confidence from response', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        output_text: buildMockResponse('12.5', 'Strong evidence of mispricing.', 'high'),
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.expectedValue).toBe(12.5);
      expect(result.confidence).toBe('high');
    });

    it('should default to 0 EV and medium confidence when missing', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        output_text: 'Some analysis without clear EV or confidence',
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.expectedValue).toBe(0);
      expect(result.confidence).toBe('medium');
    });

    it('should convert NaN expected value to 0', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        output_text: buildMockResponse('invalid_text', 'Some analysis.', 'high'),
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.expectedValue).toBe(0);
    });

    it('should parse old cached responses with RECOMMENDATION field (backward compatibility)', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        output_text: `Analysis...
EXPECTED_VALUE: 8.5
SUMMARY: Market shows some potential.
RECOMMENDATION: research
CONFIDENCE: medium`,
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.expectedValue).toBe(8.5);
      expect(result.confidence).toBe('medium');
      expect(result.summary).toContain('Market shows some potential');
    });
  });

  describe('source parsing', () => {
    it('should parse sources from SOURCES block', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        output_text: buildMockResponse('5.0', 'Test summary.', 'medium', [
          {
            title: 'Article 1',
            url: 'https://example.com/1',
            author: 'John Doe',
            date: '2026-01-15',
            summary: 'Content about the market',
          },
          {
            title: 'Article 2',
            url: 'https://example.com/2',
            summary: 'More content',
          },
        ]),
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey);
      const market = createMockScreenedMarket();
      const logBuffer: string[] = [];

      await researcher.analyzeMarket(market, logBuffer);

      // Should log that 2 sources were found
      expect(logBuffer.some(log => log.includes('2 sources'))).toBe(true);
    });

    it('should strip SOURCES block from fullAnalysis', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        output_text: buildMockResponse('5.0', 'Test summary.', 'medium', [
          { title: 'Source', url: 'https://example.com', summary: 'Info' },
        ]),
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      // fullAnalysis should not contain the SOURCES block
      expect(result.fullAnalysis).not.toContain('SOURCES:');
      expect(result.fullAnalysis).toContain('Analysis...');
    });

    it('should handle response with no SOURCES block', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        output_text: buildMockResponse('0', 'Test.', 'low'),
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey);
      const market = createMockScreenedMarket();
      const logBuffer: string[] = [];

      const result = await researcher.analyzeMarket(market, logBuffer);

      expect(result).toBeTruthy();
      // Should log 0 sources
      expect(logBuffer.some(log => log.includes('0 sources'))).toBe(true);
    });

    it('should skip malformed source entries without URLs', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        output_text: `Analysis...
EXPECTED_VALUE: 3.0
SUMMARY: Test.
CONFIDENCE: low

SOURCES:
---
Title: Good Source
URL: https://example.com/good
Author: Author
Date: 2026-01-01
Summary: Good content
---
---
Title: Bad Source Without URL
Author: Someone
Summary: This should be skipped
---`,
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey);
      const market = createMockScreenedMarket();
      const logBuffer: string[] = [];

      await researcher.analyzeMarket(market, logBuffer);

      // Should only find 1 valid source (the one with URL)
      expect(logBuffer.some(log => log.includes('1 sources'))).toBe(true);
    });
  });
});
