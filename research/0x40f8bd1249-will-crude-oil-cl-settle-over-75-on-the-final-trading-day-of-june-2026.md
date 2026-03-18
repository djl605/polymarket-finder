# Research: Will Crude Oil (CL) settle over $75 on the final trading day of June 2026?

**Market ID:** 0x40f8bd1249712c000fe454859eead3984281ccba71e98e4c30a971d15290a706
**Researched At:** March 18, 2026 at 04:41:09 AM UTC
**Search Query:** "Will Crude Oil (CL) settle over $75 on the final trading day of June 2026?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 4.0¢

### Summary

Current June‑2026 CL futures trade near $89 (Mar 18, 2026) and authoritative agencies report a large Middle‑East supply shock plus a record 400M‑barrel IEA release; very high implied volatility and CME settlement technicalities make the translation from the futures price to P(settle>$75) highly sensitive. Given that, the market price of 58% is plausible and I find no decisive public evidence of a large mispricing.

### Full Analysis

Plan & searches used (budget = 3 searches)
- I planned to (a) get the current June‑2026 WTI (CLM26) futures level, (b) collect authoritative supply/demand commentary (EIA, IEA, major news) about near‑term price drivers, and (c) check CME settlement methodology and oil implied volatility to test whether a >$75 settlement by end‑June is plausible. I used three web.run calls (each with multiple queries) and relied on primary sources (EIA, IEA, CME) plus major news outlets.

Short answer
- There is NOT clear, specific evidence that the prediction market is grossly mispriced. The market price (58%) is within a plausible range once you account for (a) the June‑2026 futures level (~$89 as of March 18, 2026) and (b) very elevated oil implied volatility and large geopolitical tail‑risks. The available authoritative evidence supports both a materially elevated near‑term price (bull case) and a potential mean reversion by mid‑summer (bear case), so a mid‑range probability (~50–70%) is defensible; 58% therefore is not an obvious mispricing.

1) CONTEXT ANALYSIS — what resolves YES vs NO
- Market question: "Will CME official settlement price for the Active Month of Crude Oil (CL) on the final trading day of June 2026 be > $75?"
- For YES: the official CME published settlement price for the Active Month on that trading day (the one that first appears on CME’s settlement page for that trading day) must be strictly greater than $75. That is a single daily settlement value on the last trading day of June 2026 (not intraday highs/lows, not later corrections). The Active Month logic and CME’s published “Settlement” number are the binding resolution items.
- For NO: the published settlement price on that day must be ≤ $75 (including exactly $75 → NO). Settlement is determined by CME’s methodology for CL; the market description requires using only the CME daily published “Settlement” price for the active month.

2) EVIDENCE EVALUATION — relevant facts and how they move the probability

Key, load‑bearing facts discovered
- Current market (futures) level for June‑2026 CL (CLM26): ~ $89 (Google Finance snapshot, Mar 18, 2026). This is well above the $75 threshold and, absent enormous volatility/tail risk or settlement technicalities, implies a high chance the June settlement will exceed $75. (Supports YES). ([google.com](https://www.google.com/finance/quote/CLM26%3ANYMEX))
- EIA (Short‑Term Energy Outlook, Mar 10, 2026): documents an acute near‑term supply shock (Middle East conflict) with Brent expected above $95 for the next two months, then falling below $80 in Q3 and toward ~$70 by year‑end. EIA therefore sees high near‑term prices but a path toward moderation by late 2026 (mixed effect; supports a high near‑term probability but allows possible drop by June). ([eia.gov](https://www.eia.gov/pressroom/releases/press584.php?utm_source=openai))
- IEA (news, Mar 11, 2026): coordinated release of 400 million barrels from IEA member strategic reserves to alleviate market strains caused by the Middle East conflict. This is a large intervention intended to cap or reduce price spikes — it can push probability down vs a no‑release scenario, but markets have sometimes moved higher despite releases when the shock is large. (Bull/bear tension). ([iea.org](https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict?utm_source=openai))
- News reporting (multiple outlets, March 2026): disruptions around the Strait of Hormuz and strikes on Middle East production have sent Brent/WTI sharply higher (Brent and WTI briefly moved above $100 in early March 2026). That explains today’s elevated futures curve. These are credible, timely reports of a major supply shock (supports YES near term). ([axios.com](https://www.axios.com/2026/03/08/iran-war-oil-market-barrel-cost?utm_source=openai))
- Oil implied volatility (OVX) spiked in early March 2026 (OVX readings show extremely elevated levels around the crisis dates). Very high implied volatility means a wider distribution of possible outcomes at the June final‑day settlement; with very high IV, even a forward at $89 leaves non‑trivial probability of price being under $75 by late June. The settlement probability is therefore volatility‑sensitive. ([ycharts.com](https://ycharts.com/indices/%5EOVX/level?utm_source=openai))
- CME settlement methodology: CME uses a specified daily settlement procedure (waterfall approach and staff‑based settlement for first months) for NYMEX WTI (CL). Settlement can differ from last trade and uses market data and fallback mechanisms; during severe disruptions CME’s published settlement procedure and fallbacks matter for the actual published settlement number. That technicality can matter if trading is thin or if markets are illiquid on the exact settlement window. (Supports caution about taking last trade = settlement). ([cmegroup.com](https://www.cmegroup.com/trading/energy/files/NYMEX_Energy_Futures_Daily_Settlement_Procedure.pdf?utm_source=openai))

What specifically argues the market price might be incorrect (bearish for the prediction market’s YES price)
- Authoritative medium‑term forecasts (e.g., EIA STEO) expect prices to moderate later in 2026 as supply and demand re‑balance — that argues the current spike may not persist into late June and that the probability of closing over $75 could be materially lower if the crisis eases. The IEA’s coordinated release could also blunt the spike and lower the chance of >$75. ([eia.gov](https://www.eia.gov/pressroom/releases/press584.php?utm_source=openai))
- Settlement technicalities: CME’s final published “Settlement” can differ from intraday or last trade prices; in severely dislocated markets the mechanics could produce surprising published settlement numbers (the market may reasonably price this risk). This is a reason to accept a lower probability than simply converting the front‑month futures price to a binary probability. ([cmegroup.com](https://www.cmegroup.com/trading/energy/files/NYMEX_Energy_Futures_Daily_Settlement_Procedure.pdf?utm_source=openai))

What supports the market price as reasonable (bullish for the prediction market’s YES price)
- June futures are trading around $89 as of March 18, 2026 — substantially above the $75 threshold — which, in the absence of extreme implied volatility, would imply a high probability of settling above $75. If traders take the futures curve and current news at face value, the implied probability of >$75 should be well above 58%. That argues the market price might be low only if traders expect a rapid and large mean reversion versus current curve. ([google.com](https://www.google.com/finance/quote/CLM26%3ANYMEX))
- Geopolitical tail‑risk remains material (Strait of Hormuz disruption, attacks on Gulf facilities). If disruptions persist or escalate, prices could remain elevated well past June. The IEA release is large but may be spread and insufficient if major export chokepoints stay closed. This supports a higher probability than 58%. ([ksat.com](https://www.ksat.com/business/2026/03/12/brent-crude-oil-briefly-tops-100-a-barrel-as-iran-attacks-on-shipping-worsen-supply-concerns/?utm_source=openai))
- Elevated implied volatility (OVX spiking) explains why markets/option prices embed large two‑way risk: even with a forward near $89, high volatility reduces the certainty that settlement stays above $75. Converting the forward to a binary probability is highly sensitive to the assumed volatility; with annualized IV in the ~80–120% range, the chance of >$75 by late June is not necessarily near 90% — it can be in the 45–70% band depending on the exact IV. That makes 58% a defensible number if traders are pricing large near‑term swings. (I show a short volatility sensitivity calculation below.) ([ycharts.com](https://ycharts.com/indices/%5EOVX/level?utm_source=openai))

Volatility sensitivity (back‑of‑envelope)
- Inputs: forward/futures for June ≈ $89 (F); strike K = $75; time to maturity ≈ 0.27 years (roughly Mar 18 → last trading day of June); assume lognormal returns.
- If annualized vol σ = 0.6 → P(S_T > 75) ≈ 65%
- If σ = 0.8 → P ≈ 58% (close to market)
- If σ = 1.2 → P ≈ 49%
- Conclusion: implied probability is highly sensitive to σ. Given that OVX and options IV spiked during March crisis (OVX readings varied widely and reached very high levels in early March), the prediction market price (58%) is consistent with plausible mid‑range IV assumptions (≈80% annualized). ([google.com](https://www.google.com/finance/quote/CLM26%3ANYMEX))

Source credibility and recency
- EIA (official U.S. government STEO) and IEA (international energy agency) are authoritative for supply/demand and reserve release actions (very high credibility; March 2026 releases are current). CME settlement procedure is primary source for resolution rules (authoritative). Major news outlets (Reuters, AP, Axios, Guardian) provide timely reporting of events that drive prices; they are credible for factual event reporting but may differ in interpretation. Implied volatility indices (CBOE OVX / FRED / YCharts) are market data and useful to quantify uncertainty; these are timely and credible. All cited items are March 2026 and therefore current to the market window.

3) MARKET EFFICIENCY ANALYSIS — is 58% plausible?
- Reasonable interpretations that justify 58%:
  - Traders are converting the current June futures (~$89) into a probability using a high implied volatility assumption; with σ ≈ 0.8 annualized you get ~58% probability that settlement > $75 by late‑June. That is exactly consistent.
  - Traders may be pricing the IEA release and potential OPEC+ responses (supply additions later in spring) as materially lowering the mid‑year probability; they are not simply taking today’s futures at face value as an expectation but folding in a high chance of mean reversion by June.
  - Traders may be accounting for CME settlement technicalities and thinness in the exact settlement window that could produce lower published settlement than spot last trade.
- Could 58% be set by one or a few participants?
  - Total volume = $0 for this market and very small spread (6¢) suggests little participation; low volume raises the possibility that a small number of traders set the price. That argues caution: lack of liquidity makes the price less reliable as an information aggregator.
- Is low volume because the outcome is obvious or because traders haven’t engaged?
  - Not obvious: the presence of a large geopolitical shock plus big coordinated reserve releases makes this a high‑uncertainty event; many informed traders actively trade oil markets. Therefore low volume on this prediction market likely reflects limited user attention/liquidity rather than consensus that the event is trivial. That reduces confidence that the market price aggregates broad information.

4) MISPRICING ASSESSMENT — weighing evidence
- Evidence favoring significant mispricing (market is too low):
  - June futures at ~$89 is a strong, contemporaneous market signal that a >$75 settlement is likely; without extreme volatility this would imply a probability well above 58%. If traders are underweighting futures or ignoring current spot/futures curve, that could be mispricing.
  - Ongoing supply disruption could persist, making prices at or above current levels into summer. (Supports higher probability.)
- Evidence against concluding a large mispricing:
  - Extremely elevated implied volatility (OVX spike) makes the mapping from forward price to binary probability very sensitive; at high IV the chance of retracement under $75 is non‑trivial. Using plausible IV values yields probabilities that bracket 58%.
  - CME settlement mechanics and the possibility that the published settlement on that precise final trading day differs from intraday or last trade means traders may rationally discount simple spot/futures comparisons.
  - The IEA coordinated release and potential OPEC+ adjustments are real mitigating factors that market participants will price in; the release is huge in absolute barrels and could push realized settlement lower than spot futures right now.
- Critical check (challenge to reasoning):
  - If one simply read the current futures quote ($89) and ignored volatility/settlement technicalities and IEA/OPEC actions, 58% would look too low. But the presence of very high IV and large, credible policy interventions (IEA release + possible production moves) is exactly the kind of information that would justify a mid‑probability rather than near‑certainty.
  - Given the very low liquidity of the prediction market, even if one believes the market is reasonably mispriced by, say, 10–30 points, the lack of trading volume means there may be no arbitrage route for a retail trader to reliably exploit it. That reduces implied "actionable" mispricing.

5) EXPECTED VALUE CALCULATION (numerical)
- Strength of evidence that the market is missing crucial information or is materially mispriced: I judge this at 40%. Rationale: authoritative data (futures curve and news) point both ways and volatility/settlement technicalities materially affect mapping to a binary probability; so the evidence for a large, obvious mispricing is modest, not strong.
- If mispriced, plausible magnitude: ~10 cents (0.10) absolute difference between market (58%) and a defensible true probability. Rationale: given the volatility sensitivity, possible "true" probability could be in the ~60–70% range (or lower) — I pick 10¢ as a reasonable upper‑bound typical mispricing size for an informationally thin prediction market.
- Expected value = Strength × Magnitude = 40% × 10¢ = 4.0¢

6) CONFIDENCE in this assessment
- medium

Bottom‑line recommendation and interpretation
- The market price (58%) is not obviously or provably wrong. It is within the plausible range once you account for (a) current June‑2026 futures (~$89), (b) very high oil implied volatility, and (c) meaningful settlement technicalities and a large IEA coordinated reserve release. Low liquidity raises the risk this price reflects few traders rather than a broad consensus — that argues caution about using this market as a definitive signal. I would NOT flag this as a large (>20¢) arbitrage opportunity based on available public information; any trading decision should explicitly model the volatility assumption and the CME settlement rules and consider the low‑liquidity execution risk.

EXPECTED_VALUE: 4.0
SUMMARY: Current June‑2026 CL futures trade near $89 (Mar 18, 2026) and authoritative agencies report a large Middle‑East supply shock plus a record 400M‑barrel IEA release; very high implied volatility and CME settlement technicalities make the translation from the futures price to P(settle>$75) highly sensitive. Given that, the market price of 58% is plausible and I find no decisive public evidence of a large mispricing. 
CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [CLM26 • NYMEX — Crude Oil (Google Finance snapshot)](https://www.google.com/finance/quote/CLM26%3ANYMEX)
**Author:** Unknown | **Published:** 2026-03-18

Google Finance page showing the June‑2026 WTI futures contract (CLM26) price and the futures chain as of March 18, 2026; it reported CLM26 ≈ $89.12 on Mar 18, 2026. This is the primary market signal for traders’ current expectation of crude prices in June and is central to mapping the probability that the June settlement will exceed $75. A June forward ≈ $89 strongly biases the probability upward, but the binary probability also depends on implied volatility and settlement specifics; I used this level as the baseline in the probability sensitivity analysis. ([google.com](https://www.google.com/finance/quote/CLM26%3ANYMEX))

### [EIA releases latest Short‑Term Energy Outlook amid Middle East conflict (Press release)](https://www.eia.gov/pressroom/releases/press584.php)
**Author:** U.S. Energy Information Administration | **Published:** 2026-03-10

EIA press release and STEO commentary (March 10, 2026) describing the impact of the Middle East conflict on oil markets; the release says Brent will remain above $95 for the next two months before moderating (falling below $80 in Q3 and toward ~$70 by year‑end). This is an authoritative, current government forecast that supports the view of elevated near‑term prices but a path toward moderation by late 2026; it therefore argues the June outcome is uncertain and not guaranteed to stay above elevated spot levels. ([eia.gov](https://www.eia.gov/pressroom/releases/press584.php?utm_source=openai))

### [IEA Member countries to carry out largest ever oil stock release amid market disruptions from Middle East conflict](https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict)
**Author:** International Energy Agency (IEA) | **Published:** 2026-03-11

IEA announcement (11 March 2026) that 32 member countries agreed to make 400 million barrels available from strategic reserves in response to supply disruptions from the Middle East conflict. This record‑sized coordinated release is a major policy action that market participants will factor into forecasts for summer prices; it is relevant because it could materially lower the chance of a >$75 June settlement (depending on timing and how much supply it displaces). It also demonstrates why markets are accounting for policy and logistical timing, not only current spot levels. ([iea.org](https://www.iea.org/news/iea-member-countries-to-carry-out-largest-ever-oil-stock-release-amid-market-disruptions-from-middle-east-conflict?utm_source=openai))

### [Oil tops $100 per barrel as Iran war escalates (Axios)](https://www.axios.com/2026/03/08/iran-war-oil-market-barrel-cost)
**Author:** Unknown | **Published:** 2026-03-08

News coverage from Axios noting Brent and WTI briefly moved above $100 per barrel in early March 2026 as the Iran conflict escalated and tankers avoided the Strait of Hormuz. These contemporary reports document the supply shock that produced the current futures spike; they explain why the futures curve and implied volatilities are elevated and why traders are assigning significant tail risk to prices over the next months. This supports a high near‑term probability for >$75 absent offsetting policy actions. ([axios.com](https://www.axios.com/2026/03/08/iran-war-oil-market-barrel-cost?utm_source=openai))

### [Oil passes $100 a barrel following Strait of Hormuz blockage and Middle East war (KSAT / Reuters coverage)](https://www.ksat.com/business/2026/03/12/brent-crude-oil-briefly-tops-100-a-barrel-as-iran-attacks-on-shipping-worsen-supply-concerns/)
**Author:** Unknown | **Published:** 2026-03-12

Regional reporting (citing Reuters and other sources) describing how strikes and shipping attacks in the Gulf pushed Brent/WTI above $100 in early March; provides details about the functional disruption of the Strait of Hormuz and assessments that IEA releases may be insufficient if chokepoints remain closed. This corroborates the scale of the shock and why front‑month futures have widened, supporting a higher near‑term probability of >$75 while highlighting the supply/timing uncertainty that can compress probabilities toward middle values. ([ksat.com](https://www.ksat.com/business/2026/03/12/brent-crude-oil-briefly-tops-100-a-barrel-as-iran-attacks-on-shipping-worsen-supply-concerns/?utm_source=openai))

### [NYMEX Energy Futures — Daily Settlement Procedure (CME Group PDF)](https://www.cmegroup.com/trading/energy/files/NYMEX_Energy_Futures_Daily_Settlement_Procedure.pdf)
**Author:** CME Group | **Published:** Unknown

Official CME documentation describing how NYMEX WTI (CL) daily settlement prices are computed, including staff‑based procedures and fallback/waterfall steps used in case of illiquidity or disruptions. This is directly relevant because the prediction market resolves to the CME‑published settlement price; differences between last trade/spot and the published settlement (especially in disrupted markets) can determine resolution. It justifies caution about equating spot/futures last trade with the published settlement. ([cmegroup.com](https://www.cmegroup.com/trading/energy/files/NYMEX_Energy_Futures_Daily_Settlement_Procedure.pdf?utm_source=openai))

### [CBOE Crude Oil Volatility Index (^OVX) — level (YCharts)](https://ycharts.com/indices/%5EOVX/level)
**Author:** YCharts | **Published:** 2026-03-11

Time‑series data showing OVX (CBOE crude oil volatility index) spiking in early March 2026 (one snapshot showed OVX ≈ 120 on March 11, 2026). This demonstrates that option markets and implied volatility were very elevated during the crisis; elevated IV materially increases the odds of large moves by June and therefore makes the mapping from a forward ≈ $89 to a binary P(>75) highly sensitive. That volatility channel is a key reason why the prediction market’s 58% figure is plausible. ([ycharts.com](https://ycharts.com/indices/%5EOVX/level?utm_source=openai))

### [Goldman Sachs raises Q4 Brent, WTI crude price forecast amid longer Hormuz disruption (Investing.com — Reuters summary)](https://www.investing.com/news/commodities-news/goldman-sachs-raises-q4-brent-wti-crude-price-forecast-amid-longer-hormuz-disruption-4556040)
**Author:** Unknown (Investing.com; Reuters content) | **Published:** 2026-03-12

Markets/analyst update (from Reuters via Investing.com) reporting major banks and analysts raising price forecasts because of a prolonged Strait of Hormuz disruption; Goldman Sachs increased its Q4 forecasts in a scenario where disruptions last longer. This source shows that large sell‑side institutions expect elevated prices if the disruption persists, supporting a substantial risk premium in futures and option markets that market participants are pricing into probabilities. ([investing.com](https://www.investing.com/news/commodities-news/goldman-sachs-raises-q4-brent-wti-crude-price-forecast-amid-longer-hormuz-disruption-4556040?utm_source=openai))
