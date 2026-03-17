# Research: AI wins IMO gold medal in 2026?

**Market ID:** 0x2f64500bd8486552cede9c823a97ff964c5fdc3b99b4debc07635bd664a5e6bb
**Researched At:** March 17, 2026 at 05:35:32 AM UTC
**Search Query:** "AI wins IMO gold medal in 2026?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 13.3¢

### Summary

Strong public technical progress (DeepMind’s AlphaProof/AlphaGeometry2 and active AIMO progress prizes) makes an AI‑win in 2026 plausible, but neither the IMO Grand Challenge nor AIMO has publicly declared a model has won their grand prize/challenge as of March 17, 2026. Given the strict formal contest rules and the market’s low volume, the present 71.5% price looks optimistic and likely overstates the publicly verifiable probability.

### Full Analysis

Plan and quick note on scope
- I searched primary sources (IMO Grand Challenge website, the AIMO prize site) plus direct research outputs from major AI labs (DeepMind) and a peer-reviewed paper describing AlphaGeometry2. I focused on authoritative pages that define resolution rules and on recent technical claims about AI performance on IMO-style problems.
- Key constraint for the market: it resolves YES only if either the IMO Grand Challenge or the AIMO Prize explicitly demonstrates that “an AI has won the challenge/prize” before Dec 31, 2026 (per the market description). That means an official statement / award according to the rules on those sites is what matters for resolution, not informal press coverage or third‑party claims.

1) CONTEXT ANALYSIS
- What the market asks: “AI wins IMO gold medal in 2026?” Per the market text, resolution is tied to two specific sources: the IMO Grand Challenge site (imo-grand-challenge.github.io) and the AIMO Prize site (aimoprize.com). The market resolves YES if either source demonstrates that an AI has “won the challenge/prize” before Dec 31, 2026, 23:59 ET.
- What would need to happen for YES:
  - If IMO Grand Challenge: the organizers must declare that an AI has completed the Grand Challenge under the Grand Challenge rules. The IMO Grand Challenge’s published proposal requires F2F-style formal proofs (formal-to-formal / Lean), proofs that are machine-checkable within the specified time bound, reproducible/open-source model release before the first day of the IMO variant used, and scoring sufficient to be a gold-medal equivalent under the F2F point rules. An official statement on the IMO Grand Challenge site or by its committee indicating “challenge completed / winner declared” would be the trigger.
  - If AIMO Prize: AIMO must formally award its grand prize (or otherwise declare a model to have performed at an “equivalent to a gold medal” standard in an AIMO‑approved competition and satisfied its public‑sharing protocol). An explicit AIMO prize announcement on aimoprize.com or their official updates page is the trigger.
- What would be NO: neither the IMO Grand Challenge nor AIMO publishes any such declaration or award by Dec 31, 2026.

2) EVIDENCE EVALUATION (all relevant evidence, pro and con)
A. Evidence showing AI progress (supports a materially elevated probability vs naïve baseline)
- DeepMind (official blog + research) reports: DeepMind’s AlphaProof + AlphaGeometry2 system achieved silver‑medal–level performance on IMO 2024 problems (28/42 points), with authoritative mathematicians scoring the solutions. The DeepMind post and accompanying JMLR paper document techniques, partial automation, and backstops (formalization in Lean, symbolic engines, published solutions). These are high‑credibility, recent, and directly relevant evidence that AI reasoning on IMO problems has advanced rapidly (supports traders who think gold is imminent). (DeepMind blog; JMLR paper.)
- AlphaGeometry2 (JMLR paper) shows very strong performance on IMO geometry problems: e.g., 84% solve rate across 2000–2024 IMO geometry problems and automated diagram + proof capabilities for many geometry items. This is peer‑reviewed / archival research from the DeepMind team and shows concrete technical capability on a major IMO subdomain (geometry). It raises plausibility that full-IMO gold could be achieved sooner than older priors implied. (JMLR paper.)
- AIMO operational progress: AIMO has run multi-stage progress prizes (AIMO1, AIMO2, AIMO3 launched Nov 2025), with winners for progress prizes (Project Numina, NemoSkills). AIMO is explicitly designing competitions whose top-end targets are “IMO-equivalent” performance and requires public sharing for grand-prize eligibility. The contest infrastructure and prize funding increase the odds that benchmarks and competitions will produce a declared winner in 2026. (AIMO updates / About pages.)

B. Evidence limiting/imposing friction (supports a lower probability)
- The IMO Grand Challenge’s published rules impose specific constraints that are nontrivial: formal-to-formal (Lean) proofs, proofs must be machine‑checkable by the Lean kernel within ~10 minutes, the AI must be open‑source and reproducible before the first day of the IMO, and the F2F time bound (4.5 hours per 3 problems) is enforced. Many high‑profile research results (including DeepMind’s 2024 silver result and some 2025 reports) used manual formalization of problems, extra time (days), and/or closed infrastructure — i.e., they did not meet the IMO Grand Challenge’s full F2F + pre‑release + open‑source constraints. The Grand Challenge page explicitly describes those rules; that’s the authoritative resolution standard.
- No public declaration from either the IMO Grand Challenge or AIMO that a model has “won the challenge/prize” as of today (March 17, 2026). AIMO has awarded progress prizes but has not (in public updates) awarded the $5M grand prize; IMO Grand Challenge site has not posted a “challenge complete / winner” statement. The market’s resolution depends on such an explicit demonstration/award, so progress reports or lab claims do not by themselves resolve the market.
- Technical caveats in AlphaGeometry2: the JMLR paper itself documents limitations (e.g., domain language gaps, remaining unsolved techniques, some code and full training stacks not publicly runnable because they depend on internal infrastructure). Several authors explicitly note some problems remain unformalizable in their setup. This weakens the inference “DeepMind has already satisfied IMO Grand Challenge criteria.”
- Some reports of “gold‑medal” performance by other groups (various preprints/blogs claiming gold-level on IMO 2025 problems) exist, but these are mixed in quality and often describe internal/closed evaluations or evaluate on selected problem sets rather than demonstrating compliance with IMO Grand Challenge / AIMO public-sharing protocols. These claims require careful verification against the resolution authorities.

C. Source credibility and recency
- IMO Grand Challenge site: authoritative source describing resolution criteria (high credibility for rule interpretation; date is current). (High credibility.)
- AIMO site and its updates: authoritative about AIMO prize rules, progress prizes, winners, and the status of AIMO competitions (high credibility on prize status). (High credibility.)
- DeepMind blog + JMLR paper (AlphaGeometry2): high credibility for the technical achievements reported; peer‑reviewed JMLR paper + official DeepMind blog are strong evidence for technical capability in geometry. (High credibility on technical capability, but not necessarily satisfying contest constraints.)
- Other claims (blogs, smaller preprints, and community posts) vary widely in credibility; treat as lower‑quality unless they explicitly show AIMO/IMO‑GC recognition or reproducible open releases.

D. Bullish vs Bearish summary
- Bullish: major labs have demonstrated or published gold/silver‑level subcomponents; AIMO competitions are active, publicly incentivizing open models; momentum and compute access (AIMO3, Kaggle, H100s, partnerships) make a 2026 success plausible to many.
- Bearish: formal contest constraints (Lean formalization, open-source before the first day, 4.5‑hour time limit, no internet during run) are specific and stricter than many research demonstrations; no official award has been posted by AIMO or IMO Grand Challenge yet; recent papers show limitations and private/internal infrastructure dependence.

3) MARKET EFFICIENCY ANALYSIS
- Why 71.5% could be justified: traders may be pricing in the combination of (a) rapid technical progress (DeepMind AlphaProof/AG2, other groups claiming gold‑level at times), (b) AIMO’s active contests and escalating difficulty and compute support (AIMO3 launched Nov 2025 with explicit tie‑ins to IMO 2026 AI Day), and (c) the fact that AIMO’s grand prize requires publicly shared models — which some teams (Project Numina, NemoSkills) have been releasing — creating a credible path to a declared winner in 2026.
- Why 71.5% could be the view of only a few traders: the market has extremely low total trading volume ($0 on this market as shown), yet a tight spread (1.0¢). Low volume + tight spread implies prices may be set/maintained by one or few traders (or a liquidity bot) expressing strong conviction; there is not much evidence of aggregation across many informed participants.
- Low volume interpretation:
  - If the event is seen as near‑certain by a small number of insiders or convinced observers (because they’ve seen unpublished demos or private test‑results), low volume could still carry an informative price — but that hinges on private information (which we cannot verify).
  - Alternatively, low trading could mean informed speculators haven’t engaged (market overlooked), so the price could be fragile and easily moved by more information or a few trades.
- Time horizon and uncertainty: the market resolves at end of 2026, which is a near‑term window. Technical progress has been fast over 2024–2025, but the final leap to satisfy formal, reproducible contest constraints (for either IMO Grand Challenge or AIMO grand prize) still faces nontrivial engineering and policy hurdles (open‑sourcing, timing of releases, reproducibility). That increases residual uncertainty.

4) MISPRICING ASSESSMENT (weighing both sides; critical check)
- My read of the evidence:
  - Strong technical progress exists and makes the event plausible within 2026 (this supports a materially elevated probability vs long‑term naive priors).
  - However, as of March 17, 2026 there is no public announcement from either of the two resolution authorities (IMO Grand Challenge or AIMO) that an AI has won their prize/challenge. The formal constraints (open source prior to first day, machine‑checkable Lean proofs within the contest setup, no internet queries, reproducibility) remain key gating factors.
  - Therefore the crucial question is whether the likely path to “official declared winner by AIMO or IMO‑GC” in 2026 is more likely than not. I judge that plausible but not yet overwhelming.
- Numeric rough probability (my best estimate based on the facts collected):
  - I assess approximately a 40–50% chance that AIMO or the IMO Grand Challenge will publicly declare an AI has met their prize/challenge rules during calendar year 2026. I lean toward the lower half of that band because of the formal constraints and lack of any announcement to date. For a point estimate I use ~45%.
- Compare to market: market price = 71.5% → implied probability significantly higher than my estimate → suggests overpricing risk on the order of ~26.5 percentage points (i.e., ~26.5 cents).
- Critical check (why might I be missing something?):
  - Could traders have private information (e.g., private demos, pre-release codes, or private communications with AIMO/IMO‑GC) that make 2026 success very likely? Yes — that would rationalize a high price. I have not found any authoritative public statement to confirm those private signals.
  - Could the market interpret “AIMO demonstrates” more liberally (e.g., awarding progress prize vs grand prize)? The market description explicitly ties resolution to “the IMO Grand Challenge and the Artificial Intelligence Math Olympiad (AIMO). If either source demonstrates that an AI has won the challenge/prize before the resolution date, this market will resolve to 'Yes'.” That language points to the grand prize / challenge success rather than progress prizes. AIMO progress prizes have been awarded (and are public), but they are not the grand prize; unless AIMO’s own publications state the grand prize is awarded, the market should not resolve YES on a progress prize alone. Traders who misread progress prizes as equivalent could be mistaken; I did not find language equating progress prizes to “winning the grand prize.”
  - Re‑read resolution criteria: I verify that both resolution authorities are explicitly named in the market text; only their demonstration/award triggers YES. So informal lab claims or preprints that do not result in an award or a formal IMO‑GC/AIMO declaration should not resolve the market.

5) EXPECTED VALUE CALCULATION (estimate of value of investigating / trading)
- Strength of evidence that the market is mispriced (subjective): I judge evidence strength medium — roughly 50%. Reason: high‑quality public technical work makes a 2026 win plausible and raises probability, but the lack of any award/recognition and the formal constraints are substantial counterweights.
- Magnitude of mispricing (price difference): market probability 71.5% minus my point estimate 45% ≈ 26.5 percentage points = 26.5 cents.
- Expected value = Strength × Magnitude = 0.50 × 26.5 ≈ 13.25 cents.

6) CONFIDENCE
- I rate my confidence in this assessment as: medium. (There is accessible high‑quality evidence in both directions and a nontrivial chance of private information or last‑minute announcements that would change the picture.)

Short recommendation / practical takeaway
- There is credible, recent technical progress (DeepMind and other groups) that makes an AI gold‑level performance plausible. But as of March 17, 2026 there is no publicly posted award or declaration by either of the two resolution authorities required by the market. Given the market’s low volume and very tight spread, the current 71.5% price appears optimistic and likely overstates the objectively verifiable chance of a formally declared winner by the two named authorities in 2026, though private information could plausibly justify current pricing.
- If you are taking a position, do a last check for any new official statements from aimoprize.com or imo-grand-challenge.github.io before trading; that is the definitive source for resolution.

EXPECTED_VALUE: 13.25
SUMMARY: Strong public technical progress (DeepMind’s AlphaProof/AlphaGeometry2 and active AIMO progress prizes) makes an AI‑win in 2026 plausible, but neither the IMO Grand Challenge nor AIMO has publicly declared a model has won their grand prize/challenge as of March 17, 2026. Given the strict formal contest rules and the market’s low volume, the present 71.5% price looks optimistic and likely overstates the publicly verifiable probability.
CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [IMO Grand Challenge | IMO Grand Challenge for Artificial Intelligence](https://imo-grand-challenge.github.io/)
**Author:** Unknown | **Published:** Unknown

The IMO Grand Challenge site sets out the challenge to build an AI that can win a gold medal at the IMO and proposes a formal-to-formal (F2F) variant using the Lean theorem prover. Key rules stated: the AI must emit machine‑checkable Lean proofs, proofs must be checkable within ~10 minutes, the AI must be open‑source and reproducible before the first day of the IMO variant, cannot query the internet during the run, and has the human time limit (4.5 hours per 3 problems). This page is the authoritative definition of the Grand Challenge's resolution criteria and therefore directly governs whether the IMO Grand Challenge would be counted by the market for a YES resolution; it shows the technical and procedural hurdles an AI must clear to “win” according to that source.

### [AIMO Prize — About](https://aimoprize.com/about)
**Author:** Unknown | **Published:** Unknown

The AIMO Prize site describes the $10M program (with a $5M grand prize) launched to incentivize open AI models that can reason at IMO gold standard. It states the grand prize will be awarded when a publicly shared AI model performs at IMO‑gold equivalent in an AIMO‑approved competition and adheres to public sharing protocols. The page clarifies that AIMO runs independent competitions and progress prizes to accelerate development. This is the authoritative source for what AIMO would require to award the grand prize (and therefore what would count as a resolution to YES under the market).

### [AIMO — Updates (Third $2.2 million AIMO progress prize launched; AIMO progress prize results)](https://aimoprize.com/updates)
**Author:** Unknown | **Published:** 2025-11-19

The AIMO updates page documents AIMO’s operational progress: AIMO1 (July 2024) was won by Project Numina, AIMO2 closed in April 2025 with NemoSkills top on the leaderboard, and AIMO3 launched in November 2025 with raised difficulty and greater compute resources (H100s). The page emphasizes that AIMO’s grand prize will be awarded to the first publicly shared model achieving IMO‑gold equivalent in an approved competition and notes AIMO3 will showcase winners at AI Day at the 2026 IMO. This shows that AIMO has active, escalating competitions (which increases the plausibility of a 2026 grand-prize claim) but also shows the organization has not (as of this update) awarded the grand prize.

### [AI achieves silver-medal standard solving International Mathematical Olympiad problems — Google DeepMind (blog)](https://deepmind.google/blog/ai-solves-imo-problems-at-silver-medal-level/)
**Author:** AlphaProof and AlphaGeometry teams | **Published:** 2024-07-25

The official DeepMind blog reports that the combined AlphaProof and AlphaGeometry2 system achieved 28/42 on the IMO 2024 problems (silver‑medal level), including formalized proofs scored by prominent mathematicians (Timothy Gowers and Joseph Myers). The blog explains that problems were manually translated to a formal language and that some problems took days to solve, noting the system did not meet contest timing. This is high‑quality evidence of substantial technical progress but also documents gaps (manual translation, extra compute/time) that matter relative to the IMO Grand Challenge/AIMO contest rules.

### [Gold‑medalist Performance in Solving Olympiad Geometry with AlphaGeometry2 (JMLR paper, PDF)](https://jmlr.org/papers/volume26/25-1654/25-1654.pdf)
**Author:** Yuri Chervonyi; Trieu H. Trinh; Miroslav Olšák; Xiaomeng Yang; Hoang H. Nguyen; Marcelo Menegali; Junehyuk Jung; Junsu Kim; et al. | **Published:** 2025-10-01

This peer‑reviewed/archival paper describes AlphaGeometry2 (AG2), reporting an 84% solve rate on IMO geometry problems from 2000–2024 and showing that AG2 can output full human‑readable solutions and diagrams. The paper is explicit about remaining limitations (domain language gaps, unformalizable problem types, some code/training stacks reliant on internal infrastructure). It supplies rigorous technical evidence that geometry‑domain performance has reached/exceeded average gold‑medalist performance in that subdomain, which materially raises the prior probability that full‑IMO capability could arrive—but the paper also documents practical constraints relevant to satisfying the IMO Grand Challenge’s formal and reproducibility requirements.
