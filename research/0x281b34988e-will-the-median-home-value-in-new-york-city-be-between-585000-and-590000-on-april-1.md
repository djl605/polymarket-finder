# Research: Will the median home value in New York City be between $585,000 and $590,000 on April 1?

**Market ID:** 0x281b34988ece3f8bbad4a3c5b268363e9b0b436d5ca36f14311449f3f2fa33d2
**Researched At:** March 21, 2026 at 04:24:02 AM UTC
**Search Query:** "Will the median home value in New York City be between $585,000 and $590,000 on April 1?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 13.5¢

### Summary

Public, recent NYC price-series (PropertyShark and local reports) show citywide median and psf well above the $585–590k band that would be implied by Parcl’s index; absent a major short-term shock or an unexplained methodological divergence by Parcl, the market’s 25.5% YES probability looks too high. I estimate a true chance near ~3%, yielding an expected value ≈13.5 cents. ([propertyshark.com](https://www.propertyshark.com/mason/market-trends/residential/nyc-all))

### Full Analysis

Plan and scope
- I used the available web-search budget to (1) confirm the Parcl resolution target/identifier and Parcl methodology, (2) obtain recent, reputable market-level numbers for New York City median sale price and price-per-square-foot, and (3) check major local market reports (Manhattan) for context. Sources used: Parcl documentation/whitepaper, PropertyShark NYC market page, Miller Samuel Manhattan report, and a Redfin market summary. Key load-bearing facts below are cited.

1) CONTEXT ANALYSIS — what the market asks and how it resolves
- Market question: Will the median home value in New York City be between $585,000 and $590,000 on April 1, 2026?
- Resolution mechanics (from the market text): The settlement value = Parcl Labs Sales Price Index value for New York City (Parcl_ID 5372594), interpreted as price per square foot, multiplied by 1000 (the stated median home size). The Parcl market id for “New York City” is Parcl_ID 5372594 (Parcl docs). ([docs.parcllabs.com](https://docs.parcllabs.com/docs/parcl-labs-developer-quickstart-guide?utm_source=openai))
- So the market resolves YES if Parcl’s published price-per-sqft × 1000 ∈ [$585,000, $590,000], i.e., Parcl’s price-per-sqft would need to be roughly $585–$590. If Parcl publishes a price-per-sqft outside that band, the market resolves NO. (Tie rule: if the index falls exactly between brackets, the higher bracket wins — included in the market text.)

2) EVIDENCE EVALUATION — what the data say (both sides)
Key factual baseline (recent market numbers)
- PropertyShark’s NYC market page (monthly stats) shows for January 2026: citywide median sale price $770,000 and median price per sqft $888. That is equivalent to an implied median home value (price-per-sqft × 1000) of roughly $888,000 — well above the $585–590k bracket. The PropertyShark series also shows price-per-sqft has been in the high hundreds across 2024–2026 rather than near $585. ([propertyshark.com](https://www.propertyshark.com/mason/market-trends/residential/nyc-all))
- Manhattan-coverage reports (Miller Samuel) show Manhattan median sales prices and very high price-per-sqft levels (Manhattan medians well over $1M), supporting that at least one borough is much higher than the target band. ([millersamuel.com](https://millersamuel.com/files/2025/10/Manhattan-Q3_2025.pdf?utm_source=openai))
- Redfin national/monthly coverage shows early‑2026 US housing prices roughly flat-to-up regionally; for NYC-specific series different data vendors vary, but the major private-data vendors (PropertyShark, Miller Samuel, Redfin/Zillow-derived series) consistently report NYC medians in the many‑hundreds of thousands to >$700k range, not ~$585k. ([redfin.com](https://www.redfin.com/news/home-prices-rise-january-2026/?utm_source=openai))

Evidence that suggests the market YES price (i.e., price will be $585–590k) might be correct
- Possible measurement/coverage differences: data providers use different universes and methodology (e.g., Parcl says it uses many transaction types and dynamic weighting); the Parcl index could differ systematically from other private aggregators (Parcl’s documentation/whitepaper explains their alternative methodology and data coverage). If Parcl’s index uses a different transaction sample (e.g., includes more low-psf sales, co-op-only sales, or certain borough weighting), its published psf could be materially lower than some vendor medians. Parcl methodology documentation indicates they attempt a dynamic, transaction‑inclusive price feed (so divergence is possible). ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper?utm_source=openai))
- Seasonality or rapid short downward corrections: in a sharply deteriorating macro shock between now and April 1 a ~10–30% price move could be possible in extreme scenarios, and a distribution skew toward smaller/specific property types could temporarily depress Parcl’s index relative to other series. (No current authoritative evidence of such a crash exists in the sources reviewed.)

Evidence that suggests the market NO price (i.e., price will be outside that small $585–590k band) is reasonable
- Recent data show the citywide median sale price and median price-per-sqft are substantially above the band. PropertyShark reports Jan 2026 price-per-sqft ≈ $888 (implying ~$888k median using the 1000 sqft convention). That is ~50% above the target band, so Parcl would need to publish a materially lower index (a ~34% drop in psf) in about six weeks — a large move given recent month-to-month stability. ([propertyshark.com](https://www.propertyshark.com/mason/market-trends/residential/nyc-all))
- Borough-level dispersion: many NYC neighborhoods have medians far above $585k; even if lower‑priced boroughs (Bronx, parts of Queens/Staten Island) pull the city median down, the citywide median has been anchored well above $585k in recent data. This challenges the plausibility of the YES band without a large, rapid market move. ([propertyshark.com](https://www.propertyshark.com/mason/market-trends/residential/nyc-all))
- Parcl’s own methodology and data coverage (per their whitepaper) suggest the Parcl index is intended to be a comprehensive transaction-weighted measure and not an outlier aggregator; it would be surprising for Parcl to publish a PSF ~34% below other vendors with similar transaction coverage absent a real underlying move. ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper?utm_source=openai))

Source credibility and recency
- PropertyShark (market page) is a reputable real‑estate data vendor with monthly market pages; the cited page explicitly shows Jan 2026 values and is a high‑relevance, recent data point for monthly medians. Credibility: medium–high for market-level medians; recency: Jan 2026 (very recent). ([propertyshark.com](https://www.propertyshark.com/mason/market-trends/residential/nyc-all))
- Miller Samuel (local appraisal/research firm) is an established, credible NYC market tracker for Manhattan-specific metrics (high credibility for borough-level context). Recency: late‑2025 / early‑2026 reporting. ([millersamuel.com](https://millersamuel.com/files/2025/10/Manhattan-Q3_2025.pdf?utm_source=openai))
- Parcl documentation / whitepaper: primary source for the index identifier, method, and how Parcl constructs price feeds. Credibility: primary for how Parcl works, medium for predictive accuracy (it documents their approach). Recency: documentation is current as Parcl updates docs; useful for understanding potential methodological differences. ([docs.parcllabs.com](https://docs.parcllabs.com/docs/parcl-labs-developer-quickstart-guide?utm_source=openai))
- Redfin (news article) is a recognized national market tracker; useful for national context but less directly authoritative for citywide medians than PropertyShark or Parcl. ([redfin.com](https://www.redfin.com/news/home-prices-rise-january-2026/?utm_source=openai))

Skepticism about the “obvious” reading
- If the market’s YES price (25.5% probability) were correct, one would expect either (a) a clear downward trend in multiple vendor indices toward ~$585k, or (b) plausible methodological reasons why Parcl’s index would be far below other vendors. I found no multi-vendor signal of a sudden crash or strong methodological reason for Parcl to be ~34% lower than PropertyShark’s January number. That weakens the “YES” case.

3) MARKET EFFICIENCY ANALYSIS — can the current market price be justified?
- The market is low-volume with a tight spread. That pattern often indicates one or a few informed or confident traders set a price and liquidity is thin. Total volume $1,409 and price 25.5% suggests limited participation; a tight spread implies the market creator or a liquidity provider set a narrow bid/ask rather than broad, active betting.
- Reasonable interpretations that justify 25.5%:
  - Traders may be pricing in non-negligible tail risk (a large negative shock to NYC sales/mix between now and April 1 or an index‑specific data anomaly) and therefore assign a modest chance to a much-lower Parcl psf.
  - Traders might believe Parcl’s index historically runs lower than other vendors (or weights lower‑psf transactions more heavily). Parcl does use a different methodology which could create divergence; some traders could be factoring this in. ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper?utm_source=openai))
- Counterpoint: absent new information between now and April 1, the balance of evidence from recent vendor medians makes a ~25% chance that Parcl’s published citywide psf × 1000 lands in $585–590k seem high.

4) MISPRICING ASSESSMENT — weighing the evidence
- Given the evidence, the more plausible outcome is NO (the median will be above the $585–590k band). PropertyShark’s Jan 2026 price-per-sqft ≈ $888 (implying ~$888k) is the most directly comparable public figure; Parcl would need to publish an index ~34% lower in six weeks to resolve YES. That is a large move to expect without clear drivers. ([propertyshark.com](https://www.propertyshark.com/mason/market-trends/residential/nyc-all))
- Possible missing information that could justify the current 25.5%:
  - Parcl-specific idiosyncrasies (their sample and weighting) could be materially lower than PropertyShark — Parcl’s docs show methodological differences but do not demonstrate a consistent ~30% systematic gap. ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper?utm_source=openai))
  - Data publication timing / adjustments (if Parcl’s April 1 feed could reflect a narrower sample or reporting lag that pulls the published psf down). The market’s fallback rule (use most recent publication if April 1 data not released by April 10) reduces some operational risk, but does not make a large downward jump likely.
- Conclusion on mispricing: There is credible evidence the market over-states the probability of the median being that low. I estimate the market is likely overpricing the YES side by a substantial amount (see expected-value calc below), though absolute certainty is not possible because the final resolution depends on Parcl’s April 1 publication and Parcl’s exact sample/algorithm.

CRITICAL CHECK (challenge reasoning)
- Do I understand resolution exactly? Yes — Parcl_ID 5372594; settlement = psf × 1000. ([docs.parcllabs.com](https://docs.parcllabs.com/docs/parcl-labs-developer-quickstart-guide?utm_source=openai))
- Could I be missing Parcl-specific quirks that make its psf much lower? Parcl’s whitepaper documents methodological differences; they could produce different levels, but I found no public evidence that Parcl’s citywide psf routinely sits ~30–40% below other vendors' medians in recent months. ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper?utm_source=openai))
- Most charitable view of informed traders: assigning ~25% chance could reflect conservatism about short-term shocks or a belief in index divergence. Those are plausible, but the objective data favor the NO outcome.

5) EXPECTED VALUE CALCULATION (estimate of value from betting on mispricing)
- Market price for YES: 25.5 cents (25.5%)
- My point estimate of “true” probability that Parcl’s published psf×1000 will fall in $585–590k: I estimate about 3% (0.03). Rationale: most public vendors show city medians well above $700k–$900k; absent extreme shock or a large Parcl methodological gap >30%, the chance is small. (This is an expert judgment informed by the data cited above.)
- Magnitude of mispricing (in cents) = market price − my estimated true probability = 25.5 − 3 = 22.5 cents.
- Strength of evidence (how confident I am that the true probability is near my estimate): I assess this at about 60% (there is solid recent public data, but Parcl-specific unknowns leave room for surprise).
- Expected value = Strength × Magnitude = 0.60 × 22.5 = 13.5 cents.

6) CONFIDENCE in this assessment
- medium

Final concise judgement
- The public, recent citywide data (PropertyShark and local broker/appraiser reports) indicate price-per-sqft and medians much higher than the $585–590k target band, making the YES outcome unlikely without a large, short-term shock or an unexplained Parcl-vendor divergence. The market’s 25.5% YES probability appears to overstate the chance that Parcl will publish a psf low enough to place the median at $585–590k; I estimate the true chance is low (≈3%). That implies a material mispricing in favor of the NO side, with an expected value of roughly 13.5 cents per share given my strength/confidence estimate.

EXPECTED_VALUE: 13.5
SUMMARY: Public, recent NYC price-series (PropertyShark and local reports) show citywide median and psf well above the $585–590k band that would be implied by Parcl’s index; absent a major short-term shock or an unexplained methodological divergence by Parcl, the market’s 25.5% YES probability looks too high. I estimate a true chance near ~3%, yielding an expected value ≈13.5 cents. ([propertyshark.com](https://www.propertyshark.com/mason/market-trends/residential/nyc-all))
CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [Quickstart — Parcl Labs Developer Quickstart Guide](https://docs.parcllabs.com/docs/parcl-labs-developer-quickstart-guide)
**Author:** Unknown | **Published:** Unknown

This developer quickstart documents Parcl’s API search endpoint and returns the Parcl identifiers for markets; it explicitly shows the entry for “New York City” with parcl_id 5372594. This is directly relevant because the market resolves to the Parcl Labs Sales Price Index for New York City (Parcl_ID 5372594) and the settlement calculation uses Parcl’s published price-per-square-foot. I used this to confirm the exact resolution target (Parcl_ID) and that Parcl is the primary data source for settlement. ([docs.parcllabs.com](https://docs.parcllabs.com/docs/parcl-labs-developer-quickstart-guide?utm_source=openai))

### [Parcl Labs Price Feed Whitepaper - Parcl Labs: Real-Time Real Estate Analytics & Intelligence](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper)
**Author:** Unknown | **Published:** Unknown

Parcl’s whitepaper describes the methodology behind their Price Feed / Sales Price Index, emphasizing inclusion of many transaction types, dynamic adjustment to transaction velocity/volume, and how their index is constructed. This source is relevant because it explains how Parcl’s index might diverge from other vendors (methodological differences that could, in principle, produce a different psf level). It supports the possibility of index divergence but does not provide evidence that Parcl’s citywide psf should be ~30% lower than other vendors in early 2026. ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper?utm_source=openai))

### [NYC Real Estate Market Trends — Market Overview for January, 2026](https://www.propertyshark.com/mason/market-trends/residential/nyc-all)
**Author:** Unknown | **Published:** 2026-01-01

PropertyShark’s NYC market overview page shows monthly market metrics; for January 2026 it reports a citywide median sale price of $770,000 and a median price per square foot of $888. The page provides a time series (2016–2026) that shows price-per-sqft in the high hundreds across recent months. This is a central empirical input: if Parcl’s April 1 value is similar to other vendors’ recent numbers, the settlement value implied by Parcl would be ~ $888k (psf × 1000), far above the $585–590k band. That strongly weighs against the YES outcome. ([propertyshark.com](https://www.propertyshark.com/mason/market-trends/residential/nyc-all))

### [Manhattan, NY Sales (Q3‑2025) — Miller Samuel report](https://millersamuel.com/files/2025/10/Manhattan-Q3_2025.pdf)
**Author:** Miller Samuel | **Published:** Unknown

Miller Samuel’s Manhattan reports provide borough-level appraisal and market statistics (median sales price, price-per-sqft trends). Their Manhattan median sales price and price-per-sqft levels are materially higher than the target band; this reinforces that at least the Manhattan component of the citywide distribution is far above $585k. This source helps show the distributional skew within NYC (Manhattan especially) and why the citywide median is unlikely to drop to the target band absent a large shock. ([millersamuel.com](https://millersamuel.com/files/2025/10/Manhattan-Q3_2025.pdf?utm_source=openai))

### [Home Prices Start Year Up Just 1% as Buyer’s Market Caps Growth (Redfin News, January 2026)](https://www.redfin.com/news/home-prices-rise-january-2026/)
**Author:** Unknown | **Published:** Unknown

Redfin’s January 2026 housing market summary provides context on national and selected metro price trends at the start of 2026. It shows modest national changes and that metro-level outcomes vary; used here mainly for context rather than for the citywide NYC median figure. The Redfin piece supports the interpretation that, absent an extreme shock, prices in early 2026 were generally stable-to-slightly-up at national/metropolitan levels — making a sudden ~30% citywide PSF drop by April 1 unlikely. ([redfin.com](https://www.redfin.com/news/home-prices-rise-january-2026/?utm_source=openai))
