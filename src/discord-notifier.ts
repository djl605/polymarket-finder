import fetch from 'node-fetch';
import { AIAnalysis, EnrichedMarket, ScreenedMarket } from './types';
import { ResearchFileManager } from './research-file-manager';
import * as fs from 'fs';

/**
 * Sends Discord notifications for interesting markets
 */
export class DiscordNotifier {
  constructor(
    private webhookUrl: string,
    private githubRepo?: string,
    private researchFileManager?: ResearchFileManager
  ) {}

  /**
   * Send a notification about an interesting market
   */
  async sendMarketAlert(
    screenedMarket: ScreenedMarket,
    analysis: AIAnalysis,
    isRealert: boolean
  ): Promise<void> {
    const { market } = screenedMarket;

    const titlePrefix = isRealert ? '🔄 Re-Alert' : '🎯 Potential Opportunity';
    const embed = {
      title: `${titlePrefix}: ${market.question}`,
      description: market.description.substring(0, 500) || 'No description available',
      color: this.getColorForEV(analysis.expectedValue),
      fields: [
        {
          name: '📊 Market Metrics',
          value: [
            `• Age: **${Math.round(market.ageInDays)} days**`,
            `• Total Volume: **$${Math.round(market.volume)}**`,
            `• Current Price: **${(market.mainProbability * 100).toFixed(1)}¢**`,
            `• Spread: **${market.spread.toFixed(1)}¢**`,
          ].filter(Boolean).join('\n'),
          inline: false,
        },
        {
          name: '🤖 AI Analysis',
          value: analysis.summary,
          inline: false,
        },
        {
          name: '🎲 Confidence',
          value: this.formatConfidence(analysis.confidence),
          inline: true,
        },
        {
          name: '💰 Expected Value',
          value: `**${analysis.expectedValue.toFixed(1)}¢**`,
          inline: true,
        },
        {
          name: '🔬 Research Version',
          value: `v${analysis.researchVersion}`,
          inline: true,
        },
        {
          name: '🔗 Links',
          value: [
            `[View on Polymarket](https://polymarket.com/event/${market.slug})`,
            market.tokenId ? `[Order Book](https://clob.polymarket.com/book?market=${market.tokenId})` : null,
            this.getResearchFileLink(analysis),
          ].filter(Boolean).join(' • '),
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Polymarket Scanner Bot',
      },
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [embed],
        }),
      });

      if (!response.ok) {
        throw new Error(`Discord webhook failed: ${response.status}`);
      }

      console.log(`   ✅ Alert sent to Discord`);
    } catch (error) {
      console.error('   ❌ Error sending Discord notification:', error);
      throw error;
    }
  }

  /**
   * Send a summary notification
   */
  async sendSummary(
    totalMarkets: number,
    screenedMarkets: number,
    newAnalyses: number,
    cachedAnalyses: number,
    runtimeSeconds: number
  ): Promise<void> {
    try {
      // Format runtime nicely
      const runtimeMinutes = Math.floor(runtimeSeconds / 60);
      const runtimeSecs = Math.floor(runtimeSeconds % 60);
      const runtimeStr = runtimeMinutes > 0 
        ? `${runtimeMinutes}m ${runtimeSecs}s` 
        : `${runtimeSecs}s`;

      const embed = {
        title: '✅ Scan Complete',
        description: `Completed in **${runtimeStr}**`,
        color: 0x5865F2, // Discord blue
        fields: [
          {
            name: '📊 Markets Screened',
            value: totalMarkets.toString(),
            inline: true,
          },
          {
            name: '✓ Passed Pre-Screening',
            value: screenedMarkets.toString(),
            inline: true,
          },
          {
            name: '🆕 New AI Analyses',
            value: newAnalyses.toString(),
            inline: true,
          },
          {
            name: '♻️ Cached Analyses',
            value: cachedAnalyses.toString(),
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: 'Polymarket Scanner Bot',
        },
      };

      await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [embed],
        }),
      });
    } catch (error) {
      console.error('Error sending summary notification:', error);
    }
  }

  private getColorForEV(expectedValue: number): number {
    if (expectedValue > 15) {
      return 0x00FF00; // Bright Green - High EV
    } else if (expectedValue > 10) {
      return 0xFFA500; // Orange - Medium EV
    } else {
      return 0x808080; // Gray - Low EV (shouldn't see in alerts, but for cached data)
    }
  }

  private formatConfidence(confidence: string): string {
    return confidence.charAt(0).toUpperCase() + confidence.slice(1);
  }

  /**
   * Generate a link to the research file on GitHub (if file exists)
   */
  private getResearchFileLink(analysis: AIAnalysis): string | null {
    if (!this.githubRepo || !this.researchFileManager) {
      return null;
    }

    // Generate the filepath using ResearchFileManager
    const filepath = this.researchFileManager.getFilePath(analysis.marketId, analysis.question);
    
    // Only include link if the file actually exists
    if (!fs.existsSync(filepath)) {
      return null;
    }

    // Extract just the filename from the path
    const filename = filepath.split('/').pop() || '';

    const githubUrl = `https://github.com/${this.githubRepo}/blob/bot-state/research/${filename}`;
    return `[Research Content](${githubUrl})`;
  }
}

