# Research: Cap FDV above $100M one day after launch?

**Market ID:** 0xd6d564528c3d17a3cf2425067d54807a48fda0991705816af769bce54c7de792
**Researched At:** March 21, 2026 at 04:21:40 AM UTC
**Search Query:** "Cap FDV above $100M one day after launch?"

---

## AI Analysis

**Confidence:** Low
**Expected Value:** 2.4¢

### Summary

Cap’s stablecoin product (cUSD/stcUSD) is live and the team has published governance tokenomics as percentages, but there is no public total supply, token contract, or TGE/listing price. Because FDV = total supply × price, the crucial numeric inputs are missing; the market’s 45.5% price plausibly reflects genuine uncertainty rather than a clear mispricing. I find insufficient public evidence to claim a >20¢ mispricing; the expected value of investigating further is small (~2.4¢) and my confidenc

### Full Analysis

Planned approach and short answer up front
- I searched primary sources (project website/docs, contract addresses, independent trackers and community reports) to determine whether Cap has a governance token TGE and, if so, whether there is credible public information that would make FDV > $100M very likely one day after launch. I found that Cap’s stablecoin products (cUSD / stcUSD) are live, the project has publicly posted tokenomics percentages for a planned “Cap” governance token, but there is no public token contract, TGE date, or announced total supply that would let us compute a credible FDV estimate. Because the key inputs (supply and listing price/timing) are not public, there is insufficient concrete evidence to declare a >20¢ mispricing. I estimate a small expected-value edge to investigating this market (EXPECTED_VALUE below) and give a low confidence rating due to substantial information gaps.

1) CONTEXT ANALYSIS
- What the market asks: “Cap FDV above $100M one day after launch?”
- How it resolves YES: A governance token for Cap must be publicly launched (actively, publicly transferable/tradable) and, at 4:00 PM ET on the calendar day after that launch, the Fully Diluted Valuation (total token supply × token price) as measured by the market’s resolution source must exceed $100,000,000.
- How it resolves NO: Either (a) no token is launched before the market’s token cutoff (Dec 31, 2027 11:59 PM ET) or (b) the token launches but the FDV at the specified 4:00 PM ET cut-off the day after launch is ≤ $100M.
- Key technical clarifications to check before trading: exact token ticker and contract address at launch; whether the project’s announced “Cap Tokens” refer to a single governance token counted in FDV; which exchange / price feed the resolution source will use (the market uses “the most liquid price source available”).

2) EVIDENCE EVALUATION (what I found)
Primary relevant findings:
- Cap product launch and live stablecoins:
  - Cap’s official site/blog confirms the protocol (cUSD and stcUSD) launched and is live (blog post “A New Dawn For Stablecoins: Cap is Officially Live”, Aug 18, 2025). This documents functioning stablecoin contracts and a Frontier program that issues “Caps” points. (cap.app). ([cap.app](https://cap.app/knowledge-base/a-new-dawn-for-stablecoins-cap-is-officially-live))
- Project docs describing a governance token (but no supply / TGE details):
  - The official docs page “Cap Tokens” lists utility and governance roles and gives tokenomics as percentages (Ecosystem development 46.72%; Team up to 20%; Investors up to 20%; Community ICO 10%; Echo community sale 3.28%), but it does not state a total supply, issuance schedule, or a TGE date. Last update note present but no explicit supply/price. This implies a governance token is planned but key numeric inputs are not published. ([docs.cap.app](https://docs.cap.app/cap-tokens))
- On-chain / product addresses:
  - Cap’s docs provide deployed contract addresses for cUSD and stcUSD on mainnet — confirming the stablecoin product is live and on-chain. No governance-token contract address is listed in the addresses/dev page. That is evidence the governance token had not been minted (or if minted, the contract is not yet published in docs). ([docs.cap.app](https://docs.cap.app/developers/addresses))
- Exchange / tracker pages and community guides:
  - Some exchange/tracker pages list cUSD as a token (example: LBank’s CUSD page which shows supply/FDV numbers for cUSD), but these pages refer to the stablecoin, not an independent governance-token FDV. Independent “airdrop / farming” guides and community writeups describe users farming “Caps” points and explicitly say there is currently no governance token live — they present Caps as a points/earnings program widely expected to precede a future token launch. These are secondary/derivative sources (not project primary docs) and they reiterate that a token TGE has not publicly happened. ([lbank.com](https://www.lbank.com/tr/price/cap-usd))
- Aggregator/news roundup references:
  - DeFi roundups (DefiLlama mention) and ecosystem writeups note Cap’s August 2025 mainnet launch and institutional partnerships. These signal real institutional/backer interest, which supports the plausibility of a significant token market if launched and listed widely — but they do not provide token supply/price. ([ru.tgchannels.org](https://ru.tgchannels.org/channel/defillama_tg?first=1932&lang=all&size=30&start=1882&utm_source=openai))

What SPECIFIC evidence suggests the market price (45.5%) might be incorrect?
- Missing supply and listing-price data: Without a published total supply / emission schedule / listing price, FDV cannot be computed. If traders treated “token will have a conventional supply size and list at a modest price” that assumption could be wrong — either the project could issue a small supply that makes $100M FDV trivial, or a very large supply or low listing price could keep FDV < $100M. The absence of a published supply is direct evidence that the market price must be driven by guesses rather than objective arithmetic. ([docs.cap.app](https://docs.cap.app/cap-tokens))
- Low-volume / no trading volume: The market’s metrics show total volume $0 and price 45.5% with a 3¢ spread. Low-volume markets are frequently dominated by one or a few participants; that increases the chance current price reflects idiosyncratic beliefs rather than broad information aggregation. (market data supplied in prompt)

What evidence SUPPORTS the current market price as reasonable?
- Plausible path to >$100M FDV: Cap has institutional backers mentioned in its materials (the project lists partnerships/backers in its blog and documentation). If the token’s total supply is modest (e.g., 100–500M tokens) and if initial listing price is in a typical early-token range, FDV > $100M is plausible. Institutional support, product traction (live stablecoins), and a community-farming narrative increase the chance of significant early demand/liquidity. ([cap.app](https://cap.app/knowledge-base/a-new-dawn-for-stablecoins-cap-is-officially-live))
- Tokenomics allocations consistent with launching a tradable governance token: the docs’ allocation table indicates an intentional token design with community sale and ecosystem allocation — consistent with a real TGE that could attract liquidity and push FDV above thresholds. That plausibly justifies a mid‑range probability (near ~45%) rather than near 0% or 100%. ([docs.cap.app](https://docs.cap.app/cap-tokens))

Source credibility and recency
- cap.app (official blog & docs) — primary source and highest credibility for what the protocol has deployed and what is planned. Blog dated Aug 18, 2025; docs pages show recent update timestamps. These are authoritative for what the team has publicly stated. ([cap.app](https://cap.app/knowledge-base/a-new-dawn-for-stablecoins-cap-is-officially-live))
- docs addresses page — primary, authoritative for deployed contracts (shows cUSD/stcUSD addresses; no governance-token address). ([docs.cap.app](https://docs.cap.app/developers/addresses))
- LBank / Airdrop guides / community writeups — lower credibility (third-party aggregator/opinion) but useful for seeing how trackers and users are interpreting the project (they consistently show cUSD live and “Caps” as a points program; they do not show a live governance token). Use cautiously. ([lbank.com](https://www.lbank.com/tr/price/cap-usd))
- DefiLlama / ecosystem roundups — reasonable credibility for summarizing ecosystem events, but not a substitute for contract-level evidence or official token-supply numbers. ([ru.tgchannels.org](https://ru.tgchannels.org/channel/defillama_tg?first=1932&lang=all&size=30&start=1882&utm_source=openai))

Skeptical notes (why the “obvious” reading may be wrong)
- If it feels “obvious” that FDV should exceed $100M because Cap has institutional partners and live product, remember: FDV = total supply × price. Projects can set huge total supplies (reducing required per-token price) or tiny supplies (increasing per-token price) and can choose sale/listing approaches that produce widely different day‑1 FDVs. Traders may also expect heavy airdrops to retail holders that depress early token price. These supply/vesting details are absent from public docs, so any “common-sense” FDV estimate may already be priced in by other traders who made different supply assumptions.

3) MARKET EFFICIENCY ANALYSIS
- Reasonable interpretations that justify the current 45.5% price:
  - Traders are uncertain but split: some assume a mid-sized supply and healthy listing demand → FDV > $100M; others assume a larger supply or conservative listing → FDV ≤ $100M. The docs’ tokenomics (large ecosystem allocation) gives traders a basis to imagine an FDV above $100M, but the missing absolute supply leaves wide variance.
  - 45.5% could reflect a prior that a TGE will happen and be listed with moderate demand — not a confident forecast but a near-even split reflecting real uncertainty.
- Could the price reflect one or a few participants? Yes — the market shows $0 total trading volume and a tight spread, typical of markets with thin orderbooks and possibly single-player pricing. That increases the chance price is not an efficient aggregate of diverse views.
- Why low volume? Multiple plausible explanations:
  - Many informed traders may not engage until tokenomics (total supply, TGE details, contract address) are public — waiting for resolvable data.
  - The outcome is conditional on three things (TGE happening before cutoff, token being tradable, FDV > $100M at specific time), which some traders may find complex and avoid.
  - Alternatively, the market could be overlooked by liquidity providers; initial price may be set by an individual speculator.

4) MISPRICING ASSESSMENT (objective weighing)
- The clearest missing fact: total token supply and any announced listing or ICO/Community-ICO pricing. Without these, FDV cannot be computed and any market price is necessarily speculative.
- Evidence that might shift the market meaningfully (and whether it’s missing now):
  - If the project publishes a small total supply and/or a high community-ICO list price / exchange listing price that implies FDV > $100M at day-1, that would be strong evidence the market is underpricing the YES outcome. That evidence is not public.
  - If the project announces a very large supply, heavy early unlocks or large insider allocations available day‑1, or a low initial list price (or no listings on liquid venues day-1), those would strongly support NO. That evidence is not public either.
- Because both directions hinge on unpublished, high‑leverage facts (supply and listing/initial price), I cannot confidently assert a specific mispricing. The proper charitable interpretation of the 45.5% price: traders are acknowledging meaningful uncertainty and currently splitting the probability near 50/50 given absence of supply/TGE details.
- Critical check (largest mispricing >20¢): I find no concrete, public evidence that would justify concluding the market is mispriced by >20¢ either way. Any claim of large mispricing would require reliable public numbers about token supply and planned sale/listing price that are not available.

5) EXPECTED VALUE CALCULATION (my estimate of the value of investigating/trading)
- Strength of evidence (how likely the specific missing data is both discoverable and materially changing price): 30% (the most load-bearing missing facts — supply and an announced TGE/price — are discoverable when the team publishes a TGE announcement, but as of today they are not published; until then our evidence is weak).
- Magnitude of mispricing if the missing info turned out to clearly favor YES or NO: I estimate a plausible magnitude around 8 cents (0.08 USD) — i.e., discovering clear published numbers could move the market several tenths of a dollar, but a full >20¢ swing seems unlikely without extremely lopsided supply/price announcements.
- Expected value = Strength × Magnitude = 0.30 × 8¢ = 2.4¢ (2.4 cents).

6) CONFIDENCE
- My confidence in this assessment: low
  - Reason: the decisive inputs (total token supply, TGE details, listing/exchange liquidity and price) are not publicly available; analysis therefore must treat the market as driven by private assumptions. As a result, any assessment is inherently uncertain until Cap publishes a token contract, supply, and TGE/listing details.

FINAL ANSWER BLOCK (as requested)
EXPECTED_VALUE: 2.4
SUMMARY: Cap’s stablecoin product (cUSD/stcUSD) is live and the team has published governance tokenomics as percentages, but there is no public total supply, token contract, or TGE/listing price. Because FDV = total supply × price, the crucial numeric inputs are missing; the market’s 45.5% price plausibly reflects genuine uncertainty rather than a clear mispricing. I find insufficient public evidence to claim a >20¢ mispricing; the expected value of investigating further is small (~2.4¢) and my confidence is low.
CONFIDENCE: low

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [A New Dawn For Stablecoins: Cap is Officially Live](https://www.cap.app/blog/a-new-dawn-for-stablecoins-cap-is-officially-live)
**Author:** Unknown (cap.app / Cap Labs) | **Published:** 2025-08-18

Official Cap blog post announcing Cap’s mainnet launch and the availability of cUSD and the stcUSD product, and saying users can start minting cUSD and “earn Caps” via the Frontier Program. The post lists institutional partners and integrations and links to docs and community channels. This is primary evidence that the protocol and its stablecoins are deployed and operational; it supports the argument that a governance token TGE is plausible but does not provide token supply or TGE details, which are essential to compute FDV and therefore is neutral with respect to the market’s YES/NO outcome.

### [Cap Tokens (documentation)](https://docs.cap.app/cap-tokens)
**Author:** Unknown (Cap documentation) | **Published:** Unknown (docs show recent updates)

Official documentation page describing the planned governance/utility token. It lists governance utility and a tokenomics allocation as percentages (Ecosystem 46.72%; Team up to 20%; Investors up to 20%; Community ICO 10%; Echo community sale 3.28%). Crucially, it does not publish a total token supply, emission schedule, TGE date, or price guidance. This is the central source showing that a governance token is planned but that the critical numeric inputs for FDV are absent publicly; that missing data is the key reason the market must rely on estimates, increasing uncertainty.

### [Addresses (Developers) — Cap documentation](https://docs.cap.app/developers/addresses)
**Author:** Unknown (Cap documentation) | **Published:** Unknown (docs show recent updates)

Developer docs listing deployed contract addresses for cUSD, stcUSD, oracles, fee receivers, timelock, etc., on Ethereum and MegaETH. The page confirms cUSD/stcUSD contracts are live on-chain; it does not include any governance-token contract address. This supports the factual claim that only the stablecoin contracts are publicly live and that no governance token contract is published in official developer resources as of the page’s update — an important negative data point for expecting a TGE already to have occurred.

### [Cap USD (CUSD) Today's Price | Real-Time CUSD Price and Market Data on LBank](https://www.lbank.com/price/cap-usd)
**Author:** LBank (exchange/tracker) | **Published:** 2026-03-21

LBank’s token page displays CUSD price, circulating supply and FDV values for the cUSD stablecoin (shows circulating/total supply ~128M and FDV ~$126M on their tracker). It documents how third-party trackers are already treating cUSD as an on-chain token and reporting supplies/market metrics for it. This is relevant because it shows market/aggregator attention on the stablecoin product; however, it does not provide data for a separate governance token FDV and some language conflates governance/utility roles with the cUSD listing, so it must be treated cautiously.

### [Cap Money Airdrop – How to Farm This Next-Generation Yield-Bearing Stablecoin Protocol](https://airdropguild.com/cap-money-airdrop-how-to-farm-this-next-generation-yield-bearing-stablecoin-protocol/)
**Author:** Unknown (Airdrop Guild) | **Published:** Unknown

Community/audit-style guide describing how users can “farm” Caps points by minting and holding cUSD and participating in the Frontier Program. The guide explicitly notes there is currently no native governance token live and frames “Caps” as points expected to precede a future token launch. This is a lower‑credibility community source but corroborates the official docs’ narrative that tokens or token-based rewards exist in a points form and that a TGE has not (publicly) happened.

### [DefiLlama Official Round Up (mentions Cap launch and ecosystem context)](https://ru.tgchannels.org/channel/defillama_tg?first=1932&lang=all&size=30&start=1882)
**Author:** Unknown (DefiLlama roundup via aggregator) | **Published:** Unknown

A DeFi news roundup that references Cap announcing an August 18, 2025 mainnet launch and summarizes ecosystem activity and integrations. It places Cap in broader DeFi ecosystem context and mentions partnerships and integrations; useful for understanding institutional interest and product traction but it does not supply token supply or TGE details. This source supports the view that product momentum exists (which could push token demand if/when tokenomics are disclosed) but is not decisive for FDV without supply/price numbers.
