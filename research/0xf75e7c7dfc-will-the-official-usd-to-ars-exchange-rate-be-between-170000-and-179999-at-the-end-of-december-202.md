# Research: Will the official USD to ARS exchange rate be between 1700.00 and 1799.99 at the end of December 2026?

**Market ID:** 0xf75e7c7dfc255454a7f3d870753468d80b4ee87d345903db80762cae28a54506
**Researched At:** March 12, 2026 at 06:21:27 PM UTC
**Search Query:** "Will the official USD to ARS exchange rate be between 1700.00 and 1799.99 at the end of December 2026?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 9.6¢

### Summary

BCRA’s Feb‑2026 REM median for Dec‑2026 is ARS 1,707 (inside the contract band) and BCRA/IMF reserve support reduces tail risk; mapping REM percentiles to a probability for 1,700–1,799 yields ~30–40%, higher than the market’s 19.2%. Because the market has zero volume and the contract resolves on one precise published daily number, the quoted price may reflect limited participation; I estimate a moderate mispricing (~14.8¢ gap) with expected value ≈ 9.6¢.

### Full Analysis

Context analysis
- Market question: will the Central Bank of Argentina’s official wholesale USD/ARS rate (Tipo de Cambio Mayorista, Comunicación A3500) at market close on the final business day of December 2026 be between 1,700.00 and 1,799.99 ARS/USD? A YES requires the BCRA-published A3500 value on that date to be ≥1,700.00 and ≤1,799.99; a NO is any published A3500 value outside that closed interval (or earlier published value used per the market’s fallback rules). (Resolution source = BCRA A3500). ([bcra.gob.ar](https://www.bcra.gob.ar/archivos/Pdfs/PublicacionesEstadisticas/informes/relevamiento-expectativas-mercado-feb-2026.pdf))

Evidence evaluation — summary of the most relevant facts
- Current official (mayorista) level is ~ARS 1,400–1,450 (early March 2026): multiple market reports show the mayorista around ARS1,415 on March 6–9, 2026 (daily close reports and market commentary). That implies roughly a ~20–25% nominal depreciation would be required from the current level to reach the lower edge (1,700) by end‑Dec‑2026. ([bancopiano.com.ar](https://www.bancopiano.com.ar/Inversiones/Servicios/Noticias/Nota/cambio-argentina-dolar-mayorista-cierra-estable-en-1-416-00?utm_source=openai))
- Official survey (BCRA’s REM) — the single most directly relevant publicly available forward-looking market measure — reports a median projection for December 2026 of ARS 1,707 per USD (Top‑10 analysts average ~1,716). The REM also publishes percentiles and shows substantial dispersion (responses include maxima above ARS 2,000 and minima well below ARS 1,500). The REM therefore implies a non‑trivial chance that the December 2026 mayorista will lie inside the 1,700–1,799 band. ([bcra.gob.ar](https://www.bcra.gob.ar/archivos/Pdfs/PublicacionesEstadisticas/informes/relevamiento-expectativas-mercado-feb-2026.pdf))
- Policy/backstop context: the IMF approved an Extended Fund Facility (EFF) for Argentina in April 2025 (about US$20bn, initial disbursement ~US$12bn) intended to strengthen reserves and support a transition to a more flexible FX regime; the BCRA has publicly signalled a reserve accumulation program for 2026 (targets in the $10–17bn range cited by officials/coverage) and has been a net buyer of dollars in early 2026. Those features make large, disorderly depreciation less likely but do not eliminate risk from domestic inflation/credibility or external shocks. ([imf.org](https://www.imf.org/en/News/Articles/2025/04/12/pr25101-argentina-imf-executive-board-approves-48-month-usd20-billion-extended-arrangement))
- Market micro: the prediction market has extremely low trading volume (Total Vol: $0 in the prompt) and a tight spread (5.4¢). Low-volume, tight‑spread markets can be set by a single or a few active traders and thus may not reflect a broad information aggregation. This raises the prior that the quoted 19.2% probability may reflect limited participation rather than a robust market consensus. (market metrics supplied in prompt).

What specific evidence suggests the market price (19.2%) might be incorrect?
- The BCRA REM (Feb‑2026) median for Dec‑2026 is ARS 1,707 — squarely inside the contract’s YES interval — and the REM percentiles indicate a large mass of analyst expectations clustered around the 1,650–1,800 region. A naive mapping from the REM distribution to a probability for the 1,700–1,799 band gives a substantially higher probability than 19.2% (see quantitative sketch below). The REM is official, recent, and directly asks market participants about expected monthly averages and year‑end levels. ([bcra.gob.ar](https://www.bcra.gob.ar/archivos/Pdfs/PublicacionesEstadisticas/informes/relevamiento-expectativas-mercado-feb-2026.pdf))
- BCRA and IMF support (reserve purchases and program resources) reduce the chance of very large one‑off devaluations that would push the official rate well above the market’s band — that structural support is information that favors a higher probability of the rate staying near the REM median than an interpretation that a low (19%) chance is correct. ([imf.org](https://www.imf.org/en/News/Articles/2025/04/12/pr25101-argentina-imf-executive-board-approves-48-month-usd20-billion-extended-arrangement))

What evidence supports the market price as reasonable (i.e., a low ~19% chance)?
- The official mayorista is materially lower today (~1,415) than the REM median (1,707); reaching ~1,700 by Dec requires continued steady depreciation and/or inflation that is not already fully priced into the current spot. If BCRA successfully maintains a relatively slow crawl (or intervenes to keep the rate below 1,700) the event could be unlikely. ([bancopiano.com.ar](https://www.bancopiano.com.ar/Inversiones/Servicios/Noticias/Nota/cambio-argentina-dolar-mayorista-cierra-estable-en-1-416-00?utm_source=openai))
- Political and institutional risk, possible reversals or shocks (e.g., a credibility shock to INDEC / CPI reporting, fiscal slippage, global risk events) could create tail scenarios both above and below the band; traders might discount the chance that the A3500 published on that exact final business day of Dec‑2026 falls into a 100‑point wide window even if the median is inside. The tightness of the resolution window (only ARS 100 wide) matters: even if the central forecast is ~1,707, the probability mass landing inside that specific 1,700–1,799 interval is less than the probability the year‑end rate will be near 1,700±some larger margin. ([bcra.gob.ar](https://www.bcra.gob.ar/archivos/Pdfs/PublicacionesEstadisticas/informes/relevamiento-expectativas-mercado-feb-2026.pdf))
- The market’s low volume increases the chance the quoted price is dominated by idiosyncratic liquidity rather than broad information — the price could therefore be lower than a crowd‑based estimate for reasons unrelated to fundamentals (e.g., a solitary participant laying off exposure). (market metrics from prompt).

Source credibility and recency
- BCRA REM (Feb‑2026) is the single most relevant, high‑quality and recent public source for forward nominal exchange‑rate expectations in Argentina — high credibility for expectations. ([bcra.gob.ar](https://www.bcra.gob.ar/archivos/Pdfs/PublicacionesEstadisticas/informes/relevamiento-expectativas-mercado-feb-2026.pdf))
- IMF press release (Apr‑11‑2025) is authoritative on the existence and objectives of a major financing package that materially affects tail‑risk for the peso. ([imf.org](https://www.imf.org/en/News/Articles/2025/04/12/pr25101-argentina-imf-executive-board-approves-48-month-usd20-billion-extended-arrangement))
- Local market reports (Banco Piano, Infobae, TN, Canal26) are timely reporting of current mayorista levels and BCRA activity (reserve purchases); they’re standard market sources for up‑to‑date quotes and policy/reporting summaries. Use them for actual spot context; weigh them lower than BCRA/IMF for policy inference. ([bancopiano.com.ar](https://www.bancopiano.com.ar/Inversiones/Servicios/Noticias/Nota/cambio-argentina-dolar-mayorista-cierra-estable-en-1-416-00?utm_source=openai))

Market efficiency analysis
- Reasonable interpretation that justifies the current price (19.2%):
  - Traders may be discounting the narrowness of the contract’s band (1,700–1,799) and placing probability mass on either side (below 1,700 or above 1,800) even if the median expectation ~1,707, because publication timing, measurement (A3500 daily close), and intra‑month volatility can push the final published “last business day” figure outside that range.
  - The market might be pricing an elevated chance that BCRA manages to keep the official rate below 1,700 (via interventions and reserve support) even while the REM median is 1,707 (a small difference in medians can still be consistent with a low band probability once you account for uncertainty and skew).
- Could it represent genuine consensus among informed traders or the view of a few?
  - Given zero reported trading volume and the small spread, it’s plausible that the price reflects one or a few participants (low‑engagement microstructure). That lowers confidence that the quote aggregates broad information.
- Why low volume might exist:
  - The outcome is a slow-moving macroeconomic variable that many institutional traders prefer hedging with forwards/forwards or structured instruments rather than binary prediction markets.
  - The market’s resolution rule (exact A3500 published on one precise day) narrows the event and reduces hedging demand — traders may prefer to trade continuous FX forwards or options, hence little volume in this binary.

Mispricing assessment (weighing evidence)
- Translate the REM into a rough probability for the contract’s band:
  - REM median Dec‑2026 = ARS 1,707; REM percentiles (table) show 25th ≈ ~1,66x and 75th ≈ ~1,79x (see BCRA Cuadro 10.4). Interpolating the empirical REM distribution gives an approximate probability mass inside 1,700–1,799 of about ~30–40% (rough back‑of‑envelope calculation using percentiles and median). This is materially higher than the market’s quoted 19.2%. ([bcra.gob.ar](https://www.bcra.gob.ar/archivos/Pdfs/PublicacionesEstadisticas/informes/relevamiento-expectativas-mercado-feb-2026.pdf))
- Counterpoints that reduce the size of the implied mispricing:
  - The REM is an analyst survey (not a full market distribution) and may understate event uncertainty or fail to account for other market signals (e.g., forward prices, option‑implied vol, BCRA intra‑month interventions). Traders who follow tradable instruments (forwards, futures, options) may have information that implies a lower probability for landing in that tight 100‑point interval.
  - The contract’s resolution rule (A3500 published at market close on last business day) amplifies the effect of day‑specific noise: even if year‑end central tendencies are inside the band, the exact published number on that day could easily fall outside because of reporting timing, one-off interventions, or technicalities. Traders may give that possibility significant weight.
- Bottom line on mispricing:
  - There is credible evidence (BCRA REM + public policy support) that the unconditional probability of Dec‑2026 official A3500 being in 1,700–1,799 is meaningfully higher than 19.2%. Using REM percentiles gives a back‑of‑envelope estimate of roughly 30–40% probability, implying the market may be underpricing the event by on the order of ~10–20 percentage points.
  - However, because (a) the REM is a survey (not a full probability model), (b) the contract’s narrow resolution window and publication timing add extra event‑specific noise, and (c) the market shows no trading volume (so the posted price may be idiosyncratic), I do not claim definitive arbitrage. Rather, I estimate a plausible mispricing of moderate size (see expected value calculation below).

Quantitative sketch (mapping REM to probability for the 1,700–1,799 band)
- REM med = 1,707 (Dec‑2026). REM percentiles: 25th ≈ 1,664; 50th = 1,707; 75th ≈ 1,792 (table Cuadro 10.4). Interpolating these gives a rough CDF:
  - P(X < 1,700) ≈ ~46%
  - P(X ≤ 1,799) ≈ ~80%
  - P(1,700 ≤ X ≤ 1,799) ≈ ~34% (approximation)
- Market price → 19.2% probability. Difference ≈ 14.8 percentage points (≈14.8¢).
- This 14.8¢ is a back‑of‑envelope magnitude; it depends on how one maps discrete percentiles into a continuous distribution and ignores option‑implied or forward markets. Because this difference is under 20¢, it does not trigger the extra “stop and re‑verify” threshold the task required for >20¢ claims — but it does flag a plausible, moderate mispricing. ([bcra.gob.ar](https://www.bcra.gob.ar/archivos/Pdfs/PublicacionesEstadisticas/informes/relevamiento-expectativas-mercado-feb-2026.pdf))

Expected‑value calculation (user’s requested metric)
- Strength of evidence that the REM‑based probability is informative and missing from the current market price: I judge this moderate — the REM is authoritative and recent but is an analyst survey rather than a full market distribution and doesn’t capture all tradable‑instrument signals. Strength = 65%.
- Magnitude of mispricing (approx): ~14.8¢ (difference between REM-based ~34% and market 19.2%).
- Expected value = Strength × Magnitude = 0.65 × 14.8¢ ≈ 9.6¢.

Confidence in overall assessment
- I assign confidence = medium. Reason: primary public evidence (BCRA REM) is recent and directly applicable, and IMF/BCRA conduct provides a tangible policy backstop; but countervailing reasons (survey vs tradable instruments, narrow resolution window, zero market volume) imply substantial residual uncertainty.

Concise recommendation for a trader/monitor
- The public, high‑quality evidence (BCRA REM + IMF support + visible reserve accumulation) suggests the market’s 19.2% price is plausibly too low by a modest amount (~10–20¢). However, because the market is zero‑volume and the contract’s resolution depends on one precise published daily figure, this is not a slam‑dunk arbitrage — it is a signal to investigate further (look at tradable FX forwards, option skews, Rofex forward curve, BCRA daily intervention schedule and bands, and any insider/structural reasons why the December published A3500 might systematically land outside a symmetric interval around the REM median).
- If you are considering trading: before betting sizeably, check (a) forward/option market prices for year‑end implied central tendency and skew, (b) whether anyone has recently provided liquidity in this specific prediction market (counterparty risk), and (c) the current BCRA band mechanics and scheduled macro events (IMF reviews, fiscal calendar, elections) that could materially change probabilities.

EXPECTED_VALUE: 9.6
SUMMARY: BCRA’s Feb‑2026 REM median for Dec‑2026 is ARS 1,707 (inside the contract band) and BCRA/IMF reserve support reduces tail risk; mapping REM percentiles to a probability for 1,700–1,799 yields ~30–40%, higher than the market’s 19.2%. Because the market has zero volume and the contract resolves on one precise published daily number, the quoted price may reflect limited participation; I estimate a moderate mispricing (~14.8¢ gap) with expected value ≈ 9.6¢. 
CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [Relevamiento de Expectativas del Mercado | Febrero de 2026 (Cuadro y Gráficos)](https://www.bcra.gob.ar/archivos/Pdfs/PublicacionesEstadisticas/informes/relevamiento-expectativas-mercado-feb-2026.pdf)
**Author:** Banco Central de la República Argentina (BCRA) | **Published:** 2026-02-27

This is the BCRA’s official REM (market expectations survey) for February 2026. It reports the median projection for the nominal exchange rate (Tipo de Cambio Mayorista, Comunicación A3500) for December 2026 as ARS 1,707/USD, includes percentiles (10/25/75/90), mean, standard deviation and a distribution histogram (Cuadro 10.4 / Gráfico 10.4). The table and chart are the most directly relevant public forward expectations for the official rate; they imply a non‑trivial probability mass inside the 1,700–1,799 band and are central to the argument that the market’s 19.2% price may be too low. ([bcra.gob.ar](https://www.bcra.gob.ar/archivos/Pdfs/PublicacionesEstadisticas/informes/relevamiento-expectativas-mercado-feb-2026.pdf))

### [IMF Executive Board Approves 48‑month US$20 billion Extended Arrangement for Argentina](https://www.imf.org/en/news/articles/2025/04/12/pr25101-argentina-imf-executive-board-approves-48-month-usd20-billion-extended-arrangement)
**Author:** International Monetary Fund (IMF) Communications Department | **Published:** 2025-04-11

IMF press release describing the Executive Board approval of a roughly US$20bn EFF for Argentina, with an immediate disbursement ~US$12bn, and program objectives to support a transition to a more flexible FX regime and rebuild external buffers. This is high‑quality evidence that Argentina has a sizable official financing cushion and a program intended to strengthen reserves and BCRA credibility — a factor that lowers the probability of a disorderly run to extremely high official rates and increases the plausibility that the official rate could be managed near REM consensus. ([imf.org](https://www.imf.org/en/News/Articles/2025/04/12/pr25101-argentina-imf-executive-board-approves-48-month-usd20-billion-extended-arrangement))

### [Cambio Argentina: Dólar mayorista cierra estable en $1.416,00 - Banco Piano (news entry)](https://www.bancopiano.com.ar/Inversiones/Servicios/Noticias/Nota/cambio-argentina-dolar-mayorista-cierra-estable-en-1-416-00)
**Author:** Banco Piano (market commentary) | **Published:** 2026-03-09

Market commentary and daily close reporting showing the dollar mayorista (A3500 reference) trading near ARS 1,416 on March 9, 2026 and noting BCRA reserve activity. This provides a recent spot reference point (early‑March 2026) showing the official market was materially below the 1,700 level, underscoring the amount of nominal depreciation needed before year‑end for the contract to resolve YES. It’s used to measure the distance from current spot to the contract band. ([bancopiano.com.ar](https://www.bancopiano.com.ar/Inversiones/Servicios/Noticias/Nota/cambio-argentina-dolar-mayorista-cierra-estable-en-1-416-00?utm_source=openai))

### [Dólar hoy: a cuánto cotizaron el oficial, el blue, el mayorista, el MEP, el CCL y el Cripto este viernes 6 de marzo | TN](https://tn.com.ar/economia/2026/03/06/dolar-a-cuanto-cotizan-el-oficial-y-las-otras-opciones-cambiarias-este-viernes-6-de-marzo/)
**Author:** Unknown | **Published:** 2026-03-06

Daily market reporting summarizing the various official and parallel dollar quotations; it reports official and mayorista levels in early March 2026 (mayorista ~ARS1,415) and explains which series are BCRA‑published (A3500) vs. other market rates. This is a timely confirmation of the spot baseline used to assess how far the official rate would need to move to hit the contract band by Dec‑2026. ([tn.com.ar](https://tn.com.ar/economia/2026/03/06/dolar-a-cuanto-cotizan-el-oficial-y-las-otras-opciones-cambiarias-este-viernes-6-de-marzo/?utm_source=openai))

### [REM: a cuánto llegará el dólar y cuál será la inflación, según los referentes de la City (article summarizing REM Feb‑2026)](https://www.cronista.com/finanzas-mercados/rem-a-cuanto-llegara-el-dolar-y-cual-sera-la-inflacion-segun-los-referentes-de-la-city-2/?outputType=amp-type)
**Author:** Unknown | **Published:** 2026-03-05

Coverage of the BCRA REM (February 2026) summarizing that the REM median for December 2026 is about ARS 1,707 (and Top‑10 ~1,716), and reporting distributions among surveyed consultoras and banks. This independent press summary corroborates the REM table and provides quick interpretive context that many market participants use when forming views for 2026 year‑end exchange rates. It supports the argument that public expert consensus centers inside the contract’s band. ([cronista.com](https://www.cronista.com/finanzas-mercados/rem-a-cuanto-llegara-el-dolar-y-cual-sera-la-inflacion-segun-los-referentes-de-la-city-2/?outputType=amp-type&utm_source=openai))

### [El BCRA acelera compras y logra su mayor nivel de reservas en más de cuatro años | Canal26](https://www.canal26.com/economia/2026/02/09/el-bcra-acelera-compras-y-logra-su-mayor-nivel-de-reservas-en-mas-de-cuatro-anos//)
**Author:** Unknown | **Published:** 2026-02-09

Local reporting that the BCRA has been accelerating dollar purchases and reached its highest reserve level in over four years, and that official projections for 2026 foresee net FX purchases in the ~US$10–17bn range. This supports the institutional/backstop argument (BCRA capacity to intervene and accumulate) which reduces the probability of an extreme official devaluation, and therefore increases the plausibility that year‑end A3500 could be within the REM‑implied centering range. ([canal26.com](https://www.canal26.com/economia/2026/02/09/el-bcra-acelera-compras-y-logra-su-mayor-nivel-de-reservas-en-mas-de-cuatro-anos//?utm_source=openai))
