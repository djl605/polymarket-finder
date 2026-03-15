# Research: Space FDV above $15M one day after launch?

**Market ID:** 0x6e0540fd1a2b6ca009fe99450c4aa03b2a100b7da3007fd3a6fbde9818238f84
**Researched At:** March 15, 2026 at 04:38:07 AM UTC
**Search Query:** "Space FDV above $15M one day after launch?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 29.1¢

### Summary

Multiple primary sources (project site + exchange pre-market notices + press) consistently show a $50M floor FDV and a 1,000,000,000 supply; if the sale/TGE and tradability occurred as described, FDV > $15M is very likely and this market appears underpriced. However, important operational/technical risks (points → token conversion, exact mint timing, and which price feed is used for resolution) keep some uncertainty, so confirm on‑chain mint/listing details before trading aggressively.

### Full Analysis

Below is my researcher-style evaluation of the prediction market "Space FDV above $15M one day after launch?" (market price 43.5%, total vol $0, spread 5¢). I searched primary sources (project site, exchange announcements, press) and evaluated whether there is credible evidence the market is mispriced. I do not assume the market is correct; I list relevant evidence, alternative explanations, and compute an expected-value estimate for taking the opposite bet.

1) CONTEXT ANALYSIS — what the market asks and how it resolves
- Question: Will the Fully Diluted Valuation (FDV) of Space’s governance token be greater than the title number ($15M) at 4:00 PM ET on the calendar day after the token’s launch? The market counts FDV = (total token supply) × (token price) using the most liquid price source available. The token must be actively, publicly transferable and tradable for the event to be considered a "launch". If Space does not launch a token by 2026-12-31 23:59 ET, the market will resolve to "No".
- Practical resolution pathway:
  - YES resolves if: Space launches a tradable token, the token’s total supply is X, and the most liquid price source shows price ≥ ($15M / X) at 16:00 ET the day after that launch.
  - NO resolves if: either Space never launches by the deadline, or the launch occurs but at that 4:00 PM ET snapshot the price × total supply ≤ $15M.

2) EVIDENCE EVALUATION — findings from primary sources and how they affect the likely outcome
- What the project and exchanges say (load-bearing facts)
  - Into.space (official site / docs) describes the product and public-sale intent; it links to the sale domain and whitepaper and confirms a public-sale/TGE plan. ([into.space](https://into.space/))
  - Multiple centralized exchanges published pre-market/listing notices: BitMart announced SPACE pre-market mint/trading and explicitly references a 1,000,000,000 points max supply and that token max supply would be announced; BitMart’s notice shows exchanges prepared to convert pre-market points into tokens on delivery. This is direct operational evidence that token distribution/listings were planned. ([bitmart.com](https://www.bitmart.com/en-US/support/articles/7923014477723/360001026214/44754973238299))
  - XT.com published a pre-market OTC trading announcement for SPACE and linked to Space docs; XT’s notices show pre-market OTC trading scheduled in January 2026 (i.e., exchanges were arranging early trading). ([xtsupport.zendesk.com](https://xtsupport.zendesk.com/hc/en-us/articles/54159289468953-XT-Pre-Market-Trading-SPACE-intodotspace-Launching-Soon))
  - Press coverage of the Space public sale repeatedly reports the public-sale structure: floor FDV $50M, ceiling $99M, linear FDV curve between $0.05–$0.099 (implying a 1,000,000,000 total supply in many writeups) and statements that allocations are determined at a clearing price; several press pieces say tokens would be unlocked at TGE (100% unlocked in many press stories). These are consistent, repeated claims across outlets. ([thetechly.com](https://www.thetechly.com/space-opens-public-sale-for-space-token-on-leveraged-prediction-market-platform/))
  - Independent reporting (on-chain / market-watch outlets) claims the public sale significantly oversubscribed and that clearing prices ended up well above the $15M threshold (some outlets reported clearing around ~$0.069 → implied FDV ≈ $69M). That reporting, if accurate for this project ID, implies an immediate FDV comfortably > $15M. ([solanafloor.com](https://solanafloor.com/news/space-faces-scrutiny-after-20-m-ico?utm_source=openai))

- Evidence that could push the FDV below $15M (reasons for skepticism)
  - Token‑launch mechanics can differ from headline press: BitMart’s announcement shows “SPACE Points” pre-market and an explicit conversion step; if tokens were not minted or not converted into transferable tokens by the resolution snapshot, the market could effectively see “no launch” (or a low-liquidity listing) — that would resolve No. BitMart’s notice even listed max supply for Points and said token max supply was “TBD”. That technicality (points → token conversion and exact mint timing) matters for whether a tradable token existed for the snapshot. ([bitmart.com](https://www.bitmart.com/en-US/support/articles/7923014477723/360001026214/44754973238299))
  - If the public sale issued large unlocked token allocations (reports differ between “100% unlocked” vs. partial unlock) and many buyers or insiders dumped on listing, the secondary-market price one day after launch could collapse below the public-sale price. Large unlocked supply + low post-listing demand can push price below $0.015 (the threshold per 1B supply), though that would be unusual if the clearing price was well above $0.05.
  - There are name collisions: “SPACE” is a common ticker; some price pages (e.g., BSC listings) refer to entirely different tokens named SPACE. Care is required to ensure any observed price/FDV refers to the same into.space token (Solana project). Coin aggregators showed placeholders for the into.space profile, but not necessarily reliable listing data. This leaves room for confusion. ([coingecko.com](https://www.coingecko.com/ko/%EC%BD%94%EC%9D%B8/space-3?utm_source=openai))

- Source credibility and recency
  - Primary sources used: the project website/docs (primary), centralized-exchange announcements (BitMart, XT — primary and operational), and contemporaneous press (TheTechly, DailyHodl, Gate). These are recent (Dec 2025 → Jan–Mar 2026) and directly relevant to launch mechanics and sale structure. Exchange notices are particularly trustworthy about listing schedules and pre-market mechanics; press articles are useful but promotional in places (many are derived from the same press release).
  - Independent market reporters (e.g., solanafloor) that allege actual raise amounts or clearing price are useful but need corroboration (they are at best secondary sources and sometimes investigative). I treat exchange notices and the official site as highest‑credence for whether a tradable token was intended and how the sale was structured. ([into.space](https://into.space/))

3) MARKET EFFICIENCY ANALYSIS — is the market price (43.5%) reasonable?
- Reasonable interpretation(s) that justify the present price:
  - Low volume and tight spread ($0 total vol, 5¢ spread) suggests the market has attracted only a few traders; price may reflect limited attention or a single opinion-maker rather than broad aggregation.
  - Traders may be pricing operational risk and technicalities rather than the headline FDV: possibility that token minting/transferable listing does not happen exactly as planned, or that the “one day after launch” snapshot could pick a thin or anomalous price feed (the market’s resolution uses “most liquid price source available” — ambiguity here could rationally reduce the YES probability).
  - The question’s exact resolution conditions (tradability, choice of price source, total supply used) add ambiguity that can justify a mid-range probability (traders discount the straightforward press narrative to allow for execution risk).
- Could it be genuine consensus? Possibly, but unlikely:
  - There is fairly consistent public information that would imply FDV >> $15M (public sale floor $50M, press saying total supply ~1B). If traders were widely informed and confident in the sale’s integrity and in exchange listings, a rational aggregated probability for FDV > $15M would probably be high (>80%). The present 43.5% therefore suggests either (a) the market hasn’t been seen by informed traders, or (b) those traders see execution/technical risk not obvious from headlines (conversion of Points → Token, unclear max-supply finalization, pricing feed selection), or (c) the market is being set by one or two contrarians.
  - Given total trading volume = $0, the price could easily reflect one user’s view and not a broad market consensus.

4) MISPRICING ASSESSMENT — weighing the evidence
- Bullish (YES) case — evidence that FDV > $15M one day after launch:
  - Public-sale structure repeatedly reported by official press/exchanges sets a floor FDV of $50M and ceiling $99M and (in many press accounts) a clearing price mechanism; if the sale actually cleared at or above the floor, the implied FDV is > $15M by a healthy margin. Exchanges prepared pre-market trading and conversion mechanics, making a tradable token likely. ([thetechly.com](https://www.thetechly.com/space-opens-public-sale-for-space-token-on-leveraged-prediction-market-platform/))
  - Multiple news outlets reported oversubscription and high clearing prices; some outlets reported final clearing prices in the ~$0.05–$0.07 range (implied FDV $50M–$70M for a 1B supply). If those reports are accurate for the same Space token, then the YES outcome is extremely likely. ([solanafloor.com](https://solanafloor.com/news/space-faces-scrutiny-after-20-m-ico?utm_source=openai))
- Bearish (NO) case — evidence that FDV ≤ $15M or the market resolves No:
  - Operational/technical risks: BitMart’s “Points → Token” flow and note that token max supply was "TBD" in their announcement show there could be a conversion/settlement step that delays or alters when a token is “actively, publicly transferable and tradable” (resolution requires the token to be tradable at the relevant snapshot). If conversion did not occur, the event could fail to meet the launch definition or could produce a thin/illiquid price. ([bitmart.com](https://www.bitmart.com/en-US/support/articles/7923014477723/360001026214/44754973238299))
  - Large unlocked supply and immediate selling pressure could drive the listing price well below the public-sale clearing price if market demand on exchanges is weak. That scenario is possible (projects with unlocked TGEs occasionally collapse on listing).
  - Name/ticker collisions: if market watchers misread an unrelated SPACE token listing (e.g., a BSC token) for this project, public data could be misleading. Aggregators (CoinGecko placeholder) show the profile but not necessarily trading, which warrants caution. ([coingecko.com](https://www.coingecko.com/ko/%EC%BD%94%EC%9D%B8/space-3?utm_source=openai))

CRITICAL CHECK (have I misunderstood resolution or missed facts?)
- The resolution hinges tightly on three items: (1) which exact token/contract is “Space” (must be the into.space project token), (2) the total supply used in FDV calculation, and (3) whether a tradable token exists at the snapshot time. I made sure to verify the project domain/whitepaper and multiple exchange announcements that refer to the same into.space project (not unrelated SPACE tickers). Several reputable CEX announcements and the project’s own pages point to a 1,000,000,000 supply and a public-sale floor FDV of $50M — if true and if the token was tradable, then FDV > $15M would be almost certain the day after launch. That logical check is why a large (>20¢) mispricing is plausible, but it depends on (a) the sale actually completing and (b) token being tradable (and not misattributed).
- Could traders have private info missing from my sources? Yes — e.g., last‑minute change to tokenomics, a failed token mint, or an exchange refusing to list the actual token — all would justify a low price. Those are precisely the operational risks the market price might be pricing in.

5) EXPECTED VALUE CALCULATION (estimate of the value of investigating / taking the market)
- My summary probability judgement:
  - Based on available primary material (project site + exchange announcements + repeated press describing a $50M floor and 1B supply) I estimate the true probability that FDV > $15M one day after launch is high. Conservatively I’ll estimate ~85% (0.85) true probability of YES, after discounting execution risk and promotional bias in press.
  - Current market probability = 43.5% (0.435). Difference = 0.85 − 0.435 = 0.415 = 41.5 percentage points (41.5 cents).
- Strength of evidence (how confident I am that my research uncovered the key missing info): I rate the evidentiary strength at ~70% (there are multiple, recent exchange notices and repeated press items, but some details — exact clearing price, final token mint status, and whether tokens were actually tradable on the measurement day — are not fully verifiable from public sources I could access). Strength = 70%.
- Expected value = Strength × Magnitude = 0.70 × 41.5 cents ≈ 29.05 cents.
- Rounding: EXPECTED_VALUE ≈ 29.1 cents.

6) FINAL ASSESSMENT / CONCLUSION
- Short answer: There is credible, repeated public evidence (project documentation + multiple CEX pre-market notices + press) that the Space public sale used a $50M floor FDV and a 1,000,000,000 total supply — which implies that if the sale and TGE proceeded as described and a tradable token existed at the snapshot, FDV one day after launch would almost certainly exceed $15M. That strongly suggests the market (priced at 43.5% YES) is likely undervaluing the probability of FDV > $15M. ([into.space](https://into.space/))
- Important caveats that prevent a “high-confidence exploit” recommendation:
  - Execution/technical risk matters: pre-market Point mechanics, token mint/delivery timing, ambiguity in the exchange conversion process, or a listing on very illiquid venues could cause the YES event to fail even after a successful sale. BitMart’s explicit note that Points → Token conversion is required is the operative technical risk that could plausibly overturn the headline FDV numbers. ([bitmart.com](https://www.bitmart.com/en-US/support/articles/7923014477723/360001026214/44754973238299))
  - Press is at times promotional and draws from the same Chainwire release; while multiple exchanges’ operational notices add credibility, independent on‑chain confirmation (exact mint address, on–chain token distribution and a reliable secondary-market price at the relevant snapshot) would be required to remove the remaining uncertainty.
- Practical verdict for a trader/evaluator:
  - If you can verify on‑chain that the into.space token mint exists, that total supply = 1,000,000,000 (or similar), and that a liquid price feed existed at 4:00 PM ET the day after the token’s launch showing a price well above $0.015 per token, then the case that the market is mispriced is strong and the expected value is material (~29¢ per $1 position under my conservative estimates).
  - If you cannot verify those operational elements (token mint address, conversion status from Points to Token, and a trusted exchange price feed for the snapshot), then the market’s 43.5% may reflect legitimate execution risk and the mispricing is less certain.

EXPECTED_VALUE: 29.1
SUMMARY: Multiple primary sources (project site + exchange pre-market notices + press) consistently show a $50M floor FDV and a 1,000,000,000 supply; if the sale/TGE and tradability occurred as described, FDV > $15M is very likely and this market appears underpriced. However, important operational/technical risks (points → token conversion, exact mint timing, and which price feed is used for resolution) keep some uncertainty, so confirm on‑chain mint/listing details before trading aggressively.
CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [Space - 10x Prediction Markets on Solana](https://into.space/)
**Author:** Unknown | **Published:** Unknown

Official project website and entry point to the Space whitepaper/docs. The site describes product features (10x leverage prediction markets), links to documentation and the public-sale flow, and provides the project’s social links. This is a primary source establishing the project identity, the sale domains, and the intended token launch mechanics (it grounds identification of which “SPACE” token the market refers to). Supports the YES side by showing the team’s public plan to issue a token and run a public sale/TGE. ([into.space](https://into.space/))

### [BitMart Announcement on Launching the Pre-Market Trade to Space (SPACE)](https://www.bitmart.com/en-US/support/articles/7923014477723/360001026214/44754973238299)
**Author:** BitMart Team | **Published:** 2025-12-24

Exchange announcement describing BitMart’s pre-market mint and pre-market trading for Space (SPACE Points), with mint and pre-market trading start times and operational rules. It explicitly notes SPACE Points max supply = 1,000,000,000 and that SPACE Token max supply was "TBD" pending confirmation; it also explains the conversion/delivery process (Points → Token) and settlement requirements. This is important because it shows exchanges prepared operational steps for converting sale allocations into tradable tokens — but it also highlights a potential technical failure mode (conversion/settlement) that could prevent a token being “actively, publicly transferable” at the required snapshot. ([bitmart.com](https://www.bitmart.com/en-US/support/articles/7923014477723/360001026214/44754973238299))

### [XT Pre-Market Trading: SPACE (intodotspace) Launching Soon](https://xtsupport.zendesk.com/hc/en-us/articles/54159289468953-XT-Pre-Market-Trading-SPACE-intodotspace-Launching-Soon)
**Author:** XT.COM Team | **Published:** 2026-01-12

XT.COM support page announcing pre-market OTC trading for SPACE (intodotspace), including trading start times (Jan 12, 2026 UTC) and a summary of the project and docs/whitepaper link. This exchange-level notice corroborates that major centralized venues were scheduling pre-market trading and preparing OTC order-matching/settlement for the token — evidence that tradable listings were planned and that a liquid price source could be available for resolution if conversion proceeded correctly. ([xtsupport.zendesk.com](https://xtsupport.zendesk.com/hc/en-us/articles/54159289468953-XT-Pre-Market-Trading-SPACE-intodotspace-Launching-Soon))

### [Space Opens Public Sale for $SPACE Token on Leveraged Prediction Market Platform](https://www.thetechly.com/space-opens-public-sale-for-space-token-on-leveraged-prediction-market-platform/)
**Author:** Tushar Singla | **Published:** 2026-03-05

Press/analysis piece summarizing the Space public-sale mechanics: a $50M FDV floor, $99M ceiling, linear FDV curve ($0.05 to $0.099) after a $2.5M initial target, 1,000,000,000 total supply, and claims that everything unlocks at TGE. The article also discusses the project team, tokenomics, buyback/burn design (50% revenue to buyback), and the risk/reward of the launch. This is a representative press source that reports the public-sale floor and sale mechanics repeated across outlets; those mechanics are the critical inputs that imply FDV >> $15M if the sale cleared and tokens were tradable. ([thetechly.com](https://www.thetechly.com/space-opens-public-sale-for-space-token-on-leveraged-prediction-market-platform/))

### [Space Announces Public Sale of Its Native Token, SPACE](https://dailyhodl.com/2025/12/17/space-announces-public-sale-of-its-native-token-space/)
**Author:** Chainwire (published on Daily Hodl) | **Published:** 2025-12-17

Press release coverage describing Space’s public sale (start Dec 17, 2025), floor FDV $50M, ceiling $99M, total supply 1,000,000,000, and explicit statements that allocations will be determined by a market-clearing price and that tokens are unlocked at TGE per the release. This press piece is one of several that distributed the project’s official sale parameters and provides evidence that the sale was structured such that any clearing price at or above the announced floor would imply FDV well above $15M. ([dailyhodl.com](https://dailyhodl.com/2025/12/17/space-announces-public-sale-of-its-native-token-space/?utm_source=openai))

### [Space Faces Scrutiny After $20M ICO, Keeping More Than 5X The Target Raise](https://solanafloor.com/news/space-faces-scrutiny-after-20-m-ico)
**Author:** Unknown | **Published:** Unknown

Independent reporting alleging that Space’s public sale raised materially more than its $2.5M target (reports suggest >$14M–$20M in commitments) and reporting allocation/clearing details (mentions distribution at ~$0.069 per token for parts of the community pool). If accurate and referring to the same sale, these observations imply a clearing price materially above the $15M threshold (implying FDV ≫ $15M). This source is useful as secondary confirmation of a high clearing price, but it should be checked against on‑chain or exchange settlement data due to variability across reports. ([solanafloor.com](https://solanafloor.com/news/space-faces-scrutiny-after-20-m-ico?utm_source=openai))

### [Space Kurs: SPACE real-time price chart (CoinGecko placeholder)](https://www.coingecko.com/ko/%EC%BD%94%EC%9D%B8/space-3)
**Author:** CoinGecko (site page) | **Published:** Unknown

CoinGecko’s project page placeholder for Space (shows project profile but as of the crawl did not list exchange prices yet). It is relevant because coin‑aggregator placeholders often lag real listings — the presence of a project profile corroborates that the token is recognized by aggregators, but the lack of live price data cautions that broader market pricing/aggregation may not have been established at the time. This supports the need to verify actual exchange price feeds and on‑chain mint addresses before concluding firmly. ([coingecko.com](https://www.coingecko.com/ko/%EC%BD%94%EC%9D%B8/space-3?utm_source=openai))
