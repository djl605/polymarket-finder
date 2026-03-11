# Research: Will OpenAI GPT score at least 50% on Humanity’s Last Exam?

**Market ID:** 0xc3bb9eb2c758cd71f7a59199c27bf3f20c9e1d929687c72b20c8d06076c45c78
**Researched At:** March 11, 2026 at 04:56:40 AM UTC
**Search Query:** "Will OpenAI GPT score at least 50% on Humanity’s Last Exam?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 3.1¢

### Summary

Official evidence shows OpenAI’s best GPT model is still well below the 50% HLE threshold on the resolution leaderboard, which supports a cautious view. However, frontier HLE performance is advancing rapidly, with Google already near or above 50% in some configurations and OpenAI having just shipped GPT-5.4, so the 29.5% price may be modestly low but not obviously badly mispriced.

### Full Analysis

1. **Context analysis**

This market resolves **YES** if, by **June 30, 2026 at 11:59 PM ET**, the official Humanity’s Last Exam leaderboard lists **any OpenAI GPT model** at **50% or higher**. It resolves **NO** otherwise. The operative details are important: it must be an **OpenAI GPT-branded model**, it must appear on the **official Scale/Labs leaderboard**, and the score threshold is a hard **50%**. ([scale.com](https://scale.com/leaderboard/humanitys_last_exam))

That means evidence about OpenAI’s general research progress is only indirectly relevant. What matters most is: (a) current leaderboard scores for OpenAI GPT models, (b) the recent pace of improvement on HLE, (c) whether OpenAI is likely to release or have evaluated a stronger GPT model before June 30, 2026, and (d) whether methodological quirks could make “50% on the official leaderboard” harder than informal claims suggest. ([scale.com](https://scale.com/leaderboard/humanitys_last_exam))

2. **Evidence evaluation**

**Most important current fact:** the official leaderboard currently shows **gpt-5.4-2026-03-05 (xhigh thinking)** at **36.24% ± 1.88**, while older OpenAI GPT entries are lower: **gpt-5-pro-2025-10-06 at 31.64% ± 1.82**, **gpt-5.2 at 27.80% ± 1.76**, and **gpt-5 at 25.32% ± 1.70**. The leaderboard leader overall is not OpenAI but **Gemini 3 Pro Preview at 37.52% ± 1.90** on the currently visible official page. That puts OpenAI GPT models well below the 50% threshold right now. ([scale.com](https://scale.com/leaderboard/humanitys_last_exam))

**Bullish evidence against the 29.5% price being too low:** Google DeepMind reports much higher HLE results when tools are allowed: on its Gemini 3 page, **Gemini 3.1 Pro Thinking (High)** scores **44.4% with no tools** and **51.4% with Search (blocklist) + Code**; **Gemini 3 Pro Thinking (High)** scores **37.5% no tools** and **45.8% with tools**. This matters because it suggests frontier models are nearing or crossing 50% on HLE-like evaluations when augmented, which implies the benchmark is no longer impossibly far from saturation. If OpenAI releases another GPT iteration with strong tool use and Scale adds it to the leaderboard under comparable conditions, 50% is not absurdly distant. ([deepmind.google](https://deepmind.google/gemini))

A second bullish datapoint is OpenAI’s own release material for **GPT-5.4**. OpenAI highlights broad gains in reasoning, browsing, tool use, and knowledge-work performance relative to GPT-5.2, with especially strong agentic improvements on benchmarks like BrowseComp and Online-Mind2Web. While OpenAI’s release page does not straightforwardly present the English HLE table in the snippet we fetched, it clearly supports the broader thesis that GPT capability is still moving quickly in early March 2026. Since the market has more than three months left from March 11, 2026, a further GPT refresh before June 30 is plausible. ([openai.com](https://openai.com/sq-AL/index/introducing-gpt-5-4/?utm_source=openai))

A third bullish input is the original HLE paper’s own forecast language. At launch, HLE creators wrote that, given the pace of AI progress, it was “plausible” that models could exceed **50% by the end of 2025**, and Live Science reported that by **February 12, 2026** the best achieved score was already **48.4%** by Google’s Gemini 3 Deep Think. That does not directly answer the OpenAI-GPT-specific question, but it does show that 50% is near the frontier rather than a remote longshot. ([livescience.com](https://www.livescience.com/technology/artificial-intelligence/acing-this-new-ai-exam-which-its-creators-say-is-the-toughest-in-the-world-might-point-to-the-first-signs-of-agi))

**Bearish evidence supporting the current 29.5% as reasonable:** the strongest bearish point is simply the gap. On the official leaderboard, OpenAI’s best visible GPT score is **36.24%**, which is roughly **13.8 percentage points** below the target. That is a very large benchmark jump over just 111 days from March 11 to June 30, especially on a benchmark intentionally designed to retain headroom and resist saturation. ([scale.com](https://scale.com/leaderboard/humanitys_last_exam))

Another bearish point is that the market is not asking whether **any OpenAI system** can exceed 50% under any setup. It asks specifically whether an **OpenAI GPT** model appears at 50%+ on the **official leaderboard**. That excludes evidence from non-GPT OpenAI systems and may exclude some custom agentic or best-of-N systems. This is crucial because one recent paper, **“AI Passes Humanity’s Last Exam,”** reports **53% accuracy**, but it achieves that via a **Best-of-N rejection sampling system** built from multiple models and routing strategies, not by a single OpenAI GPT leaderboard entry. It is therefore not directly resolution-relevant and could mislead a casual trader into overestimating the true probability. ([openreview.net](https://openreview.net/pdf/c7297f8a4bfee647b1ed8c85a5b82ebf6d8e5679.pdf))

There is also methodological uncertainty. Scale’s leaderboard says it evaluates models on all public HLE questions automatically, with temperature 0 and its own judging pipeline, and notes that prompt/judge differences can create small differences. Meanwhile, a February 2026 paper, **HLE-Verified**, argues the benchmark contains a “non-trivial” number of noisy items that can distort comparisons. That cuts both ways, but it is a reminder that not every flashy outside claim maps neatly onto the official leaderboard used for resolution. ([scale.com](https://scale.com/leaderboard/humanitys_last_exam))

Finally, official sources do not yet show OpenAI publicly claiming a **50%+ official HLE score** for any GPT model. OpenAI’s current public story emphasizes major gains on other benchmarks and workflows, but absent a direct official claim or leaderboard listing near 50%, traders may reasonably discount the chance of hitting the threshold within just a few months. ([scale.com](https://scale.com/leaderboard/humanitys_last_exam))

**Source credibility and recency:** the strongest sources here are the official **Scale/Labs leaderboard**, **OpenAI** release pages, **Google DeepMind** benchmark page, and the original **HLE paper** plus **HLE-Verified** on arXiv/OpenReview. These are all current or near-current and directly relevant. Live Science is secondary but useful mainly because it cites the benchmark creators’ forecast and the February 2026 state of play. The weak source in the set is the “AI Passes Humanity’s Last Exam” paper for market-resolution purposes: it may be technically interesting, but it is not a direct guide to whether the official leaderboard will show a qualifying GPT entry. ([scale.com](https://scale.com/leaderboard/humanitys_last_exam))

3. **Market efficiency analysis**

A reasonable interpretation of **29.5%** is: “OpenAI is improving quickly, 50% is within striking distance for frontier models, and there is time for another release, but the current official GPT score is still far below threshold and the exact resolution criteria are narrower than generic AI-progress headlines suggest.” That interpretation is coherent and matches the mixed evidence fairly well. ([scale.com](https://scale.com/leaderboard/humanitys_last_exam))

The market’s **$0 total volume** is a big warning sign. With essentially no trading history, this price is weak evidence of consensus and could easily reflect one participant’s guess or a placeholder quote rather than informed aggregation. The tight spread is somewhat reassuring mechanically, but without volume it does not prove informational efficiency. In other words, the price may be *fragile* rather than *wise*. This makes moderate mispricing plausible, though it does not itself tell us the direction. 

Why might informed traders still land near 30%? Because there are two opposing realities: progress is fast enough that 50% no longer sounds crazy, but the official GPT leaderboard numbers are still materially short of the bar, and only about three and a half months remain. A sub-1-in-3 probability is therefore not obviously irrational.

4. **Mispricing assessment**

I do **not** see strong evidence of a dramatic mispricing. I do see **some credible evidence that 29.5% may be a bit low**, but the case is moderate, not overwhelming.

The best argument for undervaluation is that frontier HLE performance is approaching 50% quickly: Gemini has reportedly hit **48.4%** in February 2026 and tool-augmented Gemini results exceed **50%** on DeepMind’s published page. OpenAI also just released GPT-5.4 on **March 5, 2026**, indicating the relevant product family is still advancing. If one believes another GPT evaluation or release could arrive before June 30, a probability meaningfully above 29.5% is defensible. ([livescience.com](https://www.livescience.com/technology/artificial-intelligence/acing-this-new-ai-exam-which-its-creators-say-is-the-toughest-in-the-world-might-point-to-the-first-signs-of-agi))

But the best argument against calling it mispriced is stronger than it first appears: the official leaderboard currently has OpenAI GPT at only **36.24%**, and the market requires not “continued progress” but a specific **50%+ official leaderboard listing** for a GPT model by a fixed date. The existence of outside systems that “pass HLE” using ensembles or best-of-N does not satisfy that. This exact-criteria issue is precisely the kind of technicality that often keeps seemingly obvious markets from being mispriced. ([scale.com](https://scale.com/leaderboard/humanitys_last_exam))

So my objective bottom line is: **there is limited evidence of mild undervaluation, but not strong enough to call this a clear mispricing.** If forced, I would lean that fair odds are somewhat above 29.5%, perhaps in the **mid-30s**, driven by rapid model progress and the remaining timeline. But I would be cautious because large jumps on HLE are hard, official evaluation criteria matter, and low-volume markets often tempt overconfidence.

5. **Expected value calculation**

- **Strength of evidence:** 45%  
  The evidence for a modest undervaluation is real but indirect. The most relevant facts are official and recent, yet they do not directly show OpenAI close enough to 50% on the official leaderboard to make a strong claim.
- **Magnitude of mispricing:** 7 cents  
  My best estimate is that if mispriced, it is probably by a small-to-moderate amount rather than a huge gap.
- **Expected value:** 0.45 × 7 = **3.15 cents**

EXPECTED_VALUE: 3.15
SUMMARY: Official evidence shows OpenAI’s best GPT model is still well below the 50% HLE threshold on the resolution leaderboard, which supports a cautious view. However, frontier HLE performance is advancing rapidly, with Google already near or above 50% in some configurations and OpenAI having just shipped GPT-5.4, so the 29.5% price may be modestly low but not obviously badly mispriced.
CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [Scale | SEAL Leaderboard: Humanity's Last Exam | Scale Labs](https://labs.scale.com/leaderboard/humanitys_last_exam)
**Author:** Unknown | **Published:** Unknown

This is the official resolution source for the market, so it is the most important document. It states the evaluation methodology, including that models are evaluated on all public HLE questions with temperature 0 and automatic judging, and it lists current scores for OpenAI GPT models. As of the fetched page, gpt-5.4-2026-03-05 scores 36.24%, with older GPT models lower, which materially challenges the case that 50% is likely by June 30, 2026. It supports the current market price as at least plausible because the visible gap to the threshold remains large.

### [Gemini 3 — Google DeepMind](https://deepmind.google/models/gemini/)
**Author:** Google DeepMind | **Published:** Unknown

This official Google DeepMind page provides benchmark results for Gemini 3 models on Humanity’s Last Exam. It reports 44.4% for Gemini 3.1 Pro Thinking (High) with no tools and 51.4% with Search + Code, while Gemini 3 Pro Thinking (High) scores 37.5% no-tools and 45.8% with tools. These results are highly relevant because they show frontier models are close to or above 50% on HLE-like evaluations in early 2026, which supports the argument that OpenAI could plausibly get there before the deadline. At the same time, they are not direct evidence that an OpenAI GPT model will satisfy the official leaderboard criterion.

### [Introducing GPT-5.4 | OpenAI](https://openai.com/fil-PH/index/introducing-gpt-5-4/)
**Author:** OpenAI | **Published:** 2026-03-05

This official OpenAI release page documents GPT-5.4 as a new model launched on March 5, 2026 and highlights broad improvements in reasoning, browsing, tool use, and professional knowledge tasks over GPT-5.2. While the fetched excerpt does not provide a clean English HLE headline, it clearly shows OpenAI is still improving the GPT line very recently. That matters because the market runs through June 30, 2026, leaving time for newly launched or soon-to-be-evaluated GPT models to improve further. The source therefore modestly challenges a very bearish interpretation of the market.

### [Acing this new AI exam — which its creators say is the toughest in the world — might point to the first signs of AGI | Live Science](https://www.livescience.com/technology/artificial-intelligence/acing-this-new-ai-exam-which-its-creators-say-is-the-toughest-in-the-world-might-point-to-the-first-signs-of-agi)
**Author:** Unknown | **Published:** 2026-03-04

This recent news article summarizes the benchmark and reports that as of February 12, 2026, the highest score achieved was 48.4% by Google’s Gemini 3 Deep Think. It also cites the benchmark creators’ earlier statement that it was plausible models could exceed 50% by the end of 2025, illustrating how quickly expectations have shifted. The article is useful context showing that 50% is near the frontier rather than an implausible moonshot. However, it remains secondary reporting and does not directly establish that OpenAI GPT is likely to clear the threshold on the official leaderboard.

### [Humanity’s Last Exam](https://openreview.net/pdf?id=VpBafaplZ2)
**Author:** Unknown | **Published:** 2025-04-19

This is the benchmark paper describing Humanity’s Last Exam, its purpose, authorship, and design as a difficult frontier benchmark spanning many expert domains. It is relevant because it clarifies that HLE was intentionally built to retain headroom and avoid easy saturation, making large short-term gains more difficult than on older benchmarks. That background supports skepticism toward any assumption that 50% is easy just because other benchmarks have saturated. The paper also underlies the market’s exact meaning and should temper overconfident bullish takes.

### [AI Passes Humanity’s Last Exam](https://openreview.net/pdf/c7297f8a4bfee647b1ed8c85a5b82ebf6d8e5679.pdf)
**Author:** Unknown | **Published:** 2025-12-10

This paper claims a 53% score on HLE, but it achieves that through a Best-of-N rejection sampling and model-routing system rather than a single official leaderboard GPT entry. It is highly relevant because it may tempt traders into thinking the market is nearly resolved already, when in fact the market requires a qualifying OpenAI GPT model on the official leaderboard. Thus, the source is more important as a warning about a possible analytical pitfall than as direct bullish evidence. It challenges simplistic interpretations and supports caution about calling the market obviously mispriced.

### [HLE-Verified: A Systematic Verification and Structured Revision of Humanity's Last Exam](https://arxiv.org/abs/2602.13964)
**Author:** Unknown | **Published:** 2026-02-15

This recent paper argues that Humanity’s Last Exam contains a non-trivial number of noisy items and presents a revised verification protocol. It matters because it highlights that HLE comparisons can be sensitive to benchmark quality and evaluation choices, which may create discrepancies between public claims and official leaderboard outcomes. For the market, this means informal or external results should not be mapped too confidently onto the resolution source. The source supports a cautious stance and slightly strengthens the case that the current price could be reasonable despite rapid model progress.
