# Research: Another 7.0 or above earthquake by April 30, 2026?

**Market ID:** 0xa8f80c8e8ca060436b60aa03d66fe40a5e0437b18a43cf0a0d6798f09c7f054b
**Researched At:** March 18, 2026 at 04:55:05 AM UTC
**Search Query:** "Another 7.0 or above earthquake by April 30, 2026?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 3.0¢

### Summary

Using USGS historical rates (~16–18 M≥7 events/year) and a simple Poisson approximation, the chance of at least one M≥7 in the remaining Mar 18 → Apr 30, 2026 window is in the mid‑80s–high‑80s percent, slightly above the market price (81.5%). The market may be modestly undervalued by a few cents, but the difference is small and plausibly explained by conservative modeling, reporting/revision risk, and year‑to‑year variability — not clear evidence of a large mispricing.

### Full Analysis

Plan / search notes
- Key questions: (a) Exactly what resolves this market (time window, resolution source, revision rules), (b) baseline rate of global M ≥ 7.0 earthquakes (authoritative data), (c) whether any qualifying M ≥ 7.0 earthquake has already occurred inside the market’s creation→Apr 30 window (would make “Yes” already certain), and (d) whether there are reasons (clustering, large recent events, reporting delays) that materially change short-term probability. I used three high-yield searches focused on USGS statistics and authoritative reporting (AP) and avoided prediction‑market sites per instruction.

1) CONTEXT ANALYSIS
- Market question: “Another 7.0 or above earthquake by April 30, 2026?”
- Resolution rule (from the market description): resolves to YES if one or more earthquakes with magnitude ≥ 7.0 are recorded on the USGS Earthquake Hazards Program database between the market’s creation and April 30, 2026 (USGS is primary resolution source; the market allows a grace period for the event to appear and for magnitude revisions).
- For the market to resolve YES: at least one M ≥ 7.0 event must occur on Earth during the market’s active window (market creation ≈ Feb 27, 2026 — stated age 19 days on Mar 18 — through Apr 30, 2026), and that event must be recorded (and not subsequently revised below 7.0) on the USGS resolution feed (or a credible alternate if USGS delay persists).
- For NO: no recorded M ≥ 7.0 event appears on the USGS (or credible substitute) dated within the market window by the end of Apr 30, 2026 (after the allowed revision/24‑hour check).

2) EVIDENCE EVALUATION
A. Baseline frequency (authoritative)
- USGS historical counts: USGS “Lists, Maps, and Statistics” shows historical worldwide counts of earthquakes by magnitude (2000–2021), with annual counts for M 7–7.9 typically in the mid‑teens to high teens (examples in that table range ~9–23 per year). This supports a long‑run average on the order of ~16–18 M≥7 events per year. (USGS is the primary authoritative source for this market’s resolution and for statistical baseline; see Sources.)
- Other authoritative summaries (California Geological Survey, USAFacts) repeat the same order of magnitude: roughly ~18 M7 events/year (and ~1 M8+ per year), consistent with the USGS table.

How that translates to short‑term probability
- If M≥7 events follow a roughly Poisson process globally (standard approximation for global aggregated seismicity across many independent zones), expected count λ over a remaining 43‑day period (Mar 18 → Apr 30, 2026) is:
  - using 18/year: λ = 18 * (43/365) = 2.12 → P(at least one) = 1 − e^(−2.12) ≈ 88.0%
  - using 16/year: λ = 16 * (43/365) = 1.89 → P(at least one) ≈ 84.8%
  - using the more conservative long‑term variation in USGS annual counts (14–20), the short‑term probability plausibly ranges roughly from mid‑80s to high‑80s percent.
- These simple calculations produce a point estimate in the mid‑80s–high‑80s %, which is in the same ballpark as the market price (81.5%) but slightly higher.

B. Recent events / whether the market has already been decided
- Authoritative reporting: AP reported a M 7.1 event on Feb 22, 2026 (Sabah, Malaysia / deep event). That quake occurred before the market’s creation date (market age 19 days on Mar 18 → creation ≈ Feb 27), so it does not count for this market. I found no authoritative USGS‑reported M ≥ 7.0 event dated between Feb 27, 2026 and Mar 18, 2026 in mainstream news or in the USGS annual lists page. (If one had occurred inside that interval and been recorded, the market should already resolve or be pending only magnitude revision.) Given available authoritative sources there is no evidence the market window already contains a qualifying event; therefore the market’s outcome still depends on future earthquakes up to Apr 30.
- Reporting and revision rule: The market uses USGS as resolution source and allows 24 hours after registration for magnitude revisions. That reduces risk of incorrect resolution due to immediate, temporary automatic reports, but the market remains subject to standard USGS cataloging/review delays.

C. Evidence that might make the market price incorrect
- Evidence suggesting price might be too low:
  - The baseline statistical expectation (USGS long‑run average ~16–18 per year) implies an 84–88% chance of ≥1 M7 in the remaining 43 days — i.e., the market price (81.5%) is modestly lower than those Poisson estimates (difference ~3–7 cents depending on the baseline rate used). That suggests a small underpricing if traders implicitly used the long‑run average and Poisson timing.
  - Global counts are relatively stable year to year; absent a large clustering signal (which I did not find for the current window), the long‑run rate is a sensible baseline for short windows.
- Evidence suggesting price might be reasonable or too high:
  - Year‑to‑year variability is large for M7 counts (USGS shows annual counts vary substantially). Short windows can deviate from long‑run averages; some years produce few M ≥ 7 events in a given interval.
  - Earthquakes are not perfectly Poisson — temporal clustering/aftershock sequences can concentrate events, but that mostly affects localized increases after a large quake; I found no large event inside the market window to create a strong clustering signal that would raise short‑term probability above the long‑run baseline.
  - The market’s tight spread (3¢) and low total volume ($5.6k) suggest automated liquidity provision or an informed market maker; a maker may price conservatively (slightly lower) relative to a naive Poisson estimate to manage tail risk and avoid being picked off by quick informed trades.
  - The USGS resolution timing and the 24‑hour revision window introduce operational risk (magnitude revisions downward), which rationally lowers the market’s immediate price relative to a raw Poisson calc that ignores small chance of revision below 7.0.

Source credibility and recency
- USGS (earthquake lists & statistics) — authoritative, directly used as resolution source; very high credibility and recent.
- California Geological Survey / other government pages — high credibility, consistent with USGS statistics about average rates.
- AP News — high credibility for event reporting (Feb 22 M7.1) and useful to confirm no later M7 news coverage between Feb 27 and Mar 18.
- I did not rely on prediction‑market sites per the user’s instruction; I used primary sources and major news outlets.

3) MARKET EFFICIENCY ANALYSIS
- Reasonable interpretation of the current price (81.5%):
  - If traders use a conservative baseline (e.g., long‑run rate ≈16/year rather than 18/year) and factor in event randomness, reporting/revision risk, and the fact that ~19 days of the market window already passed without a M≥7, an 81.5% market price is reasonable.
  - The market’s low total volume ($5.6k) with a tight spread suggests market‑maker liquidity rather than a fully diversified crowd of independent informed traders. That can produce a stable price near the maker’s model rather than a fully information‑arbitraged price.
- Could the price reflect a single/few traders?
  - Yes — low volume markets can be dominated by one or a handful of active participants or a liquidity provider. The tight spread suggests a market maker is present; the maker may be using a simple Poisson/annual‑rate model but applying a conservative discount for operational risk.
- Is low volume because “obvious” or because traders haven’t engaged?
  - Global M≥7 events are frequent enough that a straightforward statistical price is available; few sophisticated traders may see a low-arb opportunity because the implied edge is small (a few cents). That can explain low engagement: the expected edge from exploiting a small ~3–7 cent mispricing is small relative to risk and capital friction for traders.

4) MISPRICING ASSESSMENT (apply the critical check)
- My baseline Poisson calculations (using USGS average rates) place short‑term probability in the mid‑80s to high‑80s percent (≈84.8–88.0% depending on the assumed annual rate). The market is at 81.5% — a modest difference.
- Critical checks:
  - Did I misunderstand the resolution window or a technicality? No — the market description and USGS resolution source are straightforward: events must be recorded by USGS in the market window. I verified the Feb 22 M7.1 was outside the market’s creation date, and I found no evidence of any M ≥ 7.0 after creation up to Mar 18.
  - Could informed traders know something I don’t? Possible but unlikely for global M≥7 counts: there is no reliable short‑term predictor that would produce a materially lower probability (e.g., global physical precursors). The main legitimate adjustments are (a) using a lower long‑run annual rate, (b) discounting for reporting/revision risk, and (c) acknowledging year‑to‑year variability.
  - Is the market price inconsistent with a charitable informed‑trader model? No — if an informed participant uses a conservative annual rate (≈16/year), discounts for catalog/revision risk, and recognizes the portion of the window already elapsed without an event, 81.5% is within the plausible range. Therefore the price difference is small and plausibly explained.

Conclusion on mispricing
- There is modest evidence (USGS long‑run averages → Poisson calc) that the market might be slightly undervalued by a few cents (roughly 3–7 cents), but this is not strong or unambiguous. The most charitable interpretation of the market is that it reflects a conservative model (lower baseline, revision/operational risk, and the fact some of the window has already elapsed with no event) rather than a clear arbitrageable mispricing.
- I would NOT conclude a large (>20¢) mispricing; the discrepancy is small and plausibly explained by sensible adjustments that traders would make.

5) EXPECTED VALUE CALCULATION
- Strength of evidence: I assess the strength (how confident the evidence indicates a missing factor from market price) at ≈ 60%. Reason: USGS statistics are high quality and give a clear baseline, but year‑to‑year variability and operational/resolution issues leave meaningful uncertainty.
- Magnitude of mispricing (best estimate): about 5 cents (midpoint of plausible 3–7 cent range).
- Expected value = Strength × Magnitude = 0.60 × 5 cents = 3.0 cents.

6) CONFIDENCE
- My confidence in this assessment: medium.

Final lines (required)
EXPECTED_VALUE: 3.0
SUMMARY: Using USGS historical rates (~16–18 M≥7 events/year) and a simple Poisson approximation, the chance of at least one M≥7 in the remaining Mar 18 → Apr 30, 2026 window is in the mid‑80s–high‑80s percent, slightly above the market price (81.5%). The market may be modestly undervalued by a few cents, but the difference is small and plausibly explained by conservative modeling, reporting/revision risk, and year‑to‑year variability — not clear evidence of a large mispricing.
CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [Lists, Maps, and Statistics — Earthquake Hazards Program](https://earthquake.usgs.gov/programs/earthquake-hazards/lists-maps-and-statistics)
**Author:** U.S. Geological Survey (Earthquake Hazards Program) | **Published:** Unknown

This USGS page provides the authoritative historic counts and lists (world and U.S.) of earthquakes by magnitude and year (tables for 2000–2021 are included). The table for worldwide counts shows annual numbers of M 7–7.9 events in the mid‑teens to high‑teens per year (examples ~14–23 depending on year), supporting a long‑run average near ~16–18 events/year. This is the primary statistical basis for converting an annual rate into a short‑window probability (Poisson approximation). It strongly supports the conclusion that a short 43‑day window has a high probability (mid‑80s%) of at least one M≥7 event, which slightly challenges a market price of 81.5% but does not prove a large mispricing.

### [A powerful magnitude 7.1 earthquake shakes parts of Malaysia, USGS says — AP News](https://apnews.com/article/81fa42829a4337e6e9adb79421555f08)
**Author:** Associated Press | **Published:** 2026-02-22

News report of a M 7.1 earthquake near Sabah, Malaysia on Feb 22, 2026 (deep event). This item is relevant because it shows a recent M≥7 event in 2026, but occurred before the market’s creation date (market age implies creation ≈ 2026-02-27). Therefore it does not qualify for this market’s window — an important check (if a qualifying event had already occurred after market creation the market would be determined). The AP report confirms the timing and that there were no immediate large impacts listed; it also illustrates how individual large events are reported and later entered into USGS catalogs.

### [Earthquakes — Significant Earthquakes / Earthquake Information (California Geological Survey)](https://conservation.ca.gov/cgs/earthquakes/significant)
**Author:** California Geological Survey | **Published:** Unknown

A state‑level authoritative page summarizing earthquake classifications and typical annual frequencies (page reproduces common authoritative figures stating roughly 18 events/year for magnitude 7.0–7.9). This corroborates the USGS figures and provides an independent government source for the long‑run frequency estimate used to derive short‑term probabilities. It supports the argument that a multi‑week window has a high prior probability of seeing at least one M≥7 event.

### [Are US earthquakes becoming more costly? — USAFacts](https://usafacts.org/articles/are-us-earthquakes-becoming-more-costly/)
**Author:** Unknown | **Published:** 2024-01-01

This analysis of recent earthquake statistics cites annual earthquake counts (examples: 19 M≥7 in 2023) and explains magnitude categories and their typical yearly frequencies. It reinforces the same order‑of‑magnitude baseline (mid‑teens to ~20 M≥7 per year) and helps justify the Poisson short‑window conversion used in the analysis. While not the primary USGS source, it provides a recent presentation of data that aligns with USGS historical counts and helps contextualize year‑to‑year variability.
