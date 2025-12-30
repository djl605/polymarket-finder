import { MarketScorer } from '../market-scorer';
import { EnrichedMarket, ScreeningCriteria } from '../types';

describe('MarketScorer', () => {
  let scorer: MarketScorer;
  let criteria: ScreeningCriteria;

  beforeEach(() => {
    criteria = {
      minMarketAgeDays: 7,
      maxTotalVolume: 10000,
      maxSpreadCents: 6,
      minProbability: 0.15,
      maxProbability: 0.85,
    };
    scorer = new MarketScorer(criteria);
  });

  const createMockMarket = (overrides?: Partial<EnrichedMarket>): EnrichedMarket => ({
    market: {},
    tokenId: 'token123',
    conditionId: 'cond123',
    slug: 'test-market',
    question: 'Test market?',
    description: 'Test description',
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
    bestAsk: 0.51,
    spread: 3,
    ...overrides,
  });

  describe('calculateScore', () => {
    it('should calculate score based on volume, spread, and age', () => {
      const market = createMockMarket({
        volume: 5000,
        spread: 3,
        ageInDays: 30,
      });

      const score = scorer.calculateScore(market);

      // Score should be a number between 0 and 1
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(1);
    });

    it('should favor lower volume markets', () => {
      const lowVolume = createMockMarket({ volume: 1000, spread: 3, ageInDays: 30 });
      const highVolume = createMockMarket({ volume: 9000, spread: 3, ageInDays: 30 });

      const lowScore = scorer.calculateScore(lowVolume);
      const highScore = scorer.calculateScore(highVolume);

      expect(lowScore).toBeLessThan(highScore);
    });

    it('should favor tighter spreads', () => {
      const tightSpread = createMockMarket({ volume: 5000, spread: 1, ageInDays: 30 });
      const wideSpread = createMockMarket({ volume: 5000, spread: 5, ageInDays: 30 });

      const tightScore = scorer.calculateScore(tightSpread);
      const wideScore = scorer.calculateScore(wideSpread);

      expect(tightScore).toBeLessThan(wideScore);
    });

    it('should favor older markets', () => {
      const older = createMockMarket({ volume: 5000, spread: 3, ageInDays: 100 });
      const newer = createMockMarket({ volume: 5000, spread: 3, ageInDays: 10 });

      const olderScore = scorer.calculateScore(older);
      const newerScore = scorer.calculateScore(newer);

      expect(olderScore).toBeLessThan(newerScore);
    });
  });

  describe('buildReasonString', () => {
    it('should format market information correctly', () => {
      const market = createMockMarket({
        ageInDays: 30,
        volume: 5000,
        mainProbability: 0.65,
        spread: 3,
      });

      const reason = scorer.buildReasonString(market);

      expect(reason).toContain('Age: 30d');
      expect(reason).toContain('Total Vol: $5000');
      expect(reason).toContain('Price: 65.0%');
      expect(reason).toContain('Spread: 3.0¢');
    });

    it('should handle decimal values correctly', () => {
      const market = createMockMarket({
        ageInDays: 15.7,
        volume: 1234.56,
        mainProbability: 0.456,
        spread: 2.3,
      });

      const reason = scorer.buildReasonString(market);

      expect(reason).toContain('Age: 16d'); // Rounded
      expect(reason).toContain('Total Vol: $1235'); // Rounded
      expect(reason).toContain('Price: 45.6%');
      expect(reason).toContain('Spread: 2.3¢');
    });
  });
});

