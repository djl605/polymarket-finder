import { AIResearcher } from '../ai-researcher';
import { EnrichedMarket, ScreenedMarket } from '../types';
import Exa from 'exa-js';

jest.mock('exa-js');
const MockedExa = Exa as jest.MockedClass<typeof Exa>;

describe('AIResearcher', () => {
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

  const mockExaResearch = (parsed = {
    analysis: 'Test research analysis',
    links: [{ url: 'https://example.com', description: 'Test source' }],
    expectedValue: 0,
    summary: 'Test summary',
    confidence: 'medium' as const
  }, includeCost = true) => {
    const mockResearchId = 'research_123';
    MockedExa.mockImplementation(() => ({
      research: {
        create: jest.fn().mockResolvedValue({ researchId: mockResearchId }),
        pollUntilFinished: jest.fn().mockResolvedValue({
          status: 'completed',
          output: {
            content: parsed.analysis,
            parsed,
          },
          ...(includeCost && {
            costDollars: {
              numPages: 5,
              numSearches: 3,
              reasoningTokens: 2500,
              total: 0.015,
            },
          }),
        }),
      },
    } as any));
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console logs during tests
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    
    // Default mock for Exa SDK
    mockExaResearch();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('analyzeMarket', () => {
    it('should perform full analysis using Exa Research API', async () => {
      const market = createMockScreenedMarket();

      // Mock Exa Research API with structured output
      const mockCreate = jest.fn().mockResolvedValue({ researchId: 'research_123' });
      const mockPollUntilFinished = jest.fn().mockResolvedValue({
        status: 'completed',
        output: {
          content: 'Analysis of the market...',
          parsed: {
            analysis: 'Analysis of the market...',
            links: [{ url: 'https://example.com/weather', description: 'Weather forecast data' }],
            expectedValue: 2.0,
            summary: 'Market appears fairly priced based on weather forecasts.',
            confidence: 'high',
          },
        },
        costDollars: {
          numPages: 5,
          numSearches: 3,
          reasoningTokens: 2500,
          total: 0.015,
        },
      });
      
      MockedExa.mockImplementation(() => ({
        research: {
          create: mockCreate,
          pollUntilFinished: mockPollUntilFinished,
        },
      } as any));

      const researcher = new AIResearcher(mockExaKey);
      const result = await researcher.analyzeMarket(market);

      expect(result.marketId).toBe('cond123');
      expect(result.question).toBe('Will it rain tomorrow?');
      expect(result.expectedValue).toBe(2.0);
      expect(result.confidence).toBe('high');
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockPollUntilFinished).toHaveBeenCalled();
      
      // Verify outputSchema was provided
      const createCall = mockCreate.mock.calls[0][0];
      expect(createCall.outputSchema).toBeDefined();
    });

    it('should return skip analysis on API failures instead of throwing', async () => {
      // Mock Exa Research API to fail
      MockedExa.mockImplementation(() => ({
        research: {
          create: jest.fn().mockRejectedValue(new Error('API error')),
          pollUntilFinished: jest.fn(),
        },
      } as any));

      const researcher = new AIResearcher(mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);
      
      // Should not throw, instead returns a skip analysis
      expect(result.expectedValue).toBe(0);
      expect(result.confidence).toBe('low');
      expect(result.marketId).toBe('cond123');
      expect(result.summary).toContain('Analysis failed');
    });
  });

  describe('structured output parsing', () => {
    it('should use structured output from Exa Research API', async () => {
      // Mock Exa Research API with structured output
      MockedExa.mockImplementation(() => ({
        research: {
          create: jest.fn().mockResolvedValue({ researchId: 'research_123' }),
          pollUntilFinished: jest.fn().mockResolvedValue({
            status: 'completed',
            output: {
              content: 'Analysis...',
              parsed: {
                analysis: 'Analysis...',
                links: [{ url: 'https://example.com/source', description: 'Test source' }],
                expectedValue: 12.5,
                summary: 'Strong evidence of mispricing.',
                confidence: 'high',
              },
            },
            costDollars: {
              numPages: 5,
              numSearches: 3,
              reasoningTokens: 2500,
              total: 0.015,
            },
          }),
        },
      } as any));

      const researcher = new AIResearcher(mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.expectedValue).toBe(12.5);
      expect(result.confidence).toBe('high');
      expect(result.summary).toBe('Strong evidence of mispricing.');
    });

    it('should handle structured output with minimal values', async () => {
      // Mock Exa Research API with minimal structured output
      MockedExa.mockImplementation(() => ({
        research: {
          create: jest.fn().mockResolvedValue({ researchId: 'research_123' }),
          pollUntilFinished: jest.fn().mockResolvedValue({
            status: 'completed',
            output: {
              content: 'Some analysis',
              parsed: {
                analysis: 'Some analysis',
                links: [],
                expectedValue: 0,
                summary: 'No clear mispricing detected',
                confidence: 'medium',
              },
            },
            costDollars: {
              numPages: 2,
              numSearches: 1,
              reasoningTokens: 1500,
              total: 0.008,
            },
          }),
        },
      } as any));

      const researcher = new AIResearcher(mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.expectedValue).toBe(0);
      expect(result.confidence).toBe('medium');
    });

    it('should handle numeric values from structured output', async () => {
      // Mock Exa Research API with numeric values
      MockedExa.mockImplementation(() => ({
        research: {
          create: jest.fn().mockResolvedValue({ researchId: 'research_123' }),
          pollUntilFinished: jest.fn().mockResolvedValue({
            status: 'completed',
            output: {
              content: 'Analysis...',
              parsed: {
                analysis: 'Analysis...',
                links: [{ url: 'https://example.com', description: 'Source' }],
                expectedValue: 15.75, // Decimal value
                summary: 'Some analysis.',
                confidence: 'high',
              },
            },
            costDollars: {
              numPages: 5,
              numSearches: 3,
              reasoningTokens: 2500,
              total: 0.015,
            },
          }),
        },
      } as any));

      const researcher = new AIResearcher(mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.expectedValue).toBe(15.75);
    });

    it('should handle all confidence levels correctly', async () => {
      // Test with low confidence
      MockedExa.mockImplementation(() => ({
        research: {
          create: jest.fn().mockResolvedValue({ researchId: 'research_123' }),
          pollUntilFinished: jest.fn().mockResolvedValue({
            status: 'completed',
            output: {
              content: 'Analysis...',
              parsed: {
                analysis: 'Analysis...',
                links: [{ url: 'https://example.com', description: 'Source' }],
                expectedValue: 8.5,
                summary: 'Market shows some potential.',
                confidence: 'low',
              },
            },
            costDollars: {
              numPages: 5,
              numSearches: 3,
              reasoningTokens: 2500,
              total: 0.015,
            },
          }),
        },
      } as any));

      const researcher = new AIResearcher(mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.expectedValue).toBe(8.5);
      expect(result.confidence).toBe('low');
      expect(result.summary).toBe('Market shows some potential.');
    });
  });

  describe('Exa Research API integration', () => {
    it('should use Exa Research API with outputSchema correctly', async () => {
      const mockCreate = jest.fn().mockResolvedValue({ researchId: 'research_123' });
      const mockPollUntilFinished = jest.fn().mockResolvedValue({
        status: 'completed',
        output: {
          content: 'Analysis...',
          parsed: {
            analysis: 'Analysis...',
            links: [{ url: 'https://example.com', description: 'Test source' }],
            expectedValue: 5.0,
            summary: 'Test summary.',
            confidence: 'medium',
          },
        },
        costDollars: {
          numPages: 5,
          numSearches: 3,
          reasoningTokens: 2500,
          total: 0.015,
        },
      });

      MockedExa.mockImplementation(() => ({
        research: {
          create: mockCreate,
          pollUntilFinished: mockPollUntilFinished,
        },
      } as any));

      const researcher = new AIResearcher(mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result.fullAnalysis).toBeTruthy();
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockPollUntilFinished).toHaveBeenCalled();
      
      // Verify research was called with instructions and outputSchema
      const createCall = mockCreate.mock.calls[0];
      expect(createCall[0].instructions).toContain('Will it rain tomorrow?');
      expect(createCall[0].outputSchema).toBeDefined();
      expect(createCall[0].outputSchema.properties).toHaveProperty('analysis');
      expect(createCall[0].outputSchema.properties).toHaveProperty('links');
      expect(createCall[0].outputSchema.properties).toHaveProperty('expectedValue');
      expect(createCall[0].outputSchema.properties).toHaveProperty('summary');
      expect(createCall[0].outputSchema.properties).toHaveProperty('confidence');
    });

    it('should handle research with minimal findings', async () => {
      MockedExa.mockImplementation(() => ({
        research: {
          create: jest.fn().mockResolvedValue({ researchId: 'research_123' }),
          pollUntilFinished: jest.fn().mockResolvedValue({
            status: 'completed',
            output: {
              content: 'No significant information found.',
              parsed: {
                analysis: 'No significant information found.',
                links: [],
                expectedValue: 0,
                summary: 'Limited information available.',
                confidence: 'low',
              },
            },
            costDollars: {
              numPages: 2,
              numSearches: 1,
              reasoningTokens: 1000,
              total: 0.005,
            },
          }),
        },
      } as any));

      const researcher = new AIResearcher(mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market);

      expect(result).toBeTruthy();
      expect(result.expectedValue).toBe(0);
      expect(result.confidence).toBe('low');
      expect(result.summary).toBe('Limited information available.');
    });

    it('should handle Exa Research API errors', async () => {
      const logBuffer: string[] = [];

      // Mock Exa Research API to throw an error
      MockedExa.mockImplementation(() => ({
        research: {
          create: jest.fn().mockRejectedValue(new Error('Exa Research API error')),
          pollUntilFinished: jest.fn(),
        },
      } as any));

      const researcher = new AIResearcher(mockExaKey);
      const market = createMockScreenedMarket();

      const result = await researcher.analyzeMarket(market, logBuffer);

      expect(result).toBeTruthy();
      expect(result.expectedValue).toBe(0);
      expect(result.confidence).toBe('low');
      // Error should be in the log buffer
      expect(logBuffer.some(log => log.includes('Failed to analyze'))).toBe(true);
    });
  });
});

