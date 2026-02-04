import { AIResearcher } from '../ai-researcher';
import { EnrichedMarket, ScreenedMarket } from '../types';
import OpenAI from 'openai';
import Exa from 'exa-js';

jest.mock('openai');
const MockedOpenAI = OpenAI as jest.MockedClass<typeof OpenAI>;

jest.mock('exa-js');
const MockedExa = Exa as jest.MockedClass<typeof Exa>;

// Helper to create mock OpenAI client
const createMockOpenAIClient = (mockCreate: jest.Mock) => {
  return {
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  } as unknown as OpenAI;
};

describe('AIResearcher', () => {
  const mockOpenAIKey = 'sk-test-key';
  const mockExaKey = 'exa-test-key';

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

  const mockExaResults = (results: any[] = []) => {
    MockedExa.mockImplementation(() => ({
      searchAndContents: jest.fn().mockResolvedValue({ results }),
    } as any));
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console logs during tests
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    
    // Default mock for Exa SDK
    mockExaResults([]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('analyzeMarket', () => {
    it('should perform full analysis with all API keys', async () => {
      const market = createMockScreenedMarket();

      // Mock Exa SDK searchAndContents
      const mockSearchAndContents = jest.fn().mockResolvedValue({
        results: [
          {
            title: 'Weather forecast',
            url: 'https://example.com',
            text: 'Rain expected tomorrow',
          },
        ],
      });
      MockedExa.mockImplementation(() => ({
        searchAndContents: mockSearchAndContents,
      } as any));

      // Mock OpenAI SDK
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: `Analysis of the market...
EXPECTED_VALUE: 2.0
SUMMARY: Market appears fairly priced based on weather forecasts.
CONFIDENCE: high`,
            },
          },
        ],
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const result = await researcher.analyzeMarket(market);

      expect(result.marketId).toBe('cond123');
      expect(result.question).toBe('Will it rain tomorrow?');
      expect(result.expectedValue).toBe(2.0);
      expect(result.confidence).toBe('high');
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockSearchAndContents).toHaveBeenCalledTimes(1);
    });

    it('should return skip analysis on API failures instead of throwing', async () => {
      // Mock OpenAI SDK to reject
      const mockCreate = jest.fn().mockRejectedValue(new Error('API error'));
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));
      
      // Mock Exa SDK
      MockedExa.mockImplementation(() => ({
        searchAndContents: jest.fn().mockResolvedValue({ results: [] }),
      } as any));

      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
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
      // Mock Exa SDK
      MockedExa.mockImplementation(() => ({
        searchAndContents: jest.fn().mockResolvedValue({ results: [] }),
      } as any));

      // Mock OpenAI SDK
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: `Analysis...
EXPECTED_VALUE: 12.5
SUMMARY: Strong evidence of mispricing.
CONFIDENCE: high`,
            },
          },
        ],
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.expectedValue).toBe(12.5);
      expect(result.confidence).toBe('high');
    });

    it('should default to 0 EV and medium confidence when missing', async () => {
      mockExaResults([]);

      // Mock OpenAI SDK
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: 'Some analysis without clear EV or confidence',
            },
          },
        ],
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.expectedValue).toBe(0); // Default when no EV found
      expect(result.confidence).toBe('medium');
    });

    it('should convert NaN expected value to 0', async () => {
      mockExaResults([]);

      // Mock OpenAI SDK
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: `Analysis...
EXPECTED_VALUE: invalid_text
SUMMARY: Some analysis.
CONFIDENCE: high`,
            },
          },
        ],
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      // parseFloat('invalid_text') returns NaN, which should be converted to 0
      expect(result.expectedValue).toBe(0);
    });

    it('should parse old cached responses with RECOMMENDATION field (backward compatibility)', async () => {
      mockExaResults([]);

      // Mock OpenAI SDK
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: `Analysis...
EXPECTED_VALUE: 8.5
SUMMARY: Market shows some potential.
RECOMMENDATION: research
CONFIDENCE: medium`,
            },
          },
        ],
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      // Should extract EV and confidence, ignoring the old RECOMMENDATION field
      expect(result.expectedValue).toBe(8.5);
      expect(result.confidence).toBe('medium');
      expect(result.summary).toContain('Market shows some potential');
    });
  });

  describe('Exa integration', () => {
    it('should format Exa results correctly', async () => {
      // Mock Exa SDK with results
      mockExaResults([
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
      ]);

      // Mock OpenAI SDK
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: `Analysis...
EXPECTED_VALUE: 5.0
SUMMARY: Test summary.
CONFIDENCE: medium`,
            },
          },
        ],
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.fullAnalysis).toBeTruthy();
      // Verify that reasoning model was called with formatted Exa results
      expect(mockCreate).toHaveBeenCalledTimes(1);
      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs.messages[0].content).toContain('Article 1');
      expect(callArgs.messages[0].content).toContain('Article 2');
    });

    it('should handle empty Exa results', async () => {
      // Mock Exa SDK with empty results
      mockExaResults([]);

      // Mock OpenAI SDK
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: `Analysis...
EXPECTED_VALUE: 0
SUMMARY: Test.
CONFIDENCE: low`,
            },
          },
        ],
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result).toBeTruthy();
      expect(mockCreate).toHaveBeenCalledTimes(1);
      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs.messages[0].content).toContain('No relevant sources found');
    });

    it('should handle Exa API errors', async () => {
      const logBuffer: string[] = [];

      // Mock Exa SDK to throw an error
      MockedExa.mockImplementation(() => ({
        searchAndContents: jest.fn().mockRejectedValue(new Error('Exa API error')),
      } as any));

      // Mock OpenAI SDK
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: `Analysis...
EXPECTED_VALUE: 0
SUMMARY: Test.
CONFIDENCE: medium`,
            },
          },
        ],
      });
      MockedOpenAI.mockImplementation(() => createMockOpenAIClient(mockCreate));

      const researcher = new AIResearcher(mockOpenAIKey, mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market, logBuffer);

      expect(result).toBeTruthy();
      // Error should be in the log buffer
      expect(logBuffer.some(log => log.includes('Exa API'))).toBe(true);
    });
  });
});

