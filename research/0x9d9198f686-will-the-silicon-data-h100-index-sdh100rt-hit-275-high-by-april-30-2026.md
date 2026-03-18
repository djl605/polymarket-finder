# Research: Will the Silicon Data H100 Index (SDH100RT) hit $2.75 (HIGH) by April 30, 2026?

**Market ID:** 0x9d9198f6860b6781624101fb50bddb287ff25800496d2d380ec4d3d1f3222888
**Researched At:** March 18, 2026 at 04:34:08 AM UTC
**Search Query:** "Will the Silicon Data H100 Index (SDH100RT) hit $2.75 (HIGH) by April 30, 2026?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 3.0¢

### Summary

The SDH100RT index has recently been clustered in the low-$2s with occasional short spikes; Silicon Data and independent reporting show both downward structural pressure (new GPUs and hyperscaler competition) and episodic upside risk (outages, demand spikes). A 23% market price for the $2.75-by-Apr-30 outcome is plausible; I find no clear public evidence of a large mispricing.

### Full Analysis

Planned approach and note on web search budget
- I treated the Silicon Data site and its docs as primary resolution sources and prioritized: (1) the official Silicon Data index pages/docs, (2) Silicon Data blog/announcements (for recent index levels, methodology changes, and short-term moves), and (3) reputable industry press about GPU supply/new models (H200/Blackwell) and cloud pricing. I used three targeted web searches to fetch those items (Silicon Data product/docs + recent Silicon Data blog analysis + industry press on new GPUs and cloud prices). I excluded prediction market sites per your instructions.

1) CONTEXT ANALYSIS — what the market asks and exact resolution condition
- Market question (exact): Will the Silicon Data H100 Index (SDH100RT) hit $2.75 (HIGH) by April 30, 2026?
- Exact resolution rule (from your market text): "Yes" if, for any day between February 2 and April 30, 2026 (inclusive), the SDH100RT daily value is >= $2.75; otherwise "No." The index data on Silicon Data's H100 Index chart (Bloomberg ticker SDH100RT) is authoritative; a day’s value is finalized when the next day’s data point is published. Important: revisions before April 30 finalization can still count.
- Therefore, to resolve Yes: there must be at least one finalized daily SDH100RT value on or between Feb 2 and Apr 30, 2026 that is >= $2.75. If that day has already occurred and the index shows >= $2.75 (and has been published/finalized per Silicon Data/Bloomberg rules), the market should already be settled.

2) EVIDENCE EVALUATION — what I found and how it bears on the probability
Key primary evidence (Silicon Data / index documentation)
- Silicon Data publishes the SDH100RT index (Bloomberg ticker SDH100RT) and provides historical archives via API/Bloomberg; daily calculation and a methodology are described on their product/docs pages. They note they capture large sample coverage and perform normalization/outlier removal. This establishes the index as an authoritative daily series and explains that day-values can be restated when methodology changes occur. (Silicon Data product & docs). This matters for resolution confidence (data exists; market resolves to that chart). Source credibility: primary (index issuer); very relevant and recent (site and docs show posts through early 2026). This supports treating the index as the correct resolution source, not subjective.
- Silicon Data has posted recent blog pieces showing the H100 index has been in the low-$2 range with episodic moves: examples include a ~10% short spike from ~$2.00 → ~$2.20 between Dec 9, 2025 and Jan 6, 2026, and a longer historical breakdown showing tiering (hyperscaler >> marketplace >> neocloud) with Neocloud/“neocloud” ranges often around $2.5–$3.3 in 2024–2025. Silicon Data also published context pieces forecasting increased supply as reservations expire in 2026 that could push prices down. Source credibility: primary issuer (Silicon Data) — high for index methodology and their interpretation; potential bias to highlight index utility but still directly relevant and recent (posts in late 2025 / early 2026).
What industry press and market data say (external corroboration)
- Independent reporting and cloud- pricing comparisons (Tom's Hardware, IEEE Spectrum coverage earlier in the index’s life, vendor price surveys) show wide dispersion in quoted H100 on-demand/rental rates across providers (ranges reported roughly $1.5–$6+/hr depending on provider/region), with many specialist providers and marketplaces clustered near $2–$3/hr as of late 2025 / early 2026. These independent data points corroborate Silicon Data’s banding and demonstrate that a $2.75 threshold is inside the plausible range — not an extreme outlier. Source credibility: varied — Tom’s Hardware and IEEE Spectrum are reputable technology press; other aggregators vary (some are firm blogs); recency is within last 6 months to weeks — relevant for short-term forecasts.
- Reporting on supply-side changes (Blackwell/B200 and H200 rollouts, hyperscaler discounts, regional export controls/China approvals) is mixed: (a) broad deployment of Blackwell-class systems and H200 availability increases compute supply and create downward pressure on H100 rental prices (bearish for hitting 2.75), (b) episodic regional constraints, model launches, or workload deadlines can create short-lived upward spikes (bullish possibility). Source credibility: major outlets (Tom’s Hardware and press summaries) and vendor press releases; these are timely (late 2025 — early 2026) and relevant.
Specific evidence suggesting current market price (23%) might be incorrect (i.e., showing material under- or over-pricing)
- Evidence supporting higher chance than 23% (bullish signals):
  - Silicon Data documents repeated short, sharp spikes are possible (their own blog cites a ~10% jump Dec→Jan). That demonstrates the index can jump above its multi-week average in a short window. If such spikes are still plausible before Apr 30 (for example, due to model launches, hyperscaler capacity outages, or concentrated demand events), the chance of hitting 2.75 could be meaningfully above a low-single-digit percent. This supports the idea that a ~20–30% implied probability is reasonable.
  - The index exhibits significant regional dispersion; some regions/neo-cloud providers have historically recorded higher per-hour rates (near $3+); because the index aggregates, a localized spike in a sizable provider or region could lift the daily aggregated series to >= $2.75 even if the global median is lower.
- Evidence supporting lower chance than 23% (bearish signals):
  - Silicon Data and independent reporting show a structural downward trend in H100 rental pricing since 2024 due to increased supply, new GPU generations (Blackwell/H200), and aggressive hyperscaler price cuts in mid-2025. Silicon Data’s announcements also note a methodology change (Dec 3, 2025) that reduced SDH100RT by an estimated ~4–6% when history was restated — that lowers recent baseline values, making reaching $2.75 less likely absent a strong upward move.
  - The introduction and ramp of Blackwell/H200 capacity (vendor press and reporting) and the expiration of multi-year reservations (Silicon Data commentary) point toward increased available H100-like compute (or immediate substitutes), which should, all else equal, reduce short-term rental prices.
- Practical resolution/technical considerations that constrain arbitrage:
  - The index is published via Bloomberg and API; full daily time series is behind APIs/terminals. Traders without Bloomberg/API access may not monitor every daily datapoint in real time; low-volume markets can therefore reflect informational frictions rather than pure disagreement about fundamentals. Silicon Data’s documentation is explicit that values may be restated while pre-finalization; that complicates arbitrage for someone relying on snapshots rather than the authoritative feed.
- Recency and credibility assessment:
  - Silicon Data entries and blog posts are the most direct and current primary sources about SDH100RT and were published within the last months (through Feb–Mar 2026). Tom’s Hardware and IEEE Spectrum pieces are credible corroboration and also recent. Several aggregator blogs and small sites present price tables; these are useful for cross-check but less authoritative. Overall evidence is recent and varied but there is no single open-source place that gives the full daily SDH100RT time series publicly accessible without Bloomberg/API access — that matters for traders.

3) MARKET EFFICIENCY ANALYSIS — is the market price plausible?
- What would justify a 23% price for "Will SDH100RT hit $2.75 by Apr 30, 2026?":
  - Baseline: recent SDH100RT values (Silicon Data) have clustered in the low-$2s (e.g., ~2.0–2.3 in late 2025 and early 2026 in some published posts), occasionally stepping higher to the mid-$2s for short intervals or in specific provider cohorts. A 23% chance is consistent with a baseline near ~$2.1–$2.4 and occasional but infrequent spikes above $2.75. In plain terms: if typical daily values are ~2.1 and volatility is modest, the chance of a one-off jump to 2.75 in the next ~6 weeks could easily be on the order of 10–30% depending on volatility assumptions — so 23% is not an implausible market consensus.
- Could the price instead reflect one or a few traders?
  - Low total trading volume and a tight spread mean two possibilities:
    1) The market is thinly held and the quoted probability (23%) could simply reflect one liquidity provider’s estimate (or a small group) rather than broad aggregation.
    2) Alternatively, 23% could be where a small number of informed participants and any arbitrageurs converge after considering public index history, volatility, and likely supply events. Because the underlying resolution source is visible to anyone with Bloomberg/API access, truly informed traders could easily trade the market; their presence would push price toward an efficient value even with low participation.
- Why might informed traders not correct mispricing quickly?
  - If the index feed is behind paywall/API, many potential arbitrageurs may not continuously monitor the exact daily SDH100RT time series; combined with small dollar payoffs on low-volume markets, the expected return for monitoring and trading may not justify the effort. That supports why thin markets can persist near a reasonable but not fully efficient price.

4) MISPRICING ASSESSMENT — weighing both sides
- Summary of the evidential balance:
  - Bullish case (SDH100RT ≥ $2.75 before Apr 30): plausible because (a) historical spikes of ~10% over a few weeks have occurred, (b) regional provider dispersion means localized higher rents can push the aggregate index up, and (c) short-term operational events (provider outages, concentrated training deadlines, export-limited supply in some regions) can create sudden demand-driven moves. This makes a nontrivial chance that the index could briefly touch $2.75.
  - Bearish case (won’t hit $2.75): equally plausible because (a) structural downward pressure from Blackwell/H200 deployment and hyperscaler price competition lowered baseline values into the low-$2s; (b) Silicon Data’s methodology restatement in Dec 2025 reduced the index baseline ~4–6%; (c) published Silicon Data and third-party price comparisons show many providers with prices below $2.75, so the aggregate index must move substantially above its current-band to reach $2.75.
- Is there credible evidence that traders are missing (i.e., mispricing)? No single authoritative, recent public dataset shows an imminent, large (>20 cent) miss. Silicon Data’s own blog and third-party reporting place the index in a range where an event-driven jump to 2.75 within a month is possible but not overwhelmingly likely. The market probability (23%) sits comfortably within the range a simple volatility-based model would produce given the recent baseline and observed spikes. Given this, there is no clear, specific piece of information missing from market pricing that would indicate a large predictable mispricing.
- Critical check (per your instructions): I do not find evidence of a glaring mismatch (e.g., the index already being >= 2.75 in the published Silicon Data chart for a date between Feb 2 and Mar 18) that would force us to conclude a big mispricing. Silicon Data’s site and blogs show recent levels in the low-to-mid $2s; no public source found showing an already-finalized day ≥ $2.75 in the Feb–Mar window. Therefore, concluding a large mispricing (>20 cents) would require either (a) access to a private feed showing different daily values (which would be the index owner’s data) or (b) a clear new, immediate supply shock — neither of which I found in public reporting.

5) EXPECTED VALUE CALCULATION (numerical estimate)
- I estimate the strength of evidence that the market is materially mispriced at about 60% (i.e., there’s moderate-quality, recent, directly relevant data but no decisive missing signal).
- If there is any mispricing, the likely magnitude is small (a few cents), because public evidence suggests the market baseline sits in the low-$2s and the question is primarily about a one-off jump; wholesale mispricing of, say, >20–30 cents seems unlikely given available public evidence and the index issuer’s frequent updates.
- Concretely, I estimate a plausible magnitude of mispricing of ~5 cents (0.05 USD) at most, with ~60% confidence that some small mispricing exists. Expected value = 60% × 5 cents = 3.0 cents.
- Interpretation: the expected arbitrage upside from trading against this market (if you had perfect access to the index feed and could trade frictionlessly) is small — on the order of a few cents per share/contract. That is consistent with the market’s low total volume and the modest payout scale of such a prediction.

6) CONFIDENCE
- Overall confidence in this assessment: medium.
  - Rationale: primary index documentation and several recent Silicon Data posts plus industry press provide up-to-date, relevant information; however, the index’s full daily time series is distributed via Bloomberg/API (not trivially accessible in full in public web pages), and short-term operational shocks (provider outages, large training deadlines, or geo-specific supply constraints) can produce unpredictable spikes. Those two facts limit my confidence from high to medium.

Concise conclusions and actionable notes
- The market question requires a daily SDH100RT value >= $2.75 between Feb 2 and Apr 30, 2026. Silicon Data’s own public materials show the index has generally been in the low-$2 range with occasional short spikes; methodology restatements in Dec 2025 reduced baseline levels slightly. Industry reporting shows ongoing downward pressure from newer GPUs (Blackwell/H200) and hyperscaler competition, but also occasional region-specific supply tightness that could produce spikes.
- The quoted market probability (23%) is within the reasonable range implied by public evidence and observed volatility. I do not find specific, credible evidence of a large (>20¢) mispricing. Expected trading edge (if any) is small (few cents). Because the market is low-volume, the quoted price could reflect a small number of participants, but it is not an obvious, exploitable misprice based on public information.
- If you plan to trade: the highest-return strategy would be (a) obtaining the live SDH100RT feed (Bloomberg/Kaiko/API) to watch daily values and intraday signals, and (b) trading only if you see a credible near-term upward shock signal (major provider outage, large enterprise buying wave, or an announced restriction that would tighten supply in a large region) — otherwise the expected edge is small.

EXPECTED_VALUE: 3.0
SUMMARY: The SDH100RT index has recently been clustered in the low-$2s with occasional short spikes; Silicon Data and independent reporting show both downward structural pressure (new GPUs and hyperscaler competition) and episodic upside risk (outages, demand spikes). A 23% market price for the $2.75-by-Apr-30 outcome is plausible; I find no clear public evidence of a large mispricing.  
CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [Silicon H100 - GPU Rental Price Tracker](https://www.silicondata.com/products/silicon-index)
**Author:** Unknown | **Published:** Unknown

Official Silicon Data product page describing the SDH100RT (H100 Rental Index), distribution (Bloomberg ticker SDH100RT), methodology highlights (daily calculation, normalization, outlier removal), and that historical archives are available via API/Bloomberg. This is the authoritative resolution source named by the market; it explains how daily values are produced, that history can be restated under methodology changes, and that the index is published on Bloomberg (so traders with terminals can observe the same data used to resolve the market). This supports treating Silicon Data as the primary and correct resolution authority and highlights why paywalled/API distribution can limit broader, rapid arbitrage.

### [GPU Index Announcements](https://docs.silicondata.com/products/gpu-index-announcements)
**Author:** Unknown | **Published:** 2025-12-03

Silicon Data announcement of methodology refinements (Dec 3, 2025) affecting SDH100RT and SDA100RT with an estimated impact on SDH100RT of -4% to -6% and a restatement of history from 2024-09-01. This is directly relevant because it lowered the index baseline historically, increasing the distance the index must travel to reach $2.75 for a given day; it also highlights that historical values can be restated prior to finalization, which matters for resolution logic and for any attempt to exploit apparent short-term moves.

### [H100 Price Spike: Understanding the 10% Surge in GPU Rental Costs](https://www.silicondata.com/blog/h100-price-spike)
**Author:** Carmen Li (Silicon Data / blog) | **Published:** 2026-01-09

Silicon Data’s blog documenting a ~10% H100 rental price jump from $2.00 → $2.20 between Dec 9, 2025 and Jan 6, 2026 and discussing how isolated spikes can occur. This is important evidence that the SDH100RT series can see rapid short-term moves upward, supporting the plausibility of a one-off daily value reaching $2.75 within a short window. It also shows Silicon Data is tracking and publishing short-term volatility events, so such events are visible to the market if they occur.

### [H100 Rental Price Over Time (2023–2025): A Complete Market Analysis](https://www.silicondata.com/blog/h100-rental-price-over-time)
**Author:** Unknown (Silicon Data blog) | **Published:** Unknown (published in late 2025 / early 2026 per site)

Silicon Data’s historical review showing tiered pricing (hyperscalers often >> marketplace >> neocloud), with examples of typical ranges and medians (Neocloud/marketplace medians often in the low-to-mid $2s to ~$3.3 in 2024–2025 depending on segment). This establishes the plausible band for SDH100RT and indicates that $2.75 is within the distribution’s tails but not an extreme outlier historically — important for estimating the probability of a short-term exceedance.

### [GPU Pricing Trends 2026: What to Expect in the Year Ahead](https://www.silicondata.com/blog/gpu-pricing-trends-2026-what-to-expect-in-the-year-ahead)
**Author:** Unknown (Silicon Data blog) | **Published:** 2026-01 (site shows early-2026 posts)

Silicon Data’s outlook piece describing structural supply-side effects for 2026 (reservation expirations, Blackwell/H200 rollout, regional differences) and a table of provider price examples (H100 80GB example ranges). This source argues for increased supply in 2026 that could keep downward pressure on H100 rental rates — an argument that weighs against a high probability of hitting $2.75 absent a sudden spike.

### [Silicon Data Launches World's First Daily GPU Rental Index (newsroom)](https://www.silicondata.com/news-room/silicon-data-launches-world-s-first-daily-gpu-rental-index-to-bring-transparency-to-the-ai-infrastructure-economy-copy)
**Author:** Unknown (Silicon Data press release) | **Published:** 2025-05-20

Press release about the SDH100RT launch and distribution on Bloomberg/Kaiko. This establishes the index’s provenance and that it is the intended public benchmark for H100 rental pricing — supporting the market’s use of Silicon Data as the resolution source.

### [Silicon Data Launches First GPU Price Index - IEEE Spectrum](https://spectrum.ieee.org/gpu-prices)
**Author:** Unknown / IEEE Spectrum | **Published:** 2025-05 (approx.; article published around launch)

Industry reporting covering Silicon Data’s index launch and discussing the significance of a daily H100 rental-price benchmark; the article quotes example regional on-demand rates and illustrates the wide regional dispersion. This external corroboration supports the credibility of Silicon Data’s index and the historical ranges reported, and helps show that $2.75 is within the plausible band given provider and regional variability.

### [Nvidia says Blackwell-based servers are in full production](https://www.tomshardware.com/tech-industry/artificial-intelligence/nvidia-says-blackwell-based-servers-are-in-full-production)
**Author:** Unknown (Tom's Hardware) | **Published:** 2025-? (site shows press coverage into late 2025 / early 2026)

Tom’s Hardware coverage noting broad deployment/production availability of Blackwell-based servers across cloud providers and vendors. This evidence supports the bearish supply side case that newer-generation GPUs (Blackwell/H200 family) are ramping and increasing available compute capacity, which tends to depress H100 rental prices and reduce the chance of SDH100RT spiking above $2.75 absent a specific supply cut or demand shock.

### [H100 Rental Prices Compared: $1.49-$6.98/hr Across 15+ Cloud Providers (2026)](https://intuitionlabs.ai/articles/h100-rental-prices-cloud-comparison)
**Author:** Unknown (IntuitionLabs) | **Published:** 2026-03 (approx.; site updated early 2026)

Independent comparison of H100 rental prices across many providers listing a broad range with clustering in the $2–3 range for many specialist providers and higher on some hyperscaler offers. This corroborates Silicon Data’s reported dispersion and shows that the $2.75 threshold sits near the upper end of the common specialist-provider band but below some hyperscaler rates — supporting the assessment that hitting $2.75 is plausible but not guaranteed.
