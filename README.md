# Polymarket Scanner Bot 🤖

An automated bot that identifies potentially mispriced markets on Polymarket using AI-powered research and analysis.

## Strategy

The bot finds markets that are:
- **Old enough** to be past initial price discovery (7+ days default)
- **Low volume** suggesting they may be overlooked (<$10,000 total default)
- **Tight spread** indicating confident liquidity providers (<6¢ default)
- **Uncertain outcome** (15-85% probability range default)

For each candidate, it:
1. **Researches** using Exa AI (searches Twitter, Reddit, news, forums)
2. **Analyzes** using OpenAI o4-mini (assesses mispricing likelihood)
3. **Alerts** via Discord if worth investigating

## Quick Setup

### 1. Fork this repository

### 2. Add GitHub Secrets

Go to Settings → Secrets and variables → Actions → Secrets:

- **`DISCORD_WEBHOOK_URL`** - Your Discord webhook URL
- **`OPENAI_API_KEY`** - OpenAI API key ([get one](https://platform.openai.com/api-keys))
- **`EXA_API_KEY`** - Exa AI key ([get one](https://exa.ai/))

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
EXA_API_KEY=your-key

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
   - GPT-4o-mini generates optimal search query
   - Exa AI searches recent discussions/news
   - OpenAI o4-mini analyzes findings for mispricing
4. **Alert** - Sends Discord notifications with analysis
5. **Track** - Saves state to prevent duplicate alerts

State is stored in a separate `bot-state` branch. Old data (>30 days) is auto-cleaned.

## Cost Estimate

Per market analyzed: ~$0.14
- GPT-4o-mini (query): ~$0.001
- Exa AI (search): ~$0.10
- OpenAI o4-mini (reasoning): ~$0.04

Daily: 5 markets × 8 runs = ~$5.60
Monthly: ~$170

To reduce costs:
- Lower `MAX_ALERTS_PER_RUN`
- Reduce scan frequency in `.github/workflows/scan.yml`
- Increase screening thresholds to find fewer candidates

## Project Structure

```
polymarket-scanner/
├── src/
│   ├── __tests__/              # Test files
│   ├── index.ts                # Main orchestration
│   ├── config.ts               # Environment config
│   ├── market-fetcher.ts       # Polymarket API client
│   ├── market-scorer.ts        # Scoring logic
│   ├── ai-researcher.ts        # AI analysis
│   ├── discord-notifier.ts     # Notifications
│   ├── state-manager.ts        # State persistence
│   └── types.ts                # TypeScript types
├── .github/workflows/scan.yml  # GitHub Actions
├── package.json
├── tsconfig.json
└── README.md
```

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
