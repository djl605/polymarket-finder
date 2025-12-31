# Polymarket Scanner Bot 🤖

An automated bot that identifies potentially mispriced markets on Polymarket by finding low-volume markets with tight spreads, then using AI to analyze whether they warrant further research.

Built with the [official Polymarket CLOB client](https://github.com/Polymarket/clob-client).

## 🎯 Strategy

The bot looks for markets that are:
- **Old enough** to be past initial price discovery (7+ days by default)
- **Low total volume** suggesting they may be overlooked (<$10,000 total by default)
- **Tight spread** indicating someone is confident enough to provide liquidity (<5¢ by default)
- **Uncertain outcome** (probability between 20-80% by default)

When it finds candidates, it:
1. **Researches** using Exa AI (neural search across Twitter, Reddit, news, forums)
2. **Reasons** using OpenAI o4-mini to assess mispricing likelihood
3. **Alerts** you via Discord for manual research

These characteristics suggest markets that may be mispriced due to low attention.

## 🏗️ Architecture

- **Language:** TypeScript with strict type checking
- **API Client:** Official `@polymarket/clob-client` + Gamma API
- **Runtime:** GitHub Actions (runs every 3 hours, fully free)
- **State Management:** JSON file stored in separate `bot-state` branch
- **Notifications:** Discord webhooks with rich embeds
- **Web Research:** Exa AI (neural search across social media, news, forums)
- **AI Reasoning:** OpenAI o4-mini (chain-of-thought reasoning for mispricing detection)

## 🚀 Setup

### 1. Fork/Clone This Repository

```bash
git clone https://github.com/yourusername/polymarket-scanner.git
cd polymarket-scanner
```

### 2. Install Dependencies (for local testing)

```bash
npm install
```

### 3. Configure Discord Webhook

1. Go to your Discord server settings
2. Navigate to Integrations → Webhooks
3. Create a new webhook and copy the URL
4. In your GitHub repository: Settings → Secrets and variables → Actions
5. Add a new secret: `DISCORD_WEBHOOK_URL` with your webhook URL

### 4. Configure AI API Keys (Required)

Add the following secrets to your GitHub repository:

- `OPENAI_API_KEY` - for o4-mini reasoning (get from [OpenAI](https://platform.openai.com/api-keys))
- `EXA_API_KEY` - for neural search (get from [Exa.ai](https://exa.ai/))

### 5. Adjust Screening Criteria (Optional)

Customize screening by adding GitHub Variables (Settings → Secrets and variables → Actions → Variables):

**Screening Criteria:**
- `MIN_MARKET_AGE_DAYS` (default: 7) - minimum age of market in days
- `MAX_MARKET_VOLUME_DOLLARS` (default: 10000) - maximum total volume in USD
- `MAX_SPREAD_CENTS` (default: 6) - maximum bid-ask spread in cents
- `MIN_MARKET_PROBABILITY` (default: 0.15) - minimum probability (15%)
- `MAX_MARKET_PROBABILITY` (default: 0.85) - maximum probability (85%)

**Bot Behavior:**
- `CACHE_MIN_AGE_DAYS` (default: 4) - minimum days before cache expires
- `CACHE_MAX_AGE_DAYS` (default: 10) - maximum days before cache expires (random per market)
- `ALERT_COOLDOWN_DAYS` (default: 7) - minimum days between re-alerts
- `MAX_ALERTS_PER_RUN` (default: 5) - maximum alerts per scan

### 6. Enable GitHub Actions

1. Go to the Actions tab in your repository
2. Enable workflows if prompted
3. The bot will now run automatically every 3 hours

## 🧪 Testing Locally

Create a `.env` file (don't commit this):

```bash
DISCORD_WEBHOOK_URL=your_webhook_url_here
OPENAI_API_KEY=your_openai_key_here
EXA_API_KEY=your_exa_key_here
MIN_MARKET_AGE_DAYS=7
MAX_TOTAL_VOLUME=10000
MAX_SPREAD_PERCENT=5
MIN_PROBABILITY=0.20
MAX_PROBABILITY=0.80
```

Run the bot:

```bash
# Development mode (with ts-node)
npm run dev

# Or build and run
npm run build
npm start
```

## 📊 How It Works

1. **Fetch Markets:** Retrieves all active markets from Polymarket's Gamma API (with pagination)
2. **Pre-Filter:** Filters out high-volume markets during fetch to save memory (~97% reduction)
3. **Initial Screen:** Filters by age, total volume, and probability (fast)
4. **Enrich Order Books:** Fetches order book data for top 50 candidates using CLOB client
5. **Final Screen:** Re-filters with spread data (tight spreads only)
6. **Three-Stage AI Research Pipeline:**
   - **Stage 1:** GPT-4o-mini analyzes market and crafts optimal search query
   - **Stage 2:** Exa AI searches Twitter, Reddit, news, forums with optimized query
   - **Stage 3:** OpenAI o4-mini reasons through findings to assess mispricing
7. **Alert:** Sends Discord notifications for markets worth researching (max 5 per run)
8. **Track:** Saves alerted markets to prevent duplicate notifications

## 🔔 Discord Notifications

Each alert includes:
- Market question and description
- Key metrics (age, total volume, spread, current price)
- AI reasoning and mispricing assessment (based on web research)
- Confidence level (low/medium/high)
- Recommendation (skip/research/strong signal)
- Direct links to Polymarket and order book

The console also logs the **full AI reasoning chain** for transparency.

## 📁 Project Structure

```
polymarket-scanner/
├── src/
│   ├── __tests__/            # Test files
│   │   ├── config.test.ts
│   │   ├── market-fetcher.test.ts
│   │   ├── market-scorer.test.ts
│   │   ├── ai-researcher.test.ts
│   │   ├── discord-notifier.test.ts
│   │   ├── state-manager.test.ts
│   │   └── index.test.ts
│   ├── index.ts              # Main bot orchestration
│   ├── types.ts              # TypeScript type definitions
│   ├── config.ts             # Configuration loader
│   ├── market-fetcher.ts     # Polymarket API client (Gamma + CLOB)
│   ├── market-scorer.ts      # Market scoring and formatting logic
│   ├── ai-researcher.ts      # AI analysis module
│   ├── discord-notifier.ts   # Discord notification system
│   └── state-manager.ts      # State persistence
├── .github/workflows/
│   └── scan.yml              # GitHub Actions workflow
├── jest.config.js            # Jest configuration
├── package.json
├── tsconfig.json
├── README.md
├── SETUP.md                  # Setup guide
└── TESTING.md                # Testing guide
```

## 🔒 State Management

The bot uses a separate `bot-state` branch to store `state.json`, which tracks:
- Markets that have already been alerted
- Timestamp and price at alert
- AI analysis results

This prevents duplicate alerts while keeping your main branch clean. Old alerts (>30 days) are automatically cleaned up.

## ⚙️ Customization

### Adjusting Scan Frequency

Edit `.github/workflows/scan.yml`:

```yaml
schedule:
  - cron: '0 */6 * * *'  # Every 6 hours instead of 3
```

### Changing Alert Limits

Edit `src/index.ts`:

```typescript
const maxAlertsPerRun = 10; // Send up to 10 alerts per run
```

### Modifying AI Prompts

Edit the `buildAnalysisPrompt` method in `src/ai-researcher.ts` to customize how AI analyzes markets.

### Adjusting Order Book Fetch Limit

Edit `src/index.ts`:

```typescript
const enrichedMarkets = await fetcher.enrichWithOrderBooks(topCandidates, 100); // Fetch 100 instead of 50
```

## 💰 Cost Estimate

- **GitHub Actions:** Free (2,000 minutes/month for private repos, unlimited for public)
- **GPT-4o-mini (query generation):** ~$0.001 per market
- **Exa AI (search):** ~$0.10 per market (10 results with content)
- **OpenAI o4-mini (reasoning):** ~$0.04 per market
- **Total per market analyzed:** ~$0.14
- **Daily cost:** 5 markets × 8 scans/day = ~$5.60/day
- **Monthly cost:** ~$170/month

This gives you a three-stage AI research pipeline with real web context. If budget is tight:
- Reduce scan frequency (4x/day = $85/month)
- Reduce max alerts per run (3 instead of 5 = $100/month)
- Increase screening thresholds to find fewer candidates

## 📈 Market Screening

The bot applies all screening criteria during market fetching for maximum efficiency:

- Market age (default: 7+ days old)
- Total trading volume (default: < $10,000)
- Probability range (default: 15%-85%)
- Spread (default: < 6¢)

Markets are enriched and filtered inline as they're fetched from the API, keeping only qualified candidates in memory.

## 🐛 Troubleshooting

### Bot not running
- Check GitHub Actions is enabled in your repository
- Verify the workflow file exists in `.github/workflows/`
- Check the Actions tab for error logs

### No Discord notifications
- Verify `DISCORD_WEBHOOK_URL` secret is set correctly
- Check the Actions logs for error messages
- Test your webhook URL manually with curl

### No markets found
- Criteria might be too strict—try adjusting variables
- Polymarket API might be down—check logs
- Could be genuinely no qualifying markets at that moment

### TypeScript errors
```bash
npm run type-check
```

## 🧪 Testing

### Test Discord Webhook

To verify your Discord webhook is working:

```bash
npm run test:discord
```

This will send a test message to your configured Discord webhook.

### Test Suite

The project includes a comprehensive test suite. See [TESTING.md](TESTING.md) for details.

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📚 Resources

- [Polymarket CLOB Client](https://github.com/Polymarket/clob-client)
- [Polymarket Gamma API Docs](https://docs.polymarket.com/)
- [GitHub Actions Documentation](https://docs.github.com/actions)

## 📝 License

MIT

## ⚠️ Disclaimer

This bot is for research and informational purposes only. Always do your own research before trading. The bot's AI analysis is not financial advice. Past performance doesn't guarantee future results.

## 🤝 Contributing

Feel free to open issues or submit pull requests to improve the bot!

---

Built with the official [Polymarket CLOB Client](https://github.com/Polymarket/clob-client) 🎯
