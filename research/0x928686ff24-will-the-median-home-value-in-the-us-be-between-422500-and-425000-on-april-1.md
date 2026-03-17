# Research: Will the median home value in the US be between $422,500 and $425,000 on April 1?

**Market ID:** 0x928686ff24dab4fc029e11a4812286a600131c1a81523e00ec5ff296a959108b
**Researched At:** March 17, 2026 at 05:36:34 AM UTC
**Search Query:** "Will the median home value in the US be between $422,500 and $425,000 on April 1?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 14.0¢

### Summary

NAR’s most recent published median existing-home price (Feb 2026 ~$398k) is well below this market’s target band ($422.5–425k), which suggests the market’s 72% YES looks optimistic. However, Parcl’s price feed (the official resolver) measures median $/sqft and includes listings and new construction; that feed can plausibly produce a higher implied median when multiplied by 2000. I could not retrieve Parcl’s USA $/sqft numeric reading from public docs in these searches, so the decisive datum is m

### Full Analysis

Plan and constraints
- I have three web-search calls budgeted and used to (1) verify how the market resolves (Parcl Labs feed + formula), (2) collect recent, authoritative national home-price data, and (3) read Parcl’s methodology/coverage so I can judge differences between Parcl’s metric and standard published medians. I could not find a publicly-viewable single Parcl “USA price per sqft” value in their public docs/dashboards during these searches (the Parcl feed/API exists but appears accessible via their product/app). The analysis below therefore uses (A) the market’s explicit resolution rule, (B) Parcl documentation about what the index measures and how it differs from conventional medians, and (C) the most recent national median home-price releases from the National Association of REALTORS® (NAR) to form a reasoned view about mispricing.

1) CONTEXT ANALYSIS
- Market question: Will the median home value in the US be between $422,500 and $425,000 on April 1, 2026?
- Resolution rule (from the market): Parcl Labs Sales Price Index (Parcl_ID: 5826765) “price per square foot” × 2000 (market’s stated median square footage) will be used; if Parcl publishes on April 1, 2026 that value determines resolution; if not published by April 10, 2026 the most recently published Parcl value is used.
- Critical arithmetic: For this market to resolve YES, Parcl’s published “price per square foot” on April 1 must be between:
  - Lower bound: $422,500 / 2000 = $211.25 per sqft
  - Upper bound: $425,000 / 2000 = $212.50 per sqft
- So the decisive quantity is Parcl’s USA median price-per-sqft on April 1, 2026; everything else is indirect evidence.

2) EVIDENCE EVALUATION (what I found and what it implies)
A. Direct resolution-source facts / methodology (why Parcl may differ from standard medians)
- Parcl’s Price Feed is a daily-updated indicator that reports median price per square foot (their PLPF), built from aggregated public property records, listings, and sales (it explicitly covers new construction, repeated sales, listings and sales across property types). Parcl’s feed is the stated resolution source for this market; the market’s conversion (×2000) is explicit in the rules. ([help.parcl.co](https://help.parcl.co/getting-started/nxKkvMYVGNLScHEvioJKJe/parcl-labs-price-indexes/gg9BCUiDD5J9zLXzGGyVd3?utm_source=openai))
  - Implication: Parcl’s per-sqft number can differ meaningfully from the commonly-cited “median existing-home sale price” (NAR) because Parcl’s universe includes new-construction and listing data and it reports a per-sqft metric rather than a simple dollar median of transaction prices. That difference alone can shift the implied national median (when multiplied by 2000) by several thousand dollars.

B. Recent authoritative national median numbers (benchmark)
- NAR (Existing-Home Sales) reported a median existing-home price for February 2026 of about $398,000 (NAR press release/summary) — substantially below the market’s target bracket (422.5–425k). NAR’s quarterly report for Q4 2025 reported a national median single-family existing-home price near $414,900 (Q4 2025), which is closer but still below the market bracket. These are mainstream, high-credibility benchmarks for existing-home transactions. ([globenewswire.com](https://www.globenewswire.com/news-release/2026/03/10/3253010/0/en/NAR-Existing-Home-Sales-Report-Shows-1-7-Increase-in-February.html?utm_source=openai))
  - Implication: If Parcl’s per-sqft number mapped to a median home value consistent with NAR’s recent medians, the market’s YES probability (72%) looks high — NAR’s February and Q4 figures imply values below the $422–425k band. For example, $398,000 / 2000 = $199/sqft (well below the $211–212.5/sqft cutoff).

C. Parcl’s own coverage and possible deviations
- Parcl emphasizes daily updates, inclusion of listings and new construction, and a different metric (median $/sqft). Parcl’s whitepaper and product notes further explain that its feed can track different mixes of transaction types and may diverge from single-family-only indices like Case-Shiller or FHFA. Parcl has published analyses showing regional volatility and quarter-to-quarter differences. I could not find a public single-number “Parcl USA $/sqft for March 2026” in the public docs during these searches (their feed/API and app appear to be the place that number is published). ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper?utm_source=openai))
  - Implication: Because Parcl’s metric and universe differ from NAR’s existing-home median, the market could be pricing a Parcl-specific reading that is higher than NAR’s existing-home median. That is a plausible explanation for the market’s 72% YES price even though NAR medians are lower.

D. Specific evidence that suggests the market price might be incorrect
- NAR’s February 2026 median = ~$398k (credible, recent). If Parcl’s index were to map closely to existing-home medians, the probability of a $422.5–425k reading on April 1 looks low; this supports the view that the market’s 72% YES is an overestimate unless Parcl’s metric is materially higher. ([globenewswire.com](https://www.globenewswire.com/news-release/2026/03/10/3253010/0/en/NAR-Existing-Home-Sales-Report-Shows-1-7-Increase-in-February.html?utm_source=openai))
- Parcl’s public materials indicate their dataset includes listings and new construction which can push $/sqft higher than existing-home medians in some periods, but the precise Parcl USA per-sqft value for late March / Apr 1 — which is the decisive datum — was not retrievable from the public docs in my search window. The absence of that number in public docs is important: without that Parcl datapoint we cannot definitively say the market is wrong. ([help.parcl.co](https://help.parcl.co/getting-started/nxKkvMYVGNLScHEvioJKJe/parcl-labs-price-indexes/gg9BCUiDD5J9zLXzGGyVd3?utm_source=openai))

E. Evidence that supports the market price as reasonable
- Parcl’s metric methodology (daily $/sqft including new builds & listings) could produce a national per-sqft figure in the $211–212.5 range even when NAR’s existing-home median is near $398k; differences in sample composition (e.g., inclusion of higher-priced new construction and listings) and the per-sqft metric can explain several-thousand-dollar differences in implied median value. Parcl’s documentation explicitly warns that its measure differs from single-family existing-sales medians. ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper?utm_source=openai))
- Parcl’s historic comparisons and correlation analyses (Parcl materials) indicate the feed tracks conventional indices reasonably well in trend terms, but absolute levels can diverge. That means an informed trader with access to Parcl’s API or app might reasonably expect Apr 1 Parcl ×2000 to be in the target band even if NAR medians are lower. ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-usa-update?utm_source=openai))

Source credibility & recency
- NAR (Existing-Home Sales press release, March 10, 2026) — high credibility, directly relevant to recent median prices. ([globenewswire.com](https://www.globenewswire.com/news-release/2026/03/10/3253010/0/en/NAR-Existing-Home-Sales-Report-Shows-1-7-Increase-in-February.html?utm_source=openai))
- Parcl documentation/whitepaper/API pages — primary source for resolution methodology and data-universe; high credibility for describing what the Parcl feed measures, but not a replacement for the actual numeric feed value. Parcl docs are recent and explicitly describe daily updates. ([help.parcl.co](https://help.parcl.co/getting-started/nxKkvMYVGNLScHEvioJKJe/parcl-labs-price-indexes/gg9BCUiDD5J9zLXzGGyVd3?utm_source=openai))

3) MARKET EFFICIENCY ANALYSIS
- Reasonable interpretation(s) that justify the 72% price:
  - Traders with direct access to Parcl’s app/API might observe recent Parcl USA $/sqft close to or inside $211.25–$212.50 — that would rationally justify a high YES probability. Parcl’s metric routinely differs from existing-home medians because of coverage differences; if traders are working from Parcl’s live feed they may have reason to price YES at 72%.
  - Alternatively, traders might be extrapolating a rising trend (Parcl daily feed) into April 1 and pricing for continuation of that trend.
- Reasons this could instead reflect poor aggregation / illiquidity:
  - Total volume on this market is very low ($237) and the spread tight (4¢). Low volume + tight spread often means a small number of active traders set the price and it can stick until challenged. That raises the chance the price reflects one or a few beliefs, not broad information aggregation.
  - The inability (in my searches) to find a single publicly-accessible Parcl USA $/sqft value means outside traders without Parcl access may be trading based on secondary sources or intuition; that can leave room for mispricing if Parcl data trends unexpectedly near April 1.
- Verdict on reliability: ambiguous. If active traders are using the actual Parcl feed, the price could be a good reflection of the true Parcl value. If they are not, the price could be built on weaker signals and be fragile.

4) MISPRICING ASSESSMENT (weighing evidence)
- What would convince me the market is mispriced? Finding that Parcl’s USA $/sqft on or just before Apr 1 is materially below $211.25 (i.e., when multiplied by 2000 gives <$422,500) would indicate the market is overpriced. Conversely, if Parcl’s feed is at or above $211.25 on Apr 1, the market is fairly or undervalued.
- Available evidence leans toward the market being optimistic (i.e., YES overpriced relative to common published median measures): NAR’s Feb 2026 median ($398k) is substantially below the market’s target band. But Parcl’s metric and scope can reasonably produce a higher implied median — and I could not retrieve Parcl’s actual numeric feed value for the relevant date in the public docs during these searches. That missing decisive datum prevents a conclusive finding.
- Given the low market volume, a precautionary conclusion is: there is credible reason to doubt the market (because mainstream medians are lower), but there is also a plausible, readily-explainable reason for the market price (Parcl’s different metric and composition). Without the Parcl per-sqft number itself, I cannot confidently claim a >20¢ mispricing.

5) EXPECTED VALUE CALCULATION
- Strength of evidence (that the market is overpriced): moderate — I judge ~40%. Rationale: NAR’s Feb 2026 median is authoritative and materially below the band, but Parcl’s differing metric and my inability to fetch the Parcl-USA per-sqft value reduce confidence.
- Magnitude of mispricing (if genuine): I estimate a plausible mispricing magnitude of ~35 cents (i.e., market at 72¢ but a fair price closer to ~37¢ if the fair chance of hitting the band were ~37%). This is an illustrative central estimate: if Parcl follows NAR-like medians the YES probability should be low; if Parcl is higher, the market is fair.
- Expected value = Strength × Magnitude = 40% × 35¢ ≈ 14¢ (I calculate 14.0 cents).
EXPECTED_VALUE: 14.0

6) CONFIDENCE IN ASSESSMENT
- My confidence: medium — the analysis is limited by the inability (within the allowed searches) to fetch the Parcl USA per-sqft number for late March/Apr 1. If you can supply the Parcl Labs USA feed value (price-per-sqft) for April 1, 2026 or the latest published Parcl USA $/sqft just before April 1, I can immediately convert and give a definitive mispricing conclusion.

SUMMARY: NAR’s most recent published median existing-home price (Feb 2026 ~$398k) is well below this market’s target band ($422.5–425k), which suggests the market’s 72% YES looks optimistic. However, Parcl’s price feed (the official resolver) measures median $/sqft and includes listings and new construction; that feed can plausibly produce a higher implied median when multiplied by 2000. I could not retrieve Parcl’s USA $/sqft numeric reading from public docs in these searches, so the decisive datum is missing — the market may be mispriced, but I cannot prove it without the Parcl per-sqft value. CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [Parcl Labs Price Indexes – Help Center | Parcl](https://help.parcl.co/getting-started/nxKkvMYVGNLScHEvioJKJe/parcl-labs-price-indexes/gg9BCUiDD5J9zLXzGGyVd3)
**Author:** Unknown | **Published:** 2024-07-19

Parcl’s help documentation explains the Parcl Labs Price Indexes: daily-updated median price per square foot metrics derived from aggregated public property records, listings and county records. It describes that the feed updates every 24 hours and that the index reports median $/sqft for markets including the USA. This source is relevant because the market’s resolution uses Parcl’s median $/sqft × 2000; the doc supports the point that Parcl’s metric is a different construct from standard median-dollar measures (so Parcl can legitimately produce different absolute levels).

### [Price Feed (Parcl Labs API documentation)](https://docs.parcllabs.com/reference/price-feed)
**Author:** Unknown | **Published:** Unknown

Parcl’s API docs outline the Parcl Labs Price Feed (PLPF), its daily refresh, coverage across property types, and that it reports median price-per-square-foot (with history back to 2010 for sales/listings). This is a primary technical description of the resolver used by the market; it explains why Parcl’s feed could differ in level from NAR/Case-Shiller (different universe, $/sqft metric, inclusion of listings/new builds). The API docs also imply the actual numeric feed is published via app/API (i.e., the value that resolves the market is obtainable from Parcl’s product rather than only from static web pages).

### [Parcl Labs Price Feed Whitepaper - Parcl Labs](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper)
**Author:** Unknown | **Published:** Unknown

The Parcl whitepaper describes the PLPF methodology in depth, including which transactions are included (repeated sales, new builds, listings) and how the index is intended to be used. It explicitly notes the index is a per-square-foot metric and discusses differences from other indices that restrict to single-family repeat-sales. This supports the interpretation that Parcl’s implied median (×2000) can reasonably diverge from conventional median sale-price measures and therefore could justify a higher market probability if traders are reading Parcl’s feed directly.

### [NAR Existing-Home Sales Report Shows 1.7% Increase in February (press release)](https://www.globenewswire.com/news-release/2026/03/10/3253010/0/en/NAR-Existing-Home-Sales-Report-Shows-1-7-Increase-in-February.html)
**Author:** Unknown (National Association of REALTORS® press release) | **Published:** 2026-03-10

NAR’s March 10, 2026 report states that existing-home sales increased 1.7% in February and reports a median existing-home price of approximately $398,000 for February 2026 (up ~0.3% year-over-year). This is a high-credibility, recent benchmark of transaction medians for existing homes; when converted to per-square-foot (using the market’s 2000 sqft assumption), it implies ~$199/sqft — well below the $211.25–$212.50/sqft required for the market to resolve YES. This supports the view that the market’s 72% YES is optimistic unless Parcl’s feed diverges upward from NAR’s existing-home median.

### [Home prices increased in 73% of metro areas in fourth quarter of 2025 (NAR quarterly report)](https://www.nar.realtor/newsroom/home-prices-increased-in-73-of-metro-areas-in-fourth-quarter-of-2025)
**Author:** Unknown (NAR newsroom) | **Published:** 2026-02-04

NAR’s Q4 2025 report gives a national context showing the national median single-family existing-home price ~ $414,900 for Q4 2025 (year-over-year +1.2%). This figure is closer to but still below the market band; it underlines that conventional published medians have been below $422k–$425k recently, strengthening the case that the market’s YES probability is at least optimistic relative to commonly-cited medians — again subject to the caveat that Parcl’s feed and compositional differences can change the mapping.
