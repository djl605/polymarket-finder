# Research: USD1 depeg by December 31?

**Market ID:** 0x26bd52c930651a76b3ba1bdd973f96695f792128d4837430702842d8ab77b18e
**Researched At:** March 17, 2026 at 05:21:24 AM UTC
**Search Query:** "USD1 depeg by December 31?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 3.0¢

### Summary

USD1 is a recently launched, exchange‑listed dollar stablecoin and Pyth publishes a USD1/USD feed used by TradingView for resolution; public reporting shows backing claims and heavy early adoption but not a documented 24‑hour depeg so far. Given newness, concentrated issuance and oracle/operational risks, a nonzero depeg probability is reasonable, but current public evidence does not prove a clear >7‑10 cent mispricing — expected investigatory value ≈ 3.0 cents.

### Full Analysis

Plan and scope
- Questions I need answered: (A) Exactly what USD1 is and whether Pyth publishes a USD1/USD 1-minute feed (because the market resolves off Pyth/TradingView). (B) USD1’s issuance, backing claims, exchange listings, and any prior depeg / volatility events that would make a >24‑hour drop below $0.98 plausible. (C) Any operational or on‑chain facts (concentrated minting, redemption mechanics, known runs, exchange conversions) that materially change the probability of a prolonged depeg.
- I used my 3 web searches to (1) confirm USD1’s identity and backing (major news), (2) confirm Pyth/TradingView support for a USD1 feed, and (3) collect evidence on USD1 market adoption and any reported depeg or stress events.

1) CONTEXT ANALYSIS — What the market asks and exact resolution condition
- Market question (restated): “USD1 depeg by December 31?” The market will resolve YES if there exists any 24‑hour period (between 27 Oct 2025 15:00 ET and 31 Dec 2026 23:59 ET inclusive) during which every Pyth 1‑minute candle High for USD1‑USD is strictly below 0.98000 (i.e., ≤ 0.97999). Otherwise it resolves NO. The chart/resolution source is TradingView using the Pyth feed (PYTH:USD1USD). This is a strict, oracle‑based rule: a YES requires a sustained 24‑hour period where no 1‑minute high reaches $0.98 or above according to Pyth/TradingView. Pyth does publish a USD1/USD feed (so the instrument exists on the resolution oracle). ([docs.pyth.network](https://docs.pyth.network/price-feeds/core/push-feeds/aptos?utm_source=openai))

2) EVIDENCE EVALUATION — Relevant facts and how they affect the implied 15.5% probability
Key facts I found
- Identity and backing claims: USD1 is a relatively new dollar‑pegged stablecoin issued by World Liberty Financial (WLFI), with public claims that it is backed by short‑term U.S. treasuries, U.S. dollar deposits and cash equivalents. Major outlets covered its launch and backing claims. ([cnbc.com](https://www.cnbc.com/2025/03/25/trumps-world-liberty-financial-jumps-into-stablecoin-game-with-usd1-reveal.html?utm_source=openai))
- Exchange adoption and rapid growth: USD1 has been listed or integrated on major venues (examples reported include Coinbase and Binance integrations/announcements) and press coverage reports rapid issuance and growth to large market‑cap figures within months of launch. This implies material liquidity on some venues but also that supply/usage is still relatively new and possibly concentrated. ([finance.yahoo.com](https://finance.yahoo.com/news/trump-backed-world-liberty-gets-212741844.html?utm_source=openai))
- Oracle availability and resolution path: Pyth publishes a USD1/USD feed (feed metadata shown on developer docs) and TradingView exposes PYTH:USD1USD, so the market’s specified resolution source is verifiable and active. That means resolution depends on on‑chain/off‑chain aggregation design decisions by Pyth (heartbeat interval, publisher set, how they handle stale or offline publishers, etc.). ([docs.pyth.network](https://docs.pyth.network/price-feeds/core/push-feeds/aptos?utm_source=openai))
- Public reports of stress: I did not find authoritative, widely‑reported incidents (e.g., multi‑day depegs of USD1 below $0.98) that would make a prolonged depeg already part of public history. Coverage describes fast growth and some coordinated mints and a large market cap, but not a confirmed, long 24‑hour depeg. (Media reports do reference stablecoin stress events in other projects and emphasize systemic stablecoin risks; USD1 has not had a widely‑reported, prolonged collapse up to the dates in those articles.) ([cryptoslate.com](https://cryptoslate.com/trump-backed-stablecoin-usd1-hits-over-1-billion-market-cap-on-bnb/?utm_source=openai))

Evidence that would argue the market price (15.5%) is too high (i.e., overstates depeg chance)
- Credible backing and major‑exchange support: Articles report USD1’s backing claims (U.S. treasuries, deposits) and major exchange support/listings (Coinbase/Binance coverage). If these backing claims and redemption mechanisms are true and functioning, an extended 24‑hour price < $0.98 is relatively unlikely for a dollar‑backed stablecoin with active on‑ and off‑ramps. That would push a depeg probability materially below 15%. ([cnbc.com](https://www.cnbc.com/2025/03/25/trumps-world-liberty-financial-jumps-into-stablecoin-game-with-usd1-reveal.html?utm_source=openai))
- No publicly documented multi‑day depeg so far: I found no authoritative reports documenting that USD1 has already experienced a sustained >24‑hour window under $0.98. If such a depeg had already occurred, the market would likely already be settled or traders would price it near certainty; its absence reduces the prior probability of short‑term catastrophic failure. ([cryptoslate.com](https://cryptoslate.com/trump-backed-stablecoin-usd1-hits-over-1-billion-market-cap-on-bnb/?utm_source=openai))

Evidence that supports the market price or suggests nontrivial depeg risk
- Newness and concentration risks: USD1 was launched recently and has seen rapid minting and centralized issuance activity in early months. Rapid, concentrated mint/burn and concentrated custodial counterparty relationships can produce nontrivial liquidity and redemption risk if a major counterparty or exchange imposes restrictions or if large on‑chain holders attempt coordinated redemptions. Those structural risks justify a non‑zero probability of a multi‑day depeg. ([cryptoslate.com](https://cryptoslate.com/trump-backed-stablecoin-usd1-hits-over-1-billion-market-cap-on-bnb/?utm_source=openai))
- Political/regulatory and integration uncertainty: USD1’s institutional and political profile (WLFI / high‑visibility backers) may attract regulatory scrutiny or cause rapid policy changes that could temporarily interrupt conversions or redemptions (for example, exchange freezes or bank counterparties pulling deposits), increasing the chance of temporary or prolonged price stress. That makes a >10% market probability plausible to some traders. ([cnbc.com](https://www.cnbc.com/2025/03/25/trumps-world-liberty-financial-jumps-into-stablecoin-game-with-usd1-reveal.html?utm_source=openai))
- Oracle / feed risks: The market resolves strictly on Pyth 1‑minute highs via TradingView. An otherwise short lived or exchange‑level liquidity squeeze might not show up as a multi‑day sub‑$0.98 across the Pyth aggregated feed—conversely, Pyth or TradingView data outages, feed reconfigurations, or changes in publisher sets could complicate resolution or temporarily produce a “false” depeg signal (or prevent detection). Traders aware of these oracle‑specific operational details could assign higher or lower probabilities than naïve on‑chain liquidity analysis would indicate. (Pyth’s feed metadata and heartbeat indicate the feed exists, but resolution depends on how publishers aggregate and handle edge cases.) ([docs.pyth.network](https://docs.pyth.network/price-feeds/core/push-feeds/aptos?utm_source=openai))

Source credibility and recency
- CNBC and Yahoo/finance reporting of USD1 launch/listing are mainstream, generally reliable financial‑news sources; useful for public claims, exchange listings and high‑level context (high credibility for product announcements and exchange notices). ([cnbc.com](https://www.cnbc.com/2025/03/25/trumps-world-liberty-financial-jumps-into-stablecoin-game-with-usd1-reveal.html?utm_source=openai))
- Pyth developer documentation is authoritative about whether a feed exists and its technical heartbeat/update parameters (high credibility for oracle availability). ([docs.pyth.network](https://docs.pyth.network/price-feeds/core/push-feeds/aptos?utm_source=openai))
- Cointelegraph/CryptoSlate are crypto‑industry outlets—useful for speed and market color but less authoritative on regulatory/legal details; they are, however, appropriate for citing market cap, minting patterns, and reported exchange integrations. ([cointelegraph.com](https://cointelegraph.com/news/trump-backed-usd1-is-now-the-seventh-largest-stablecoin-worldwide//?utm_source=openai))

Skepticism about “obvious” evidence
- If USD1’s public backing claims alone made a prolonged depeg nearly impossible, informed traders would have bid the market much lower (near 0–5%), yet the market sits at 15.5% with low overall dollar volume ($9.9k in this market). That suggests either (a) some traders are skeptical about the reserves/backing/redemption plumbing, (b) traders are pricing oracle/resolution risk (i.e., the Pyth‑TradingView path could produce edge cases), or (c) the price is primarily set by a small number of traders in a low‑volume market. The presence of multiple plausible explanations makes it unsafe to assume the market is clearly mispriced without more inside knowledge.

3) MARKET EFFICIENCY ANALYSIS — reliability of the current price
- Reasonable interpretations that justify ~15%:
  - Traders know USD1 is new and assign nontrivial tail risk (banking/custodian/regulatory interruptions, exchange freezes, or a run) that could cause multi‑day illiquidity. 15% is a conservative reflection of that tail risk.
  - Traders may be pricing oracle/technical risk: a Pyth feed outage or publisher reconfiguration during a stress event could result in a recorded 24‑hour period below $0.98 or an ambiguous resolution — traders may incorporate that extra risk.
- Could this reflect one/few traders? Yes. Low market volume ($9.9k) + a 5¢ spread suggests order book depth is shallow; a few active participants could maintain a price without broad aggregation of informed views. The market age (78d) with thin volume suggests many informed liquidity providers have not engaged heavily.
- Is low volume because outcome is obvious? Not obviously: USD1 is new and outcome is uncertain, so low volume more likely reflects limited attention and the fact that traders who specialize in stablecoin tail‑risk either (a) are already hedged elsewhere or (b) prefer OTC/sizeable positions off these low‑liquidity prediction markets.

4) MISPRICING ASSESSMENT — weigh evidence and timeline
- On balance: I do not find credible, specific evidence that the market is clearly and substantially mispriced in either direction. Two plausible, competing views exist:
  - Bearish view (market reasonable): New stablecoin + concentrated issuance + political/regulatory vectors + oracle/operational risk justify a material (>10%) chance of a sustained stress event; 15.5% is within a plausible subjective range for some traders.
  - Bullish view (market too pessimistic): Public backing claims, major exchange support and absence of any reported 24‑hour sub‑$0.98 historical event argue for a much lower probability (single‑digit %). If the reserves and redemption rails operate normally, long 24‑hour depegs are unlikely.
- Critical check (resolution rule): The market resolves on Pyth 1‑minute Highs for a full 24‑hour window — this is a strict and somewhat demanding condition. Even severe but transient price drops that recover within 24 hours will NOT resolve YES. That resolution detail reduces the probability of YES relative to an interpretation of “any time price below $0.98.” Traders who understand that requirement might therefore price lower; traders who worry about oracle or exchange outages creating a persistent sub‑$0.98 reading may price higher. Make sure you understand that nuance before betting. ([docs.pyth.network](https://docs.pyth.network/price-feeds/core/push-feeds/aptos?utm_source=openai))

Conclusion on mispricing
- The evidence does not clearly prove the market is mispriced. There are legitimate structural and operational risks for USD1 that justify a non‑zero probability, and there are also credible arguments (backing claims + exchange support + no prior long depeg) that the real probability could be materially lower than 15.5%. Given the low trading volume and shallow liquidity, the observed price could just as well reflect a small number of cautious traders or uncertainty about oracle mechanics rather than a consensus informed mispricing.

5) EXPECTED VALUE CALCULATION (heuristic)
- My best‑effort assessment:
  - Strength of evidence that the market is overpriced (i.e., true depeg chance materially <15.5%): ~40%. (There is reasonable public evidence for backing and exchange support, but gaps remain and newness matters.)
  - Plausible magnitude of mispricing if true: I estimate the fair probability might be ~6–10% (a mid estimate ~8%), so mispricing magnitude = 15.5% − 8% ≈ 7.5 percentage points = 7.5 cents.
  - Expected value = Strength × Magnitude = 0.40 × 7.5 cents = 3.0 cents.
- I therefore report EXPECTED_VALUE ≈ 3.0 cents.

6) CONFIDENCE in this assessment
- I rate my confidence as medium. The situation is data‑limited (new coin, fast changes, some claims not fully auditable from public reporting) and market liquidity is low, so reasonable disagreement among informed traders is plausible.

Actionable takeaways (concise)
- If you consider trading this market, first confirm you correctly interpret the Pyth/TradingView resolution rule (24‑hour all‑1m‑highs < $0.98) and examine recent Pyth 1m history for USD1 to see whether any near‑misses occurred. ([docs.pyth.network](https://docs.pyth.network/price-feeds/core/push-feeds/aptos?utm_source=openai))
- Because the market is low volume and shallow, any position should be sized small relative to your portfolio unless you can get additional, timely on‑chain or reserve‑audit evidence that meaningfully changes the posterior probability.

EXPECTED_VALUE: 3.0

SUMMARY: USD1 is a recently launched, exchange‑listed dollar stablecoin and Pyth publishes a USD1/USD feed used by TradingView for resolution; public reporting shows backing claims and heavy early adoption but not a documented 24‑hour depeg so far. Given newness, concentrated issuance and oracle/operational risks, a nonzero depeg probability is reasonable, but current public evidence does not prove a clear >7‑10 cent mispricing — expected investigatory value ≈ 3.0 cents.

CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [Trump’s World Liberty Financial jumps into stablecoin game with USD1 reveal](https://www.cnbc.com/2025/03/25/trumps-world-liberty-financial-jumps-into-stablecoin-game-with-usd1-reveal.html)
**Author:** Jean Fogel / CNBC (page shows CNBC author metadata; if multiple authors display on page, CNBC is primary) | **Published:** 2025-03-25

CNBC reports on the launch of USD1 by World Liberty Financial, describing the issuer’s public claim that USD1 will be backed by short‑term U.S. treasuries, U.S. dollar deposits and cash equivalents. The article is relevant because it establishes USD1’s stated reserve backing and framing (which decreases the baseline probability of a sustained depeg if true), and it documents mainstream financial coverage and commercial intent to integrate USD1 into major trading venues (supporting the argument that on‑ and off‑ramps exist). This source supports the view that USD1 has credible backing claims and exchange integration, which argues against very high depeg probabilities, but it does not independently verify reserve audits or redemption plumbing (so it does not eliminate tail risk).

### [USD1 Is Now Live On Solana (Cointelegraph)](https://cointelegraph.com/news/trump-backed-usd1-is-now-the-seventh-largest-stablecoin-worldwide//)
**Author:** Unknown (Cointelegraph article author metadata not shown in search snippet) | **Published:** 2025-05-XX (publication month visible in snippet; exact date on page)

Cointelegraph documents USD1’s rapid growth and lists it among the larger stablecoins shortly after launch, noting exchange listings and rapid minting. This is relevant because it corroborates rapid adoption/liquidity growth which reduces the plausibility of an immediate depeg, but it also highlights concentration and fast mint events that can increase systemic risk if counterparties act or if redemptions concentrate — supporting both bullish and bearish interpretations depending on credibility of backing and redemption mechanisms.

### [Live stock, index, futures, Forex and Bitcoin charts on TradingView (PYTH:USD1USD)](https://www.tradingview.com/chart/?symbol=PYTH%3AUSD1USD)
**Author:** Unknown | **Published:** Unknown

TradingView exposes PYTH:USD1USD as a chartable symbol (the market’s specified resolution path). This is directly relevant because the prediction market resolves based on Pyth 1‑minute candle Highs as shown via TradingView. It confirms the market’s resolution mechanism is operationally tied to Pyth data surfaced on TradingView; therefore oracle availability/behavior and TradingView representation are central to whether a 24‑hour all‑below‑$0.98 condition could be observed or could fail to reflect off‑chain realities.

### [on Aptos | Pyth Developer Hub (Price Feeds / Aptos)](https://docs.pyth.network/price-feeds/core/push-feeds/aptos)
**Author:** Unknown | **Published:** Unknown (docs page; updated in 2025 per site metadata)

Pyth’s developer documentation lists available price feeds on Aptos and shows a USD1/USD feed entry (including feed id and update heartbeat). This is high‑value technical evidence confirming that Pyth maintains a USD1/USD price feed (the exact oracle used by the market) and provides details about update frequency/publisher behavior — essential to understanding how the 1‑minute candle data is sourced and whether oracle mechanics could affect a resolution event.

### [Trump-Backed World Liberty Gets Coinbase Approval With USD1 Stablecoin Listing (Yahoo/Finance)](https://finance.yahoo.com/news/trump-backed-world-liberty-gets-212741844.html)
**Author:** Unknown | **Published:** 2025-06-XX (publication month visible in snippet; exact date on page)

This item reports that Coinbase added USD1 for trading/support, confirming major centralized exchange acceptance. This supports the inference that USD1 has on‑ and off‑ramps and central liquidity, which tends to reduce the probability of a prolonged price fall under $0.98 — but it does not guarantee reserve sufficiency or uninterrupted redemption, so it partly supports the argument that depeg risk should be low but not negligible.
