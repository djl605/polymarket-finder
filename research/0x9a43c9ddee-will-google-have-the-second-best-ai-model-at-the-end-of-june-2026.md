# Research: Will Google have the second best AI model at the end of June 2026?

**Market ID:** 0x9a43c9ddeef87245a713570da886d5637666b4a3dba886162df4b271978ee5f3
**Researched At:** March 18, 2026 at 04:28:20 AM UTC
**Search Query:** "Will Google have the second best AI model at the end of June 2026?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 4.8¢

### Summary

LMArena’s Mar 16, 2026 snapshot shows Anthropic holding the top two raw Arena scores and Google’s best model at #3 with overlapping confidence intervals; that snapshot implies a low single-digit raw chance for Google to be second absent further product changes. Google’s Feb 2026 Gemini 3.1 Pro preview makes an upward move plausible before June 30, so the market price (24%) looks somewhat optimistic but not decisively mispriced.

### Full Analysis

Planned approach and search budget use
- I used 3 web searches (the full LMArena leaderboard, Arena’s ranking-methodology blog, and Google’s Gemini 3.1 Pro announcement) to (a) see the current Arena scores and uncertainty, (b) understand how Arena turns votes into scores/CI/rank spreads, and (c) check Google’s recent product progress that could change Arena placement before June 30, 2026. Those three pieces are the most load-bearing facts for deciding whether the market (24%) looks mispriced.

1) CONTEXT ANALYSIS
- What the market asks: “Will Google have the second best AI model at the end of June 2026?” Per the market description, that resolves to whether any model owned by Google is the model with the second-highest Arena Score on the Chatbot Arena (lmarena.ai) Leaderboard when the table is checked on June 30, 2026, 12:00 PM ET. If two models tie for second, the market uses alphabetical tie-breaking by company name (the example in the market text favors “Google” in some ties).
- What must happen for YES vs NO:
  - YES: At the check time the second-highest Arena Score on the text Leaderboard is held by a Google-owned model (any Google model). If there is a tie for second, the alphabetical tie-breaker must favor Google.
  - NO: The model(s) in second place are owned by non-Google companies (Anthropic, OpenAI, xAI, etc.), or the tie-breaker does not favor Google.

2) EVIDENCE EVALUATION (all evidence cited)
a) Current snapshot of the Arena leaderboard (most recent public snapshot I accessed — Mar 16, 2026):
- The top raw Arena scores (text/overall) around Mar 16, 2026 show Anthropic models occupying the #1 and #2 raw-score positions (both shown as 1501±6) and Google’s best-ranked model (gemini-3.1-pro-preview) at rank 3 with 1493±6. Many other top slots are crowded (OpenAI, xAI, Anthropic variants). This means Google is close but behind at the current snapshot. (source: LMArena leaderboard). ([lmarena.ai](https://lmarena.ai/leaderboard/text))
Implication: based on the current data alone, Google’s chance of being second at that snapshot is non-trivial but materially below 50%.

b) How Arena scores/rankings behave and how to interpret the numbers:
- Arena’s scores are derived from many (pairwise) human preference votes and are displayed in an Elo/Bradley–Terry style “Arena Score” with confidence intervals and a rank spread that makes ties and uncertainty explicit. Arena explicitly warns that new models often have larger CIs and that the leaderboard reports both raw rank and rank spread to reflect statistical uncertainty. This means small numerical differences with overlapping CIs imply frequent rank flips are possible and that new/preview models are sampled more (and have larger uncertainty). (source: Arena’s ranking-method blog). ([arena.ai](https://arena.ai/blog/ranking-method/))
Implication: the ± values shown on the leaderboard are meaningful uncertainty bands — close scores with overlapping CIs imply non-negligible probability of rank changes without any new releases.

c) Google’s recent product activity that could move Arena scores:
- Google publicly released Gemini 3.1 Pro (Feb 19, 2026) as a preview and described improved reasoning and benchmark gains. Google is actively rolling out 3.1 variants across developer and product channels (API/Vertex/Gemini app). That activity shows Google is still iterating and distributing upgraded variants that Arena will sample; GA or further updates before June 30 are plausible (but not guaranteed). (source: Google blog). ([blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/))
Implication: product releases and preview rollouts between now and June 30 could move Google’s Arena score upward; conversely, Anthropic/OpenAI may also issue updates, so the landscape can shift.

d) Specific evidence that would suggest the market price (24%) is incorrect
- Evidence suggesting the market MAY be underpriced (i.e., true probability >24%):
  - Arena scores are close and overlapping: the difference between Google’s best model (1493±6) and the top Anthropic models (1501±6) is small; overlapping confidence intervals mean movement is plausible even without a new major release. Arena’s sampling of new previews can amplify quick rank movements. This supports the idea that Google could plausibly be second by June 30. (turn0view0 + turn4view0). ([lmarena.ai](https://lmarena.ai/leaderboard/text))
  - Google’s Feb 2026 release (Gemini 3.1 Pro) indicates active improvement; additional updates or GA between now and June 30 would materially increase Google’s probability of rising. ([blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/))
- Evidence suggesting the market MAY be fairly priced or overpriced for Google (i.e., true probability ≤24%):
  - The leaderboard’s current raw rank and CI numbers place multiple Anthropic variants above Google with similar uncertainty, and the raw data (≈5.5M votes across many models) gives Anthropic and other vendors strong representation — the simple snapshot probability of Google overtaking the currently second-place Anthropic model (given the published means and CI widths) is low if no further model upgrades happen. (turn0view0). ([lmarena.ai](https://lmarena.ai/leaderboard/text))
  - Arena’s methodology intentionally samples and reports uncertainty; that makes it harder to gain large jumps in rank without an objectively better model or major update. Even small numeric gaps can reflect materially small chances to pass a top model absent additional releases. (turn4view0). ([arena.ai](https://arena.ai/blog/ranking-method/))

Source credibility and recency
- LMArena leaderboard (arena.ai / lmarena.ai) — primary resolution source named in the market; high relevance and current (I viewed the text leaderboard snapshot dated Mar 16, 2026). This is the direct measurement used to resolve the market; it’s authoritative for the market’s resolution. ([lmarena.ai](https://lmarena.ai/leaderboard/text))
- Arena blog “Ranking Method” — authoritative explanation from the resolution site about how scores, CIs and rank spreads work (Nov 14, 2025). High credibility for interpreting the leaderboard numbers. ([arena.ai](https://arena.ai/blog/ranking-method/))
- Google’s official Gemini 3.1 Pro announcement (Feb 19, 2026) — primary-source evidence that Google is actively upgrading their models and distributing a preview. High credibility for the fact of Google activity and the existence of a preview model that Arena is already sampling. ([blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/))

Skeptical notes (why a seemingly “obvious” conclusion might still be wrong)
- If the leaderboard snapshot is used naively, one might under-estimate future product changes; conversely, if you over-weight future releases, you might expect too-large movement. Arena explicitly publishes uncertainty and rank spread because these small numeric differences are noisy; traders on the prediction market may be pricing in likely product releases, tie-breaking rules, or other information not visible (e.g., Google GA schedule, internal improvements, distribution to the public leading to more votes). Also the market’s low trading volume means the posted price could simply reflect a small group’s belief rather than broad aggregation.

3) MARKET EFFICIENCY ANALYSIS
- Reasonable interpretations that justify the current price (24%):
  - Traders could be assigning non-trivial probability that Google releases GA or an improved variant (or that existing 3.1 preview performs better in Arena sampling over the next 3.5 months), which would increase Google’s ranking probability from the current snapshot.
  - The tie-break rule (alphabetical) helps Google in some tie scenarios; traders may be factoring that in.
  - Arena’s sampling policy favors new models and gives new/preview versions more opportunity to collect votes; that can amplify upward movement in a short window, which active traders might be predicting.
- Reasons the price could reflect a small number of traders (market inefficiency signals):
  - Total market volume is low ($1,716) and spread is tight (2¢) — consistent with few participants expressing a firm opinion. With low volume, posted probability may reflect idiosyncratic optimism rather than a well-arbitraged consensus.
  - Because Arena is the direct resolution source, many professional quantitative traders could be unwilling to invest effort on a low-liquidity market; that leaves pricing potentially set by hobbyists or a small group.
- Is low volume because the outcome is obvious or because traders haven’t engaged?
  - Not obvious. The leaderboard shows close scores with overlapping CIs and active model development; this is a dynamic, uncertain environment — not obviously resolved. Low market volume is therefore more likely due to low attention/liquidity rather than a deterministic outcome.

4) MISPRICING ASSESSMENT (weighing both sides)
- A quick statistical back-of-envelope using the published Arena means and CI widths:
  - Example calculation (illustrative): Anthropic top model: 1501±6; Google’s best: 1493±6. If ±6 is interpreted as ~95% CI (Arena reports confidence intervals), that implies per-model standard errors ~3.06 points; the difference (8 points) divided by sqrt(3.06^2 + 3.06^2) ≈ 1.85 standard deviations, implying a ≈3% chance that Google’s existing listed model would be directly above that Anthropic model purely from sampling variability (i.e., without additional model improvements). That is a rough snapshot-only estimate (simple normal-difference approximation) and should be treated as illustrative, not exact. (based on numbers in the leaderboard). ([lmarena.ai](https://lmarena.ai/leaderboard/text))
- But: that snapshot-only probability understates the chance that Google could get a small upgrade, GA the preview, or that Arena sampling of the preview increases its score by June 30. Conversely, Google must overtake not just one model but the second-highest model overall; Anthropic has multiple high-ranked variants (so Google needs to surpass at least one of them).
- Conclusion on mispricing:
  - If you believe no significant product changes happen before June 30 and Arena sampling noise is the only source of movement, the market price (24%) looks high relative to snapshot-implied probabilities (single-digit % based on the rough normal-difference). That suggests overpricing.
  - If you believe Google will ship GA or materially improved variants, or that previews will be sampled heavily and push the score, then 24% is plausibly reasonable or even conservative.
  - I do not find specific, direct evidence (e.g., a confirmed GA release scheduled before June 30) that is missing from the current price. Absent such hard evidence, concluding a large mispricing (>20 cents) would be risky.

5) EXPECTED VALUE CALCULATION (my working numbers and reasoning)
- My working decomposition:
  - Snapshot-implied probability (no new releases, only sampling variability): ~3–6% (back-of-envelope normal-difference; see above).
  - Additional probability mass from plausible product improvements / GA / preview sampling effect between now and June 30: I judge this plausibly adds another ~8–12 percentage points (this is judgmental — Google is actively iterating but there’s no public, firm GA-by-June date). That yields a best-estimate true probability ≈ 11–18% (I take the midpoint ≈ 12% as my point estimate).
  - Market probability = 24% → implied mispricing magnitude = 24% − ~12% = 12 percentage points (12 cents).
  - Strength of evidence that this mispricing is real: moderate/limited (I estimate ~40%) because my point estimate depends on assumptions about future product timing and how Arena sampling will treat previews.
- Expected value = Strength × Magnitude = 40% × 12 cents = 4.8 cents.

6) CONFIDENCE AND FINAL JUDGMENT
- I do not find decisive proof of a large mispricing. The leaderboard snapshot (the market’s resolution source) places Google close but behind; the statistical gap (with published CIs) implies a low snapshot-only chance for Google to be second absent a material product change. However, Google is actively shipping previews (Gemini 3.1 Pro) and could plausibly improve its position by the June 30 check date; traders may be pricing that possibility. Because I cannot find a documented, high-confidence near-term GA or upgrade scheduled to guarantee a jump before June 30, I judge the market is possibly (but not clearly) overpricing Google by a modest amount.
- Final practical takeaway: the market’s posted 24% looks above a snapshot-implied baseline probability; whether it is truly mispriced depends on how likely you think Google will deliver further measurable improvements (or receive beneficial sampling) by June 30. Without firm evidence of a near-term release that would definitely change the leaderboard, I treat the current market price as slightly optimistic for Google, but not obviously or flagrantly wrong.

EXPECTED_VALUE: 4.8
SUMMARY: LMArena’s Mar 16, 2026 snapshot shows Anthropic holding the top two raw Arena scores and Google’s best model at #3 with overlapping confidence intervals; that snapshot implies a low single-digit raw chance for Google to be second absent further product changes. Google’s Feb 2026 Gemini 3.1 Pro preview makes an upward move plausible before June 30, so the market price (24%) looks somewhat optimistic but not decisively mispriced.  
CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [LLM Leaderboard - Best Text & Chat AI Models Compared](https://arena.ai/leaderboard/text)
**Author:** Unknown | **Published:** 2026-03-16

The Arena leaderboard (text/overall view) shows ranked models, their Arena Scores, ± uncertainty figures, vote counts, and raw ranks (snapshot dated Mar 16, 2026). In the snapshot I examined, Anthropic models occupy the top two raw positions (both shown around 1501±6) and Google’s gemini-3.1-pro-preview is shown at rank 3 with 1493±6; multiple vendors crowd the top 10. This is the resolution source named in the market; it directly informs the probability that a Google-owned model will be the second-highest Arena Score on the check date. The small numeric gaps and the published ± values indicate that rank changes are statistically plausible but not guaranteed, so this source tends to challenge a high probability for Google unless additional model changes occur. ([lmarena.ai](https://lmarena.ai/leaderboard/text))

### [Arena's Ranking Method](https://arena.ai/blog/ranking-method/)
**Author:** Arena Team | **Published:** 2025-11-14

Arena’s official blog explains how Arena Score, confidence intervals, raw rank, and the “rank spread” are computed and presented. The post explains that Arena reports uncertainty alongside scores and that rank spreads indicate the best/worst ranks consistent with all models’ CIs; it also notes that previous methods overweighted optimistic ranks for models with high uncertainty. This documentation is critical for interpreting the leaderboard ± values and for understanding that new/preview models (with larger CIs and more sampling) can move in the leaderboard more easily — which is central to assessing whether Google’s preview models could reach second by June 30. ([arena.ai](https://arena.ai/blog/ranking-method/))

### [Gemini 3.1 Pro: Announcing our latest Gemini AI model](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/)
**Author:** The Gemini Team | **Published:** 2026-02-19

Google’s official announcement for Gemini 3.1 Pro (Feb 19, 2026) describes improved reasoning and benchmark performance for the Gemini 3 series and states the model is rolling out in preview across developer and product channels (Google AI Studio, Vertex AI, Gemini app, NotebookLM). The announcement confirms an active product-improvement path for Google (a credible reason Google’s Arena score could rise between March and June), but it does not commit to a definitive GA date before June 30. This source therefore supports the plausibility of upward movement but does not by itself guarantee it. ([blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/))
