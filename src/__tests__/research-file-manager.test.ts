import * as fs from 'fs';
import * as path from 'path';
import { ResearchFileManager } from '../research-file-manager';
import { ResearchContent } from '../types';

describe('ResearchFileManager', () => {
  const testDir = 'test-research';
  let manager: ResearchFileManager;

  beforeEach(() => {
    // Create a fresh test directory for each test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    manager = new ResearchFileManager(testDir);
  });

  afterEach(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('constructor', () => {
    it('should create research directory if it does not exist', () => {
      expect(fs.existsSync(testDir)).toBe(true);
    });

    it('should not fail if directory already exists', () => {
      expect(() => new ResearchFileManager(testDir)).not.toThrow();
    });
  });

  describe('saveResearchContent', () => {
    it('should save research content to a markdown file', () => {
      const researchContent: ResearchContent = {
        marketId: '0x1234567890abcdef',
        question: 'Will Bitcoin reach $100k by end of 2024?',
        searchQuery: 'Bitcoin price prediction 2024 $100k',
        contextString: 'Source 1: Bitcoin Analysis\nURL: https://example.com/analysis\nBitcoin has been showing strong momentum...',
        researchedAt: '2024-01-05T12:00:00.000Z',
      };

      const filename = manager.saveResearchContent(researchContent);

      expect(filename).toMatch(/^0x1234567890-.*\.md$/);
      expect(fs.existsSync(path.join(testDir, filename))).toBe(true);

      const content = fs.readFileSync(path.join(testDir, filename), 'utf-8');
      expect(content).toContain('# Research: Will Bitcoin reach $100k by end of 2024?');
      expect(content).toContain('**Market ID:** 0x1234567890abcdef');
      expect(content).toContain('**Search Query:** "Bitcoin price prediction 2024 $100k"');
      expect(content).toContain('## Research Context');
      expect(content).toContain('Bitcoin has been showing strong momentum...');
    });

    it('should handle markets with minimal context', () => {
      const researchContent: ResearchContent = {
        marketId: '0xabcdef123456',
        question: 'Will it rain tomorrow?',
        searchQuery: 'weather forecast rain',
        contextString: 'No relevant sources found for this query.',
        researchedAt: '2024-01-05T12:00:00.000Z',
      };

      const filename = manager.saveResearchContent(researchContent);
      const content = fs.readFileSync(path.join(testDir, filename), 'utf-8');

      expect(content).toContain('## Research Context');
      expect(content).toContain('No relevant sources found for this query.');
    });

    it('should sanitize filenames with special characters', () => {
      const researchContent: ResearchContent = {
        marketId: '0x123abc',
        question: 'Will @user #tag with $pecial & char$?',
        searchQuery: 'test query',
        contextString: 'Test context',
        researchedAt: '2024-01-05T12:00:00.000Z',
      };

      const filename = manager.saveResearchContent(researchContent);

      // Should only contain alphanumeric, dashes, and file extension
      expect(filename).toMatch(/^[a-z0-9-]+\.md$/);
      expect(filename).not.toContain('@');
      expect(filename).not.toContain('#');
      expect(filename).not.toContain('$');
      expect(filename).not.toContain('&');
    });

    it('should truncate long questions in filename', () => {
      const longQuestion = 'A'.repeat(200) + '?';
      const researchContent: ResearchContent = {
        marketId: '0x123',
        question: longQuestion,
        searchQuery: 'test',
        contextString: 'Test context',
        researchedAt: '2024-01-05T12:00:00.000Z',
      };

      const filename = manager.saveResearchContent(researchContent);

      // Filename should be reasonable length (shortId + 100 chars + .md)
      expect(filename.length).toBeLessThan(120);
    });

    it('should include context string in output', () => {
      const researchContent: ResearchContent = {
        marketId: '0x456',
        question: 'Test market',
        searchQuery: 'test',
        contextString: 'Complete Article\nURL: https://example.com\nPublished: 2024-01-01\nAuthor: John Doe\nFull article text here',
        researchedAt: '2024-01-05T12:00:00.000Z',
      };

      const filename = manager.saveResearchContent(researchContent);
      const content = fs.readFileSync(path.join(testDir, filename), 'utf-8');

      expect(content).toContain('## Research Context');
      expect(content).toContain('Complete Article');
      expect(content).toContain('https://example.com');
      expect(content).toContain('John Doe');
    });

    it('should handle simple context strings', () => {
      const researchContent: ResearchContent = {
        marketId: '0x789',
        question: 'Test market',
        searchQuery: 'test',
        contextString: 'Minimal Article\nSome text',
        researchedAt: '2024-01-05T12:00:00.000Z',
      };

      const filename = manager.saveResearchContent(researchContent);
      const content = fs.readFileSync(path.join(testDir, filename), 'utf-8');

      expect(content).toContain('## Research Context');
      expect(content).toContain('Minimal Article');
      expect(content).toContain('Some text');
    });
  });

  describe('getFilePath', () => {
    it('should return the correct file path for a market', () => {
      const marketId = '0x1234567890abcdef';
      const question = 'Will Bitcoin reach $100k?';

      const filepath = manager.getFilePath(marketId, question);

      expect(filepath).toContain(testDir);
      expect(filepath).toMatch(/0x1234567890-.*\.md$/);
      expect(filepath).toContain('will-bitcoin-reach-100k');
    });
  });

  describe('listResearchFiles', () => {
    it('should return empty array when no files exist', () => {
      const files = manager.listResearchFiles();
      expect(files).toEqual([]);
    });

    it('should return only markdown files', () => {
      // Create test files
      fs.writeFileSync(path.join(testDir, 'test1.md'), 'content');
      fs.writeFileSync(path.join(testDir, 'test2.md'), 'content');
      fs.writeFileSync(path.join(testDir, 'test.txt'), 'content');
      fs.writeFileSync(path.join(testDir, 'test.json'), 'content');

      const files = manager.listResearchFiles();

      expect(files).toHaveLength(2);
      expect(files).toContain('test1.md');
      expect(files).toContain('test2.md');
      expect(files).not.toContain('test.txt');
      expect(files).not.toContain('test.json');
    });

    it('should list multiple research files after saving', () => {
      const research1: ResearchContent = {
        marketId: '0x111',
        question: 'Market 1',
        searchQuery: 'query1',
        contextString: 'Context for market 1',
        researchedAt: '2024-01-05T12:00:00.000Z',
      };

      const research2: ResearchContent = {
        marketId: '0x222',
        question: 'Market 2',
        searchQuery: 'query2',
        contextString: 'Context for market 2',
        researchedAt: '2024-01-05T12:00:00.000Z',
      };

      manager.saveResearchContent(research1);
      manager.saveResearchContent(research2);

      const files = manager.listResearchFiles();
      expect(files).toHaveLength(2);
    });
  });
});

