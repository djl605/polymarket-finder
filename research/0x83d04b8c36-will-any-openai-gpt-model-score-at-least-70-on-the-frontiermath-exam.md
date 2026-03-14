# Research: Will any OpenAI GPT model score at least 70% on the FrontierMath Exam?

**Market ID:** 0x83d04b8c361197688102eaad1d1baa49cd25ea02565000baa2607c4d5988ff28
**Researched At:** March 14, 2026 at 04:15:42 AM UTC
**Search Query:** "Will any OpenAI GPT model score at least 70% on the FrontierMath Exam?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 1.4¢

### Summary

Epoch (the contract’s resolver) reports GPT‑5.4 Pro at 50% on FrontierMath Tiers 1–3 (Mar 2026); reaching 70% by Jun 30 remains possible but challenging. Given Epoch’s methodology and pass@ analysis, a modest chance (~25%) of hitting 70% is plausible; the market price 21.5% is therefore close to a reasonable assessment and shows only a small probable mispricing. CONFIDENCE: medium

SOURCES:
---
Title: FrontierMath Tier 4
URL: https://epoch.ai/benchmarks/frontiermath-tier-4
Author: Epoch AI
Date:

### Full Analysis

CONTEXT ANALYSIS
- What the market is asking: will any OpenAI GPT model achieve a score ≥70% on Epoch AI’s FrontierMath Tiers 1–3 by 11:59 PM ET on June 30, 2026. Resolution is explicitly tied to Epoch AI’s FrontierMath leaderboard (Tier 1–3 private set) as the primary source; other reporting can be used only by consensus of credible outlets.
- YES resolves if Epoch’s leaderboard shows a qualifying OpenAI GPT model run with accuracy ≥70% on FrontierMath Tiers 1–3 before the deadline. NO resolves otherwise (including if OpenAI publishes an internal result that Epoch does not list).

EVIDENCE EVALUATION (all sources checked are recent and directly relevant)
Evidence that suggests the market price might be too low (i.e., a non‑negligible chance of YES):
- Epoch’s public benchmarking dashboard (Mar 5–9, 2026 updates) reports that GPT‑5.4 Pro (OpenAI) set a new FrontierMath record on Tiers 1–3 with 50% accuracy. That shows very fast recent upward capability movement from earlier reported SOTA and demonstrates that OpenAI can push scores substantially in short intervals. (Epoch update). ([epoch.ai](https://epoch.ai/data/ai-benchmarking-dashboard))
- Epoch’s own earlier analysis argued that 70% for Tiers 1–3 is plausible within the “first half of next year” if gains chiefly improve reliability on problems already solved at least once (their “pass@the-kitchen-sink” analysis). This is an explicit, expert projection that supports non-zero probability of reaching 70% within the coming months. (Epoch Gradient Updates, Oct 17, 2025). ([epoch.ai](https://epoch.ai/gradient-updates/less-than-70-percent-of-frontiermath-is-within-reach-for-todays-models))
- Historical company claims: OpenAI earlier reported high FrontierMath results for internal runs (GPT‑5.2 Thinking ~40.3% per OpenAI’s December 2025 post). That shows companies may use more powerful internal scaffolds and iterate quickly, which could produce further rapid improvements if Epoch can evaluate those runs. (OpenAI claim). ([openai.com](https://openai.com/te-IN/index/gpt-5-2-for-science-and-math/))

Evidence that supports the market price as reasonable (i.e., a substantial chance NO remains):
- Epoch is the official resolution source and has a conservative, transparent scaffold and private problem set. Epoch’s long-run data show that many problems are still unsolved and that pass@N for the best models exhibits diminishing returns — their empirical pass@N curves suggest a cap well below 100% and they estimated a practical ceiling near or below 70% for the current set of models/runs. That makes a jump from 50% → 70% within ~3.5 months non‑trivial. ([epoch.ai](https://epoch.ai/gradient-updates/less-than-70-percent-of-frontiermath-is-within-reach-for-todays-models))
- The benchmark’s methodology (models must submit a Python answer() and have limited runtime; Epoch’s scaffold and token budget are strict) reduces the chance that a vendor-internal evaluation (using different scaffolds or more test-time compute) will transfer to the Epoch leaderboard unless Epoch runs the model under their settings. Epoch explicitly notes OpenAI had exclusive access to some parts of the dataset and that company-run evaluations may differ from Epoch’s results. In practice, only Epoch’s scores count for resolution. That reduces the probability mass assigned to open-ended vendor claims that don’t appear on Epoch’s leaderboard. ([epoch.ai](https://epoch.ai/benchmarks/frontiermath))
- Practical pace: recent step changes (e.g., from ~40% → 50%) are large but still short of 70%; historically, further gains have required more compute, improved scaffolding (tooling, web search), or models solving problems previously never solved. Epoch’s analysis shows much of the remaining unsolved set may be genuinely hard and not trivially reachable with more tuning. ([epoch.ai](https://epoch.ai/gradient-updates/less-than-70-percent-of-frontiermath-is-within-reach-for-todays-models))

Source credibility and recency
- Epoch AI (benchmark owner/operator) is the authoritative source for this market’s resolution. Their pages and updates (methodology, changelog, dashboard) are primary and recent (Mar 2026 updates). Highly credible for the market’s terms. ([epoch.ai](https://epoch.ai/benchmarks/frontiermath))
- OpenAI is the developer of relevant models and a primary source for company-run evaluations (OpenAI’s GPT‑5.2 claim). Company claims are important, but Epoch warns company-run evaluations may differ from Epoch’s scaffold; Epoch is the contractually relevant arbiter. ([openai.com](https://openai.com/te-IN/index/gpt-5-2-for-science-and-math/))
- Community analyses (e.g., technical posts, LessWrong threads) largely echo Epoch/OpenAI facts and provide interpretation. Useful for context but lower weight than Epoch’s official numbers. ([lesswrong.com](https://www.lesswrong.com/posts/sKCYLEN5EYLuokDft/gpt-5-4-is-a-substantial-upgrade?utm_source=openai))

MARKET EFFICIENCY ANALYSIS
- Current market snapshot (today, Mar 14, 2026): Price 21.5% (21.5¢), zero total volume, 3¢ spread, market age 43 days. Low volume + tight spread suggests a few traders set price but with consensus or minimal liquidity provision.
- Charitable interpretations that justify 21.5%:
  - The market correctly prices the nontrivial but unlikely chance that an OpenAI model will reach ≥70% on Epoch’s official leaderboard by June 30. Given Epoch’s 50% measurement for GPT‑5.4 Pro (Mar 5) and Epoch’s pass@ analysis, a ~15–30% probability is plausible; 21.5% falls inside that reasonable band.
  - Low volume could reflect that knowledgeable traders view this as a difficult binary with modest upside and are either uncertain or strategically inactive; tight spread may be an artifact of the platform’s quoting rules rather than deep liquidity.
- Alternative (inefficient) interpretations:
  - The market price could reflect a single contrarian trader’s view (over- or under-confidence) because total volume is zero — small markets are more easily moved by individual beliefs.
  - Market participants may have underweighted Epoch’s recent GPT‑5.4 evaluation (50%) and Epoch’s own projection that 70% could arrive in the first half of 2026, or conversely they may be skeptical of vendor/bench claims and underweight the chance.

MISPRICING ASSESSMENT (weighing evidence objectively)
- Key facts (contractual/resolution-relevant):
  - Epoch’s public dashboard (Mar 5, 2026) reports GPT‑5.4 Pro scored 50% on FrontierMath Tiers 1–3 — the SOTA on the authoritative leaderboard as of early March. This is the most important datapoint. ([epoch.ai](https://epoch.ai/data/ai-benchmarking-dashboard))
  - The market needs a model to reach 70% on the Epoch leaderboard by Jun 30; current SOTA 50% leaves a 20-point gap to close in ≈3.5 months.
- Probability assessment (plausible numeric reasoning):
  - Upside case (how YES could happen): OpenAI (or another org with an OpenAI GPT-labeled run) releases another large model update (or an Epoch-evaluated scaffold run with more test-time compute or better tool integration) that improves FrontierMath performance rapidly, concentrating gains on problems already seen solved at least once (improving reliability). Epoch’s own projection indicated 70% “could” arrive in the first half of the year under optimistic assumptions. ([epoch.ai](https://epoch.ai/gradient-updates/less-than-70-percent-of-frontiermath-is-within-reach-for-todays-models))
  - Downside case (why NO is likeliest): Epoch’s scaffold and pass@ analysis show diminishing returns and that roughly 20% of the problems may be out of reach for current approaches; bridging 20 points in a few months is a large, but not impossible, jump.
- Conclusion about mispricing: there is no clear, credible evidence that the market is massively mispriced. The market price (21.5%) is in the same order of magnitude as a reasoned estimate for the chance of a 20-point improvement in ~3.5 months. Given Epoch’s authoritative role and the remaining technical uncertainty, I see only a small possible edge (market slightly low) — not a decisive arbitrage.

EXPECTED VALUE CALCULATION
- My qualitative assessment: fair probability that Epoch will report an OpenAI GPT model ≥70% by June 30, 2026 ≈ 25% (point estimate), versus market 21.5% → implied mispricing magnitude ≈ 3.5 percentage points (3.5¢).
- Strength of evidence (how confident I am that the specific missing info would change the price): moderate = 40%. Rationale: Epoch’s March 2026 SOTA (50%) increases the chance relative to earlier months, and Epoch’s own projection leaves an explicit nonzero path to 70% in H1 2026; but the technical difficulty and short timeline leave high uncertainty.
- Expected value = Strength × Magnitude = 40% × 3.5¢ = 1.4¢

CRITICAL CHECK (self‑challenge)
- I confirmed the exact resolution criteria: Epoch AI FrontierMath Tiers 1–3 leaderboard is primary and required for resolution. Company-internal claims only count if published on the Epoch leaderboard or otherwise accepted by a consensus of credible reporting (market description). The Epoch dashboard is current and authoritative. Given the required Epoch-run result, internal OpenAI runs that are not on Epoch’s leaderboard do not resolve the market. I therefore do not see a major overlooked technicality that would make the current price obviously wrong.
- The potential for a >20¢ mispricing is implausible here and I find no evidence supporting such a large mispricing.

FINAL ASSESSMENT & RECOMMENDATION
- The market price (21.5%) is broadly reasonable given (a) Epoch’s authoritative score of 50% for GPT‑5.4 Pro on Tiers 1–3 (Mar 5, 2026), (b) Epoch’s analysis showing a capped pass@ curve and nontrivial hard remainder, and (c) the short time till Jun 30, 2026. There may be a small undervaluation (~3–4¢) because rapid vendor iterations have historically produced jump improvements and Epoch itself suggested 70% could be reached in H1 2026 under optimistic assumptions, but the evidence is not strong enough to justify a large discrepancy.
- In practical terms: this looks like a low‑EV, low‑confidence trade unless you have additional private information (e.g., knowledge of an imminent Epoch-evaluated OpenAI run or an announced model release that Epoch will evaluate before June 30). For public-information trading, expected value is small (~1.4¢) and risk is substantial.

EXPECTED_VALUE: 1.4
SUMMARY: Epoch (the contract’s resolver) reports GPT‑5.4 Pro at 50% on FrontierMath Tiers 1–3 (Mar 2026); reaching 70% by Jun 30 remains possible but challenging. Given Epoch’s methodology and pass@ analysis, a modest chance (~25%) of hitting 70% is plausible; the market price 21.5% is therefore close to a reasonable assessment and shows only a small probable mispricing. CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [FrontierMath Tier 4](https://epoch.ai/benchmarks/frontiermath-tier-4)
**Author:** Epoch AI | **Published:** 2026-01-23

Epoch’s FrontierMath page documents the dataset (350 problems split into Tiers 1–3 and Tier 4), the evaluation methodology (models submit a Python answer() and may run Python; token/run limits), and key changelog notes about regrading and fixes. It explicitly states that FrontierMath was developed with OpenAI funding and that company-run evaluations may use different scaffolds; Epoch also explains that their public/private splits and scaffold differ from some vendor internal runs. This is directly relevant because the market resolves to Epoch’s leaderboard and the page explains exactly how Epoch scores runs, what data are private, and how differences in scaffold can change measured accuracy — all central to assessing whether reported vendor scores would count for this market. ([epoch.ai](https://epoch.ai/benchmarks/frontiermath))

### [Data on AI Capabilities and Benchmarking (Benchmarking updates; FrontierMath SOTA)](https://epoch.ai/data/ai-benchmarking-dashboard)
**Author:** Epoch AI | **Published:** 2026-03-09

Epoch’s benchmarking dashboard (updated Mar 5–9, 2026) records recent leaderboard changes and explicitly reports that GPT‑5.4 Pro set a new FrontierMath record: 50% on Tiers 1–3 (and 38% on Tier 4). This is the authoritative, contract-relevant report that establishes the current SOTA for OpenAI models on the Epoch leaderboard; because the market resolves to Epoch’s leaderboard, this update is the most important datapoint for judging the gap between current performance (50%) and the 70% threshold. ([epoch.ai](https://epoch.ai/data/ai-benchmarking-dashboard))

### [Advancing science and math with GPT‑5.2](https://openai.com/index/gpt-5-2-for-science-and-math/)
**Author:** OpenAI | **Published:** 2025-12-11

OpenAI’s research/announcement page describes GPT‑5.2 and reports internal evaluation results, including a claim that GPT‑5.2 Thinking solved 40.3% of FrontierMath (Tiers 1–3) under OpenAI’s evaluation settings. This matters because it shows vendor-reported performance can be higher than third-party runs (Epoch warns about scaffold/subset differences), so company claims alone do not guarantee resolution under Epoch’s rules. It also demonstrates the rapid vendor-side improvements that make non-zero probabilities of further SOTA progress plausible. ([openai.com](https://openai.com/te-IN/index/gpt-5-2-for-science-and-math/))

### [Less than 70% of FrontierMath is within reach for today’s models](https://epoch.ai/gradient-updates/less-than-70-percent-of-frontiermath-is-within-reach-for-todays-models)
**Author:** Greg Burnham / Epoch AI (Gradient Updates) | **Published:** 2025-10-17

Epoch’s analysis aggregates many runs (32 GPT‑5 runs, 16 ChatGPT Agent runs, and many others) and computes pass@N and a “pass@the-kitchen-sink” metric (how many problems any model has solved at least once). They report 57% of problems solved at least once and show diminishing returns to repeated runs; they conclude a practical cap at or below ~70% under current methods while noting that if improvements mainly increase reliability on already-solved problems, 70% could plausibly arrive in the near term. The piece provides the technical context and probabilistic reasoning (pass@N behavior, solved/unseen problem split) that is most relevant to estimating how likely a jump from 50% → 70% is before June 30. ([epoch.ai](https://epoch.ai/gradient-updates/less-than-70-percent-of-frontiermath-is-within-reach-for-todays-models))
