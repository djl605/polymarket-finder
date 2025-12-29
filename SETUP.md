# Quick Setup Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `dotenv` - Environment variable management
- `node-fetch` - HTTP requests
- TypeScript and type definitions

### 2. Test Locally (Optional but Recommended)

Create a `.env` file:

```bash
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-here
OPENAI_API_KEY=sk-your-key-here
EXA_API_KEY=your-exa-key-here

# Screening criteria
MIN_MARKET_AGE_DAYS=7                  # Minimum age of market in days
MAX_MARKET_VOLUME_DOLLARS=10000        # Maximum total volume in USD
MAX_SPREAD_CENTS=6                     # Maximum bid-ask spread in cents
MIN_MARKET_PROBABILITY=0.15            # Minimum probability (15%)
MAX_MARKET_PROBABILITY=0.85            # Maximum probability (85%)

# Bot behavior
ANALYSIS_CACHE_DAYS=3                  # How long to cache AI analyses (days)
ALERT_COOLDOWN_DAYS=7                  # Minimum days between re-alerts
MAX_ALERTS_PER_RUN=5                   # Maximum alerts per scan
MIN_PROBABILITY=0.20
MAX_PROBABILITY=0.80
```

Run a test scan:

```bash
npm run dev
```

### 3. Deploy to GitHub

1. **Create a GitHub repository** and push this code

2. **Add secrets** (Settings → Secrets and variables → Actions → Secrets):
   - `DISCORD_WEBHOOK_URL`
   - `OPENAI_API_KEY`
   - `EXA_API_KEY`

3. **Enable GitHub Actions** (Actions tab → Enable workflows)

4. **Done!** The bot will run every 3 hours automatically

### 4. Manual Trigger

Go to: Actions → Polymarket Scanner → Run workflow

## 🔍 What the Bot Does

1. Fetches all active markets from Polymarket (with smart filtering to save memory)
2. Screens for low total volume, tight-spread markets
3. **Three-stage AI research pipeline:**
   - Uses GPT-4o-mini to craft optimal search queries
   - Uses Exa AI to search Twitter, Reddit, news, forums
   - Uses OpenAI o1-mini to reason through findings
4. Sends Discord alerts for interesting opportunities with full reasoning
5. Tracks alerted markets to avoid duplicates

## 📊 Expected Output

The bot will send Discord embeds like:

```
🎯 Potential Opportunity: Will X happen by Y?

📊 Market Metrics
• Age: 14 days
• Total Volume: $2,500
• Current Price: 35.0%
• Spread: 2.5%

🤖 AI Analysis
Based on recent Twitter discussion and news coverage, the base rate 
suggests 45-50% probability, but market is pricing at 35%. Evidence 
of information asymmetry from Reddit thread analyzing overlooked data...

📈 Recommendation: 🚨 STRONG SIGNAL - High priority research
🎲 Confidence: High

🔗 Links
View on Polymarket • Order Book
```

Plus the console will show the **full reasoning chain** from o1-mini.

## 🐛 Troubleshooting

### TypeScript errors about console/process/setTimeout

These should go away after running `npm install`. If not:

```bash
npm install --save-dev @types/node
```

### Can't find @polymarket/clob-client

```bash
npm install @polymarket/clob-client ethers
```

### Bot runs but no markets found

- Your criteria might be too strict
- Try adjusting `MAX_DAILY_VOLUME` or `MAX_SPREAD_PERCENT`
- Check the logs in GitHub Actions

## Test Discord Webhook

Before running the full bot, verify your Discord webhook is working:

```bash
npm run test:discord
```

You should see a green test message in your Discord channel.

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Read [TESTING.md](TESTING.md) for testing guide
- Customize screening criteria
- Adjust AI prompts in `src/ai-researcher.ts`
- Modify notification format in `src/discord-notifier.ts`

## 🧪 Running Tests

Before deploying, make sure all tests pass:

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

Happy trading! 🎯

