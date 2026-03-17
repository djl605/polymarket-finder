# Research: Will the median home value in the Los Angeles Metro area be between $1,175,000 and $1,180,000 on April 1?

**Market ID:** 0x403beed817b17e169d3c13907e6f9567425d91af29ecf86b5f13e9b4e1fe56dd
**Researched At:** March 17, 2026 at 05:37:12 AM UTC
**Search Query:** "Will the median home value in the Los Angeles Metro area be between $1,175,000 and $1,180,000 on April 1?"

---

## AI Analysis

**Confidence:** Low
**Expected Value:** 1.8¢

### Summary

I found credible primary documentation on how Parcl computes its price‑per‑square‑foot feed and corroborating third‑party signals (Altos, market trackers) that put Los Angeles PPSF in the mid‑to‑high hundreds, so the contract’s implied PPSF band (~$618.4–$621.05/sqft) is plausible. But the market has zero volume and the band is extremely narrow; without the actual Parcl PPSF time series for the days around Apr 1 (the single decisive datum) there is insufficient evidence to assert a large mispric

### Full Analysis

Planned approach (brief): I checked Parcl’s methodology and recent Parcl/third‑party price‑per‑square‑foot (PPSF) signals for Los Angeles, and authoritative published median price series (CAR) and listing analytics (Altos/Redfin) to judge whether the Polymarket-style market’s YES price (36.5%) for the narrow $1,175,000–$1,180,000 bracket is plausibly mispriced. I focused on (a) the exact resolution rule (Parcl price × 1900 sf), (b) likely Parcl PPSF levels around Mar–Apr 2026 and their volatility, and (c) how plausible it is that the Parcl index will land in that very narrow range on Apr 1.

1) CONTEXT ANALYSIS
- Exact market question: Will the median home value (all property types) in the Los Angeles Metro area be between $1,175,000 and $1,180,000 on April 1, 2026?
- Exact resolution rule (from the market description): settlement = (Parcl Labs published price index value on Apr 1, measured as price per square foot) × 1900 (median home size). If Parcl publishes no Apr 1 data by Apr 10 11:59PM ET, the market resolves to the most recently published data. Source: Parcl / market description.
- Implied Parcl PPSF range for YES:
  - Lower bound = $1,175,000 / 1900 = $618.421.../sqft
  - Upper bound = $1,180,000 / 1900 = $621.0526.../sqft
  - So YES = Parcl PPSF ∈ [$618.42, $621.05]. That is a very tight ~$2.63/sqft band (≈0.4% of a ~620 level).
- What must happen for YES: the Parcl Labs PPSF for the LA metro published for Apr 1 must fall inside that narrow $618.42–$621.05/sqft window (or, if no Apr 1 feed is published, the most recent published PPSF must be in that window).

2) EVIDENCE EVALUATION (relevant items, credibility, recency)
A. Evidence that the price might be reasonable / YES plausible
- Parcl Labs price‑feed methodology and recent Parcl commentary: Parcl’s Price Feed is a daily PPSF estimate for MSAs; Parcl has documented that PPSF for Los Angeles has risen materially since 2019 and has been in the mid‑to‑high hundreds per sqft (their analyses show large increases and relatively small short‑term vol). Parcl’s papers describe smoothing and percentile filtering that make the index less noisy than raw transaction PPSF. (Parcl whitepaper; Parcl articles — credible primary source for how Parcl computes the index; recent.) This implies the Parcl PPSF can plausibly be in the low‑to‑mid 600s. ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper))
- Third‑party listing analytics (Altos Research): Altos reports median listing PPSF for Los Angeles County ≈ $685/sqft on Mar 17, 2026 (Altos uses live listing data; listing PPSF is often higher than sales PPSF but shows the same scale). A PPSF in the high 600s makes the Parcl range ~618–621 plausible (Parcl is a sales PPSF, typically somewhat lower than listing PPSF). Altos is a reputable realtime listing analytics vendor and the figure is current (Mar 17, 2026). ([altos.re](https://altos.re/r/2fb00d36-4075-4953-8b62-7aa239f7ddbd))
- Independent market reports & trackers (PropertyMakler, Redfin historical PPSF): multiple market trackers show LA PPSF in the 600s in 2024–25 and the presence of peak values in the 660–690 range in 2025 in some sources; this supports the idea the Parcl PPSF could be around ~620. These are secondary sources and vary in methodology, but they corroborate the order of magnitude. ([propertymakler.com](https://propertymakler.com/research/Los-Angeles-Long-Beach-Anaheim-CA-MSA-Housing-Market/?utm_source=openai))

B. Evidence that the price might be incorrect / NO plausible
- California Association of Realtors (CAR) median sold price for Los Angeles Metro (Dec 2025): CAR’s median sold price for existing single‑family homes in the Los Angeles Metro was ~$807,540 (Dec 2025 release). If you divide that by the market’s 1900 sf median size you get ≈ $425/sqft — much lower than the ~$618–621 implied by the YES band. CAR is an authoritative source for sold median price (but it covers existing single‑family homes only and uses a different methodology and geography definition). That discrepancy argues caution: different data definitions can yield very different implied PPSF. ([mls.car.org](https://mls.car.org/en/aboutus/mediacenter/newsreleases/2026releases/dec2025sales))
- The YES range is extremely narrow (≈$2.63/sqft or ≈$5,000 on the total price). Even if Parcl’s PPSF is near 620, the chance a smoothed daily index will fall into that specific $2.6 window on a particular day is modest; markets for single daily index points with very low trading volume are often priced by a liquidity provider or not at all. This is a structural concern (not a single‑source fact) suggesting the 36.5% market price could just reflect an arbitrary anchor or lack of informed participation rather than a well‑arbitraged true probability.
- Parcl’s smoothing/filtering (35–65 percentile capture, moving medians, backprop windows) reduces short‑term volatility — that makes large day‑to‑day jumps unlikely, but also means the value on Apr 1 will be close to recent days’ values. Without the publicly available, exact Parcl PPSF on the days just before Apr 1 we cannot definitively say the market is mispriced. Parcl is credible about smoothing; this cuts both ways (less noise = less chance of hitting a tiny band, but if the central level is already in the band, hitting it is plausible). ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper))

Source credibility & recency
- Parcl Labs (whitepaper, blog): primary source on how the index is computed; authoritative for interpreting what the Parcl index measures and smoothing that affects daily variation; recent. ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper))
- CAR (California Assn. of Realtors) December 2025 release: authoritative, recent, but measures a different statistic (median sold price of existing single‑family homes) and may not match Parcl’s all‑property PPSF×1900 calculation. ([mls.car.org](https://mls.car.org/en/aboutus/mediacenter/newsreleases/2026releases/dec2025sales))
- Altos Research (Mar 17, 2026 dashboard): current listing PPSF data; good indicator of listing market scale though not identical to Parcl sales PPSF. ([altos.re](https://altos.re/r/2fb00d36-4075-4953-8b62-7aa239f7ddbd))
- PropertyMakler / Redfin / other trackers: supplemental corroboration of PPSF magnitude (variable methodology); useful for cross‑checks but less authoritative than Parcl/CAR/Altos. ([propertymakler.com](https://propertymakler.com/research/Los-Angeles-Long-Beach-Anaheim-CA-MSA-Housing-Market/?utm_source=openai))
- Polymarket market pages (examples): show a range of markets that rely on Parcl resolution; useful to confirm market mechanics but not for Parcl values themselves. (Polymarket is excluded as a primary evidence source per your instruction; I used it only for context.) ([polymarket.com](https://polymarket.com/es/event/what-will-the-median-home-value-in-the-los-angeles-metro-area-be-on-april-1?utm_source=openai))

3) MARKET EFFICIENCY ANALYSIS
- Interpretations that justify the current price (36.5% YES):
  - No trading (Total Vol $0) and a 5¢ spread indicate virtually no liquidity or engagement; the quoted price could simply be the creator’s opening price or a default book price with no market information behind it. In that case the price does not reflect an informed consensus.
  - Alternatively, the price could reflect a reasonable subjective assessment: Parcl PPSF may be in the low‑to‑mid 600s and the creator assigned ~36% chance to falling precisely into a ~0.4% wide band on Apr 1, which is plausible as a neutral but conservative probability.
- Could it represent consensus among informed traders? Unlikely: zero volume and narrow spread strongly imply no informed traders engaged. High‑quality traders would either provide liquidity or exploit any clear >20‑cent mispricing; they have not.
- Why low volume? Two plausible reasons:
  - The contract is so narrowly defined (tiny band) that only scalpers/arbitrageurs would trade it — many will avoid due to small payoff vs execution/settlement risk.
  - Informed traders may be waiting for the Parcl publish (Apr 1) or for the Parcl API value to be visible; traders who care will act when Parcl posts (or if they have an API feed).
- Overall reliability: low. The market’s price is a weak signal when volume = $0; the spread alone is not enough to infer correctness.

4) MISPRICING ASSESSMENT (weighing evidence)
- What would demonstrate a clear mispricing? A credible recent Parcl PPSF time series showing the Apr 1 value (or a stable level across late Mar 2026) that is well outside the [$618.42, $621.05] window — e.g., if Parcl’s recent daily PPSF is ~660 or ~580 with narrow daily volatility, that would strongly argue the market is mispriced. I could not find a direct public Parcl daily value for the specific Apr 1 target in the open pages I accessed; Parcl’s site documents methodology and trends but doesn’t (in the pages I could access) publish the exact numeric PPSF time series for that parcl_id in a static HTML table accessible without their app/API key.
- Available evidence suggests Parcl/other trackers have PPSF in the 600s (Altos listing PPSF 685, PropertyMakler/Redfin signals in 600s in 2024–25), which makes the YES band centered ~620 plausible. CAR’s single‑family median sold price (~$807k in Dec 2025) implies a much lower PPSF if divided by 1900, but CAR measures a different thing (single‑family sales only) and therefore is not directly comparable to Parcl’s all‑property PPSF.
- Given the lack of a direct, public Parcl PPSF value I can cite for late Mar 2026, I cannot point to a specific, credible piece of information that is clearly missing from the market price. The single strongest missing piece is the Parcl PPSF series for the LA parcl_id covering the days immediately before Apr 1 — that is the key datum traders would use to form a tight probability for hitting such a small band.
- Therefore: There is insufficient credible evidence to conclude a large (>20¢) mispricing. The price could be reasonable if Parcl’s PPSF central level is near 620, or it could be random/anchor if the creator set it and no one traded.

Critical check (self‑challenge)
- I verified the exact resolution mechanics (Parcl PPSF ×1900, Apr 1 feed, fallback Apr 10) and computed exact PPSF band. I considered alternative interpretations (different Parcl definitions, single‑family vs all types, listing vs sale PPSF). The main thing I may be missing is the actual Parcl numeric feed for the parcl_id in the days before Apr 1; without that, a definitive mispricing call is not credible. That is why I decline to say there is strong mispricing.

5) EXPECTED VALUE CALCULATION (value of investigating / trading)
- Strength of evidence that something actionable is missing from the market price: low–medium. The single key missing item is the Parcl PPSF time series for the LA parcl_id in late Mar 2026; if that series were publicly known and showed the index substantially outside the narrow band, mispricing would be clear. Right now we lack that primary numeric. I estimate Strength ≈ 30%.
- Plausible magnitude of mispricing if one assumed a conservative error: because the band is narrow, the maximum practical mispricing in cents is small. If the market is materially wrong, it’s likely by a few to a few tens of cents, not >20¢ with high confidence. I estimate a plausible magnitude ≈ 6 cents (i.e., the market might be off by ~6 percentage points in probability if the center is clearly outside the band).
- Expected value = Strength × Magnitude = 30% × 6¢ = 1.8¢ ≈ 1.8 cents.
- Rounded and reported as requested: EXPECTED_VALUE: 1.8

6) CONFIDENCE
- Because I do not have the explicit Parcl PPSF numeric for the Apr 1 window (the decisive data), and because the market has zero volume, my assessment has low confidence.

Conclusion (short)
- There is no clear, specific public evidence I can cite that the market is obviously mispriced by a large margin. Parcl’s methodology and other market trackers place PPSF in the same order of magnitude (mid‑to‑high 500s/600s), so the YES band (~$618.4–$621.05/sqft → $1,175k–$1,180k) is plausible. However, zero volume and a very narrow band mean the quoted 36.5% is not a reliable, information‑rich probability; without the Parcl PPSF time series for the days immediately before Apr 1 I cannot confidently call a mispricing. If you want a decisive arbitrage call, the next step is to fetch the Parcl Labs PPSF values for parcl_id 2900078 for the end of March (or to access Parcl’s API/app to read the Apr 1 feed when published).

EXPECTED_VALUE: 1.8
SUMMARY: I found credible primary documentation on how Parcl computes its price‑per‑square‑foot feed and corroborating third‑party signals (Altos, market trackers) that put Los Angeles PPSF in the mid‑to‑high hundreds, so the contract’s implied PPSF band (~$618.4–$621.05/sqft) is plausible. But the market has zero volume and the band is extremely narrow; without the actual Parcl PPSF time series for the days around Apr 1 (the single decisive datum) there is insufficient evidence to assert a large mispricing.
CONFIDENCE: low

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [Parcl Labs Price Feed Whitepaper](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper)
**Author:** Unknown | **Published:** 2023-04-12

Parcl’s whitepaper explains the Price Feed (PLPF) methodology: a daily median price‑per‑square‑foot index built from cleaned transaction data, percentile filtering (35–65th), moving medians and smoothing/backpropagation windows to limit outlier impact and reduce noise. This source is the authoritative description of exactly what the market’s resolver (Parcl Labs Sales Price Index) measures and how it behaves day‑to‑day; that matters because the market resolves to Parcl PPSF × 1900, so smoothing/low volatility reduce short‑term variance and affect the plausibility of the narrow Apr 1 band. It supports interpreting the Parcl index as a smoothed sales PPSF rather than raw listing PPSF. ([parcllabs.com](https://www.parcllabs.com/articles/parcl-labs-price-feed-whitepaper))

### [How Housing Stock Composition and Sales Trends Influence Prices (Parcl Labs)](https://www.parcllabs.com/articles/how-housing-stock-composition-and-sales-trends-influence-prices)
**Author:** Unknown | **Published:** 2024-06-05

Parcl’s market analysis for major metros (including Los Angeles) reports PPSF trends and composition effects; it states Los Angeles PPSF rose significantly since 2019 and gives short‑term changes (e.g., small 30‑day moves). This supports the conclusion that Parcl PPSF for LA has been in the mid‑to‑high hundreds and tends to be smoothed — making a ~620 PPSF plausible. It is recent and directly relevant because the market resolves to Parcl’s PPSF. ([parcllabs.com](https://www.parcllabs.com/articles/how-housing-stock-composition-and-sales-trends-influence-prices?utm_source=openai))

### [December home sales and price report (California Association of REALTORS®)](https://mls.car.org/en/aboutus/mediacenter/newsreleases/2026releases/dec2025sales)
**Author:** California Association of REALTORS® | **Published:** 2026-02-13

CAR’s Dec 2025 release lists the median sold price of existing single‑family homes in the Los Angeles Metro area at ~$807,540. Dividing that figure by the market’s 1900 sqft median gives an implied PPSF ~ $425—substantially lower than the ~$618–621 implied by the YES band. This demonstrates a major definitional/methodological difference (CAR single‑family sold median vs Parcl all‑property PPSF) and cautions against naive comparisons; it is authoritative but not directly equivalent to Parcl’s index. ([mls.car.org](https://mls.car.org/en/aboutus/mediacenter/newsreleases/2026releases/dec2025sales))

### [Los Angeles County, CA — Altos Weekly Market Report (median list price & per‑sqft)](https://altos.re/r/2fb00d36-4075-4953-8b62-7aa239f7ddbd)
**Author:** Altos Research, Inc. | **Published:** 2026-03-17

Altos’ live dashboard (Mar 17, 2026) reports median list price and a per‑square‑foot figure ~ $685/sqft for Los Angeles County. Listing PPSF is typically higher than sales PPSF but confirms market scale (high 600s). This corroborates that an all‑property sales PPSF near ~620 is plausible (Altos is a high‑quality, up‑to‑date listing analytics provider). It supports the plausibility of the market’s YES band rather than proving mispricing. ([altos.re](https://altos.re/r/2fb00d36-4075-4953-8b62-7aa239f7ddbd))

### [Los Angeles-Long Beach-Anaheim, CA MSA Housing Market Review (PropertyMakler)](https://propertymakler.com/research/Los-Angeles-Long-Beach-Anaheim-CA-MSA-Housing-Market/)
**Author:** Unknown | **Published:** 2025-12-05

This market review reports price‑per‑square‑foot series and indicates a peak in the 650–690/sqft area around Apr–May 2025 and subsequent normalization into the 650s. It is a third‑party analytics summary (methodology differs from Parcl) but supports the broader picture that LA PPSF reached the high 600s in 2024–25, which is consistent with a Parcl PPSF that could be around ~620 in early 2026. It strengthens the “YES plausible” side but is not a direct Parcl feed. ([propertymakler.com](https://propertymakler.com/research/Los-Angeles-Long-Beach-Anaheim-CA-MSA-Housing-Market/?utm_source=openai))

### [Polymarket event (April 1 Los Angeles median home value market page)](https://polymarket.com/event/what-will-the-median-home-value-in-the-los-angeles-metro-area-be-on-april-1)
**Author:** Unknown | **Published:** 2026-03-03

Example Polymarket event page for April 1 Los Angeles median home value that confirms the market resolution mechanics (Parcl Labs Sales Price Index parcl_id 2900078, settlement = Parcl PPSF × 1900; Apr 1 publish date; fallback if not published by Apr 10). Useful context to verify the exact resolution language used by markets that reference Parcl. It confirms the key procedural details I used in the analysis (how the contract resolves). ([polymarket.com](https://polymarket.com/es/event/what-will-the-median-home-value-in-the-los-angeles-metro-area-be-on-april-1?utm_source=openai))

### [parcllabs-python (GitHub) — market/parcl_id listing](https://github.com/ParclLabs/parcllabs-python)
**Author:** ParclLabs (GitHub) | **Published:** 2025-12-01

The ParclLabs SDK README lists parcl_id 2900078 as Los Angeles-Long Beach-Anaheim CBSA and documents how to query the Parcl API for price feeds. This confirms the parcl_id referenced by the market and shows that programmatic access to exact PPSF series is available (but typically via API keys), explaining why the precise Parcl daily numeric for Apr 1 may not be publicly scrapeable without API access. It supports the recommendation that the next step is to read the Parcl PPSF time series for late March via their API or app. ([github.com](https://github.com/ParclLabs/parcllabs-python?utm_source=openai))
