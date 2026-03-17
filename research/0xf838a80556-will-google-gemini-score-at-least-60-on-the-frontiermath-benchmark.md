# Research: Will Google Gemini score at least 60% on the FrontierMath Benchmark?

**Market ID:** 0xf838a80556d6b26ee4d1522abc717ffb2b015e909fc699f003561fb4d6589194
**Researched At:** March 17, 2026 at 05:39:41 AM UTC
**Search Query:** "Will Google Gemini score at least 60% on the FrontierMath Benchmark?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 6.0¢

### Summary

Epoch AI’s official FrontierMath leaderboard (the market’s resolver) shows Gemini 3 Pro at ~38% on Tiers 1–3; no public Epoch‑accepted run or credible reporting indicates any Gemini model has reached or will almost certainly reach ≥60% by June 30, 2026. Given the large gap (≈22 percentage points) between current public best (~38%) and the 60% threshold, the market’s 16% price appears optimistic; I estimate true probability ≈6%, yielding an expected-value gap ≈6.0 cents.

### Full Analysis

Planned questions before searching:
- What does Epoch AI’s FrontierMath leaderboard (the official resolution source) currently report for Google Gemini models on Tiers 1–3 (the market’s resolution set)?
- Have any Google Gemini models reached ≧60% on FrontierMath (Tiers 1–3) as of today, or have credible reports / announcements indicated such a result will arrive by June 30, 2026?
- What is the recent trajectory of top FrontierMath scores (how big have recent version-to-version jumps been) and are there known technical/operational ways (internal scaffolding, extra test-time compute) that could plausibly produce a +20+ percentage-point jump between now and June 30?

I used Epoch AI (the primary resolver) and recent independent reporting of Epoch runs as the basis for the analysis.

1) CONTEXT ANALYSIS
- What the market asks: Will any Google Gemini model achieve a FrontierMath score ≥60% on Epoch AI’s FrontierMath Tiers 1–3 leaderboard by 11:59 PM ET on June 30, 2026?
- How it resolves YES vs NO: It resolves YES only if Epoch AI’s FrontierMath leaderboard (or a credible consensus of reporting per the market rules) shows a Google Gemini model with accuracy ≥60% on the Tier‑1–3 private set referenced in the market (the Epoch-run “FrontierMath-2025-02-28-private” / Tiers 1–3). Otherwise it resolves NO. Internal/company-only claims are not sufficient unless Epoch (or a credible consensus recognized by the market rules) posts the result before the deadline.

2) EVIDENCE EVALUATION (key findings)
- Primary authoritative evidence (Epoch AI):
  - Epoch AI’s FrontierMath hub shows recent Epoch runs for Gemini: gemini-3-pro-preview scored ~38% (±3%) on the FrontierMath-2025-02-28-Private Tiers 1–3 set; earlier gemini-2.5-pro-run ~10%. Epoch notes run details, retries for API errors, and methodological points that determine published scores. This is the direct primary evidence about current performance and the official resolution source for the market. (EpochAI — authoritative for resolution; recent changelog entries show active maintenance and reruns.) Source: Epoch AI FrontierMath pages.
- Independent reporting / landscape:
  - Multiple independent writeups and aggregator coverage (AI‑Primer, AiGazine, community posts citing Epoch AI) report Gemini 3 Pro at ~37.6–38% on Tiers 1–3 and ~19% on Tier 4, and that Gemini 3 Pro set a new record versus other public models in late 2025. Independent sources corroborate Epoch’s published results (they appear to be reporting Epoch’s numbers). No reputable source shows any Gemini run near 60% on Epoch’s FrontierMath yet.
- What suggests the market price might be incorrect (i.e., overpriced toward YES):
  - The market currently assigns 16% probability to Gemini ≥60% by June 30. The evidence that could argue the market is too high is the lack of any public EpochAI entry above ~38–41% for Gemini and that top models across vendors are clustering in the ~30–40% range on Tiers 1–3 (Epoch runs / reporting). Historically, published EpochAI scans show top scores well below 60%, making a >20 percentage point jump by late June unlikely without an unexpected breakthrough or an internal-only/experimental scaffold being converted into an Epoch-accepted run.
- What evidence supports the market price as reasonable (i.e., some chance of YES):
  - Major model releases have shown substantial single-release improvements in the past (e.g., multi‑point jumps between major versions). Google could plausibly release a substantially better Gemini variant (or tune an existing variant, or submit runs with more test-time compute / scaffolding) between now and June 30. Epoch has noted that differences in evaluation setup (internal scaffolding, test-time compute, different subsets) can create discrepancies between vendor-reported scores and Epoch runs — so if Google and Epoch cooperate or Google’s publicly available model improves quickly, a large jump is not impossible. That justifies a small non-zero probability.
- Credibility & recency:
  - Epoch AI is the canonical source for the benchmark and is explicitly named in the market description — high credibility for resolution. The Epoch page has a recent changelog (Jan 2026) and specific run entries (Gemini 3 Pro ~38%) and discusses methodology in detail — highly relevant and recent.
  - Reporting sites and analysis posts I checked are re-reporting Epoch numbers (not independent contrary runs). These corroborate Epoch’s published scores but are secondary.

3) MARKET EFFICIENCY ANALYSIS
- Reasonable interpretations of current price (16%):
  - Interpreting 16% charitably: traders may be pricing in a modest chance that Google will release a substantially improved Gemini or that Epoch will accept a run where Google’s model (or a setting) reaches ≥60% through an internal scaffold, heavy test-time compute, or new model variants/“Deep Think” style settings before June 30. The 16% could reflect uncertainty about Google’s release cadence and aggressiveness in optimizing for math.
  - Alternative interpretation (inefficient): the price may be set by a small number of traders who are optimistic and have low-volume market influence; total volume is $0 (market metrics show Total Vol: $0), which is a strong sign this market has essentially no liquidity or trading/aggregation — in that case the displayed price may not represent a market consensus.
- Is low volume because it’s obvious or because traders haven’t engaged?
  - Given that the outcome is not obvious (it requires a major jump), the low volume more likely reflects lack of trader interest or awareness rather than a settled consensus. The market’s tight spread + zero traded volume suggests price is fragile and potentially set by one or a few tickers rather than many informed participants.

4) MISPRICING ASSESSMENT
- Does evidence show specific missing info from the market price?
  - Evidence indicates the market price is likely optimistic relative to the authoritative benchmark trajectory: Epoch’s published Gemini 3 Pro ~38% is far below the 60% threshold. There are no credible reports or signals that Google will produce a >20 percentage point improvement on Epoch’s private Tiers 1–3 set within ~3.5 months (March 17 → June 30, 2026). The largest plausible near-term changes that could lift scores substantially are either (a) a genuine model breakthrough (which would likely be widely signaled or leaked before Epoch publishes), or (b) a change in evaluation method (e.g., vendor-assisted runs using more inference / scaffold) — but the market resolution depends on Epoch’s leaderboard, and Epoch’s public notes indicate they standardize runs and explicitly call out differences when vendors used internal scaffolds. There’s no specific credible evidence that such an Epoch-acceptable method will produce 60% for Gemini by the deadline.
- Critical checks (what might I be missing?)
  - Could internal Google runs already have produced >60% but not yet published? Possibly, but unless Epoch reports that run (or major credible outlets report and Epoch accepts the run), the market’s resolution relies on Epoch’s published leaderboard. Historically, vendor-internal claims have often not matched Epoch runs absent vendor cooperation. I have not found any credible leaked Epoch-accepted run or independent evaluation showing Gemini ≥60%.
  - Could traders have private information (e.g., a leak about an upcoming Gemini release)? Yes — private/trader info would justify a higher market price. That is exactly the kind of private information that low-volume markets can reflect; we cannot exclude it. But no public corroboration exists.
- Conclusion on mispricing:
  - There is credible evidence (Epoch’s published runs) that Gemini 3 Pro is ~38% on Tiers 1–3 and no public sign of an imminent route to 60% by June 30. Given the market price of 16%, the market appears somewhat optimistic relative to public evidence (i.e., market is likely overpricing the chance of a ≥60% Epoch-accepted Gemini run), but because private information or an unexpected breakthrough could exist, I cannot conclude a high-confidence, large mispricing. The lack of traded volume and tight spread makes this price fragile and easily moved by a single informed actor.

5) EXPECTED VALUE CALCULATION (estimate of mispricing)
- My calibrated judgment:
  - Best public-evidence (Epoch + corroborating reporting) implied probability for Gemini ≥60% by June 30: ~5–8% (I judge ≈6%).
  - Market probability: 16% (market price 16.0%).
  - Estimated overpricing (magnitude): market minus my estimate ≈ 10 percentage points (i.e., ~10 cents).
  - Strength of evidence that the market is wrong (confidence the public evidence is missing information the market should have): medium — I assign 60% strength. (Reason: Epoch is authoritative and shows current gap; however private info / release surprises remain possible.)
- Expected value = Strength × Magnitude = 0.60 × 10 cents = 6.0 cents.

6) CONFIDENCE IN ASSESSMENT
- I assign: medium confidence.
  - Rationale: primary-authority (Epoch) data is recent and directly relevant, but rapid model releases and private information could materially change probabilities; lack of market volume also raises uncertainty about whether the displayed price reflects a private trader’s information.

Final concise actionable statements (required output):

EXPECTED_VALUE: 6.0
SUMMARY: Epoch AI’s official FrontierMath leaderboard (the market’s resolver) shows Gemini 3 Pro at ~38% on Tiers 1–3; no public Epoch‑accepted run or credible reporting indicates any Gemini model has reached or will almost certainly reach ≥60% by June 30, 2026. Given the large gap (≈22 percentage points) between current public best (~38%) and the 60% threshold, the market’s 16% price appears optimistic; I estimate true probability ≈6%, yielding an expected-value gap ≈6.0 cents.
CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [FrontierMath Tier 4](https://epoch.ai/benchmarks/frontiermath)
**Author:** Epoch AI | **Published:** Unknown

Epoch AI’s FrontierMath hub describes the benchmark methodology and publishes run results and changelog entries. The page includes model-specific notes and published run scores; it lists gemini-3-pro-preview as scoring ~38% (±3%) on FrontierMath-2025-02-28-Private (Tiers 1–3) and ~19% on Tier 4, and documents reruns, API error handling, and methodology changes. This is the authoritative source for the market’s resolution (the market explicitly cites Epoch), and its published Gemini scores are the central evidence arguing against a ≥60% outcome by June 30, 2026.

### [Gemini 3 Pro Hits 38% on FrontierMath as Google Takes Lead in AI Reasoning Race](https://aigazine.com/benchmarks/gemini-3-pro-hits-38-on-frontiermath-as-google-takes-lead-in-ai-reasoning-race--v)
**Author:** Unknown | **Published:** 2025-11-21

This reporting summarizes Epoch AI’s published results, noting Gemini 3 Pro set a new record on FrontierMath (≈38% on Tiers 1–3 and ≈19% on Tier 4) and places those numbers in the context of other leading models. The article corroborates Epoch’s numbers and frames the results as a state‑of‑the‑art improvement, but it does not show any run anywhere close to 60%; it supports the assessment that current public performance is far below the market’s 60% threshold.

### [FrontierMath-2025-02-28-Private: Top Score 40.7% - AI Benchmark (NeoSignal)](https://neosignal.io/benchmarks/frontiermath-2025-02-28-private)
**Author:** Unknown | **Published:** Unknown

This third‑party benchmark tracker aggregates Epoch AI’s FrontierMath leaderboards and reports top scores for the FrontierMath-2025-02-28-private set (showing the leaderboard context and top results in the ~30–40% range). It provides an independent visualization/aggregation of Epoch’s leaderboard and supports the point that leading Epoch‑accepted scores are currently well below 60%, reinforcing the conclusion that a ≥60% result would represent a large, notable jump from the present state.
