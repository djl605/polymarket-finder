# Polymarket Scanner Bot 🤖

An automated bot that identifies potentially mispriced markets on Polymarket using AI-powered research and analysis.

## Strategy

The bot finds markets that are:
- **Old enough** to be past initial price discovery (7+ days default)
- **Low volume** suggesting they may be overlooked (<$10,000 total default)
- **Tight spread** indicating confident liquidity providers (<6¢ default)
- **Uncertain outcome** (15-85% probability range default)

For each candidate, it:
1. **Researches** using OpenAI web search (searches news, forums, expert analyses)
2. **Analyzes** using OpenAI gpt-5.4 (assesses mispricing likelihood)
3. **Alerts** via Discord if worth investigating

## Quick Setup

### 1. Fork this repository

### 2. Add GitHub Secrets

Go to Settings → Secrets and variables → Actions → Secrets:

- **`DISCORD_WEBHOOK_URL`** - Your Discord webhook URL
- **`OPENAI_API_KEY`** - OpenAI API key ([get one](https://platform.openai.com/api-keys))

### 3. Enable GitHub Actions

Go to Actions tab → Enable workflows

Done! The bot runs automatically every 3 hours.

## Configuration (Optional)

Customize via GitHub Variables (Settings → Secrets and variables → Actions → Variables):

**Screening:**
- `MIN_MARKET_AGE_DAYS` (default: 7)
- `MAX_MARKET_VOLUME_DOLLARS` (default: 10000)
- `MAX_SPREAD_CENTS` (default: 6)
- `MIN_MARKET_PROBABILITY` (default: 0.15)
- `MAX_MARKET_PROBABILITY` (default: 0.85)

**Behavior:**
- `CACHE_MIN_AGE_DAYS` (default: 4) - min days before re-analyzing
- `CACHE_MAX_AGE_DAYS` (default: 10) - max days before re-analyzing (random per market)
- `ALERT_COOLDOWN_DAYS` (default: 7) - min days between re-alerts
- `MAX_ALERTS_PER_RUN` (default: 5)
- `MAX_CONCURRENT_ANALYSES` (default: 3) - increase if you have higher API rate limits

## Local Development

Create `.env`:

```bash
DISCORD_WEBHOOK_URL=your_webhook_url
OPENAI_API_KEY=sk-your-key

# Optional overrides
MIN_MARKET_AGE_DAYS=7
MAX_MARKET_VOLUME_DOLLARS=10000
MAX_SPREAD_CENTS=6
MIN_MARKET_PROBABILITY=0.15
MAX_MARKET_PROBABILITY=0.85
CACHE_MIN_AGE_DAYS=4
CACHE_MAX_AGE_DAYS=10
ALERT_COOLDOWN_DAYS=7
MAX_ALERTS_PER_RUN=5
MAX_CONCURRENT_ANALYSES=10
```

Install and run:

```bash
npm install
npm run dev          # Development mode
# or
npm run build
npm start            # Production mode
```

Test Discord webhook:

```bash
npm run test:discord
```

## Analyze a Specific Market

You can run AI analysis on a specific market without going through the normal bot workflow (no pre-screening, caching, or Discord notifications).

### Via npm command

```bash
# Using the full Polymarket URL (easiest!)
npm run analyze-market https://polymarket.com/event/will-bitcoin-hit-100k

# Or just the slug from the URL
npm run analyze-market will-bitcoin-hit-100k

# For multi-outcome markets, specify which outcome to analyze:
npm run analyze-market https://polymarket.com/event/most-rushing-yards-by-a-rookie-rb "Kyle Monangai"
npm run analyze-market most-rushing-yards-by-a-rookie-rb "Ashton Jeanty"
```

**Required environment variables:**
- `OPENAI_API_KEY` - Your OpenAI API key

**Optional environment variables:**
- `VERBOSE_LOGS=true` - Enable verbose logging to see the full AI response

### Via GitHub Actions

1. Go to the "Actions" tab in your GitHub repository
2. Select "Analyze Specific Market" workflow
3. Click "Run workflow"
4. Enter the market URL, slug, or search keywords
5. Click "Run workflow"

The analysis results will be displayed in the GitHub Actions logs.

**Required secrets:**
- `OPENAI_API_KEY` - Your OpenAI API key

### What it does

This feature:
- ✅ Fetches the specified market from Polymarket
- ✅ Runs AI research and reasoning using OpenAI gpt-5.4 with web search
- ✅ Logs the complete analysis to the console
- ✅ Handles both binary markets (Yes/No) and multi-outcome markets
- ❌ Does NOT check pre-screening criteria
- ❌ Does NOT use or save to cache
- ❌ Does NOT send Discord notifications

**Note on multi-outcome markets:** For markets with multiple possible outcomes (e.g., "Who will win?" or "Which party wins?" - even if just 2 options), the script will list all outcomes and prompt you to specify which one to analyze. Add the outcome name as a second parameter.

Perfect for ad-hoc analysis of interesting markets!

## Testing

```bash
npm test                 # Run all tests
npm run test:coverage    # With coverage report
npm run test:watch       # Watch mode
```

## How It Works

1. **Fetch** - Gets all active markets from Polymarket Gamma API
2. **Screen** - Filters by age, volume, probability, and spread
3. **Research** - For each candidate:
   - OpenAI gpt-5.4 with web search researches recent discussions/news
   - Research content is saved to markdown files for later review
   - The same model analyzes expected value (probability × magnitude of mispricing)
4. **Alert** - Sends Discord notifications for opportunities worth investigating
   - Includes link to full research content on GitHub
5. **Track** - Saves state and research files to prevent duplicate alerts

State and research files are stored in a separate `bot-state` branch. Old data (>30 days) is auto-cleaned.

## Project Structure

```
polymarket-scanner/
├── src/
│   ├── __tests__/                  # Test files
│   ├── index.ts                    # Main orchestration
│   ├── config.ts                   # Environment config
│   ├── market-fetcher.ts           # Polymarket API client
│   ├── market-scorer.ts            # Scoring logic
│   ├── ai-researcher.ts            # AI analysis
│   ├── discord-notifier.ts         # Notifications
│   ├── state-manager.ts            # State persistence
│   ├── research-file-manager.ts    # Research file storage
│   └── types.ts                    # TypeScript types
├── scripts/
│   ├── test-discord.ts             # Discord webhook test
│   └── analyze-market.ts           # Single market analysis
├── .github/workflows/
│   ├── scan.yml                    # Scheduled bot runs
│   └── analyze-market.yml          # Manual market analysis
├── package.json
├── tsconfig.json
└── README.md
```

## Research Files

Each analyzed market generates a markdown file in the `research/` directory (stored in the `bot-state` branch) containing:
- Market question and ID
- Search query used
- All sources found (title, URL, date, author, content)
- Timestamp of research

Discord alerts include a direct link to view the research content on GitHub, making it easy to review the data that informed the AI's analysis.

## Troubleshooting

**No markets found**: Criteria might be too strict, try adjusting variables

**No Discord alerts**: Verify webhook URL in secrets, check Actions logs

**API errors**: Check rate limits, verify API keys are correct

**Build errors**: Run `npm install` and ensure Node.js ≥18

## Customization

**Change scan frequency**: Edit `.github/workflows/scan.yml` cron schedule

**Modify AI prompts**: Edit `buildReasoningPrompt()` in `src/ai-researcher.ts`

**Adjust Discord format**: Edit methods in `src/discord-notifier.ts`

## License

MIT

## Disclaimer

For research and informational purposes only. Not financial advice. Do your own research before trading.
