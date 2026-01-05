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

    // Sources
    if (research.sources.length === 0) {
      lines.push('## Research Sources');
      lines.push('');
      lines.push('*No sources found for this market.*');
    } else {
      lines.push(`## Research Sources (${research.sources.length} found)`);
      lines.push('');

      research.sources.forEach((source, index) => {
        lines.push(`### Source ${index + 1}: ${source.title || 'Untitled'}`);
        lines.push('');
        
        if (source.url) {
          lines.push(`**URL:** ${source.url}`);
        }
        
        if (source.publishedDate) {
          lines.push(`**Published:** ${source.publishedDate}`);
        }
        
        if (source.author) {
          lines.push(`**Author:** ${source.author}`);
        }
        
        lines.push('');
        lines.push('**Content:**');
        lines.push('');
        lines.push(source.text || '*No content available*');
        lines.push('');
        lines.push('---');
        lines.push('');
      });
    }

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

