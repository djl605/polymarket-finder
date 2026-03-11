import * as fs from 'fs';
import * as path from 'path';
import { ResearchContent } from './types';

/**
 * Manages saving research content to markdown files
 */
export class ResearchFileManager {
  private researchDir: string;

  constructor(researchDir: string = 'research') {
    this.researchDir = researchDir;
    this.ensureDirectoryExists();
  }

  /**
   * Ensure the research directory exists
   */
  private ensureDirectoryExists(): void {
    if (!fs.existsSync(this.researchDir)) {
      fs.mkdirSync(this.researchDir, { recursive: true });
    }
  }

  /**
   * Generate a safe filename from market ID and question
   */
  private generateFilename(marketId: string, question: string): string {
    // Create a safe filename from the market question
    const safeQuestion = question
      .substring(0, 100) // Limit length
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .toLowerCase();
    
    // Use marketId prefix for uniqueness
    const shortId = marketId.substring(0, 12);
    return `${shortId}-${safeQuestion}.md`;
  }

  /**
   * Save research content to a markdown file
   */
  saveResearchContent(researchContent: ResearchContent): string {
    const filename = this.generateFilename(researchContent.marketId, researchContent.question);
    const filepath = path.join(this.researchDir, filename);

    const markdown = this.formatResearchAsMarkdown(researchContent);
    fs.writeFileSync(filepath, markdown, 'utf-8');

    return filename;
  }

  /**
   * Format research content as markdown
   */
  private formatResearchAsMarkdown(research: ResearchContent): string {
    const lines: string[] = [];

    // Header
    lines.push(`# Research: ${research.question}`);
    lines.push('');
    lines.push(`**Market ID:** ${research.marketId}`);
    lines.push(`**Researched At:** ${new Date(research.researchedAt).toLocaleString('en-US', { 
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })}`);
    lines.push(`**Search Query:** "${research.searchQuery}"`);
    lines.push('');
    lines.push('---');
    lines.push('');

    // AI Analysis (if available)
    if (research.analysis) {
      lines.push('## AI Analysis');
      lines.push('');
      lines.push(`**Confidence:** ${research.analysis.confidence.charAt(0).toUpperCase() + research.analysis.confidence.slice(1)}`);
      lines.push(`**Expected Value:** ${research.analysis.expectedValue.toFixed(1)}¢`);
      lines.push('');
      lines.push('### Summary');
      lines.push('');
      lines.push(research.analysis.summary);
      lines.push('');
      lines.push('### Full Analysis');
      lines.push('');
      lines.push(research.analysis.fullAnalysis);
      lines.push('');
      lines.push('---');
      lines.push('');
    }

    // Research Context - web search sources
    lines.push('## Research Context');
    lines.push('');
    lines.push('*The following sources were found via web search and used in the analysis:*');
    lines.push('');
    lines.push(research.contextString);
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Get the path to a research file (for generating links)
   */
  getFilePath(marketId: string, question: string): string {
    const filename = this.generateFilename(marketId, question);
    return path.join(this.researchDir, filename);
  }

  /**
   * List all research files
   */
  listResearchFiles(): string[] {
    if (!fs.existsSync(this.researchDir)) {
      return [];
    }
    return fs.readdirSync(this.researchDir).filter(file => file.endsWith('.md'));
  }
}

