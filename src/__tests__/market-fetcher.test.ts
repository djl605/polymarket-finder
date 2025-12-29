import { MarketFetcher } from '../market-fetcher';
import { ScreeningCriteria } from '../types';
import fetch from 'node-fetch';

// Mock node-fetch
jest.mock('node-fetch');
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('MarketFetcher', () => {
  let fetcher: MarketFetcher;

  beforeEach(() => {
    jest.clearAllMocks();
    fetcher = new MarketFetcher();
  });

  describe('fetchActiveMarkets', () => {
    it('should fetch and process markets with order book data', async () => {
      const mockMarkets = [
        {
          question: 'Will it rain tomorrow?',
          description: 'Test market',
          active: true,
          closed: false,
          volume: '1000',
          volume24hr: '100',
          outcomePrices: ['0.6', '0.4'],
          outcomes: ['Yes', 'No'],
          startDate: '2024-01-01T00:00:00Z',
          endDate: '2024-12-31T00:00:00Z',
          tokens: [{ token_id: 'token123' }],
          condition_id: 'cond123',
          bestBid: '0.58',
          bestAsk: '0.61',
        },
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockMarkets,
      } as any);

      const criteria = {
        minMarketAgeDays: 0,
        maxTotalVolume: 1000000,
        maxSpreadCents: 100,
        minProbability: 0,
        maxProbability: 1,
      };
      const markets = await fetcher.fetchActiveMarkets(criteria);

      expect(markets).toHaveLength(1);
      expect(markets[0].question).toBe('Will it rain tomorrow?');
      expect(markets[0].volume).toBe(1000);
      expect(markets[0].mainProbability).toBe(0.6);
      expect(markets[0].tokenId).toBe('token123');
      expect(markets[0].conditionId).toBe('cond123');
      expect(markets[0].bestBid).toBe(0.58);
      expect(markets[0].bestAsk).toBe(0.61);
      expect(markets[0].spread).toBeCloseTo(3, 1); // 0.03 * 100 = 3 cents
    });

    it('should filter out closed markets', async () => {
      const mockMarkets = [
        {
          question: 'Active market',
          active: true,
          closed: false,
          volume: '1000',
        },
        {
          question: 'Closed market',
          active: false,
          closed: true,
          volume: '2000',
        },
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockMarkets,
      } as any);

      const criteria = {
        minMarketAgeDays: 0,
        maxTotalVolume: 1000000,
        maxSpreadCents: 100,
        minProbability: 0,
        maxProbability: 1,
      };
      const markets = await fetcher.fetchActiveMarkets(criteria);

      expect(markets).toHaveLength(1);
      expect(markets[0].question).toBe('Active market');
    });

    it('should pre-filter high-volume markets when criteria provided', async () => {
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

      const mockMarkets = [
        {
          question: 'Low volume market',
          active: true,
          closed: false,
          volume: '1000',
          outcomePrices: ['0.5', '0.5'],
          startDate: tenDaysAgo.toISOString(),
          bestBid: '0.48',
          bestAsk: '0.51',
        },
        {
          question: 'High volume market',
          active: true,
          closed: false,
          volume: '50000',
          outcomePrices: ['0.5', '0.5'],
          startDate: tenDaysAgo.toISOString(),
          bestBid: '0.48',
          bestAsk: '0.51',
        },
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockMarkets,
      } as any);

      const criteria: ScreeningCriteria = {
        minMarketAgeDays: 7,
        maxTotalVolume: 10000,
        maxSpreadCents: 6,
        minProbability: 0.15,
        maxProbability: 0.85,
      };

      const markets = await fetcher.fetchActiveMarkets(criteria);

      expect(markets).toHaveLength(1);
      expect(markets[0].question).toBe('Low volume market');
    });

    it('should handle pagination', async () => {
      const batch1 = Array(100).fill(null).map((_, i) => ({
        question: `Market ${i}`,
        active: true,
        closed: false,
        volume: '1000',
      }));

      const batch2 = Array(50).fill(null).map((_, i) => ({
        question: `Market ${i + 100}`,
        active: true,
        closed: false,
        volume: '1000',
      }));

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => batch1,
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => batch2,
        } as any);

      const criteria = {
        minMarketAgeDays: 0,
        maxTotalVolume: 1000000,
        maxSpreadCents: 100,
        minProbability: 0,
        maxProbability: 1,
      };
      const markets = await fetcher.fetchActiveMarkets(criteria);

      expect(markets.length).toBe(150);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as any);

      const criteria = {
        minMarketAgeDays: 0,
        maxTotalVolume: 1000000,
        maxSpreadCents: 100,
        minProbability: 0,
        maxProbability: 1,
      };
      await expect(fetcher.fetchActiveMarkets(criteria)).rejects.toThrow('Gamma API request failed');
    });

    it('should calculate market age correctly', async () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const mockMarkets = [
        {
          question: 'Recent market',
          active: true,
          closed: false,
          volume: '1000',
          startDate: threeDaysAgo.toISOString(),
          bestBid: '0.5',
          bestAsk: '0.5',
        },
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockMarkets,
      } as any);

      const criteria = {
        minMarketAgeDays: 0,
        maxTotalVolume: 1000000,
        maxSpreadCents: 100,
        minProbability: 0,
        maxProbability: 1,
      };
      const markets = await fetcher.fetchActiveMarkets(criteria);

      expect(markets[0].ageInDays).toBeGreaterThanOrEqual(2.9);
      expect(markets[0].ageInDays).toBeLessThanOrEqual(3.1);
    });
  });
});

