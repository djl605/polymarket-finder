# Research: Space FDV above $5M one day after launch?

**Market ID:** 0x07d8173b349b8c41fe2813590fcfec1f2f31446644aa15216601b93cdd9f2fb0
**Researched At:** March 18, 2026 at 04:38:19 AM UTC
**Search Query:** "Space FDV above $5M one day after launch?"

---

## AI Analysis

**Confidence:** Medium
**Expected Value:** 18.6¢

### Summary

Public reporting and the project’s own pages consistently state a 1,000,000,000 total supply and a public sale/list price implying an FDV (~$69M) far above the $5M threshold, so YES looks much more likely than the market’s 68.5% price. Remaining uncertainties (transferability at TGE, which on-chain supply the resolver will use, and liquidity/price-source ambiguity) justify a non-zero discount and warrant direct on-chain verification before trading. ([into.space](https://into.space/))

### Full Analysis

Plan & scope
- I used public project pages and crypto press/data sites (not prediction-market sites) to answer: does Space’s governance token FDV exceed $5M one day after launch (per the market’s resolution rules)?
- Key questions I needed answers to:
  1) Has Space published tokenomics (total supply and sale price / TGE unlocking) that determine likely FDV?
  2) Did a public sale / TGE occur or is one scheduled before 2026-12-31 (market’s cutoff)?
  3) Is the token publicly tradable and what prices / liquidity data are available around/after the TGE?
- I searched official project pages and multiple crypto press/data outlets to corroborate token supply, sale price, and reports of a TGE/listing. (Web searches used: into.space site + corroborating reports from Decrypt, CryptoRank, CoinCarp.)

1) CONTEXT ANALYSIS
- What the market asks: Will the Fully Diluted Valuation (FDV = total token supply × token price) of Space’s governance token be greater than $5,000,000 at 4:00 PM ET on the calendar day after launch? The token must be publicly transferable and tradable to count as a launch. If no token is launched by 2026-12-31 11:59 PM ET, the market resolves No.
- What must happen for Yes vs No:
  - YES: Space launches a tradable token, and at 16:00 ET the day after that launch the most-liquid price multiplied by the published total token supply exceeds $5M.
  - NO: Either (a) the token is not launched/tradable by the cutoff date, or (b) it is tradable but FDV at the specified timestamp is ≤ $5M.

2) EVIDENCE EVALUATION (all evidence summarized with source citations)
Key, load-bearing facts I found:
- Multiple project press/announcement pages and data aggregators report a total supply of 1,000,000,000 (1 billion) SPACE tokens and a public sale / IDO with a sale price reported around $0.069 (implying an FDV ≈ $69M at that sale price). These appear in press coverage and ICO trackers. ([decrypt.co](https://decrypt.co/352708/space-announces-public-sale-of-its-native-token-space/?utm_source=openai))
- The official Space website (into.space) presents the product and points to docs and sale links (sale.into.space) and had a TGE / platform-launch timeline referenced in public writeups (site content and FAQ point to token-related docs). ([into.space](https://into.space/))
- Market-data pages (aggregators) list SPACE price/FDV figures consistent with an FDV well above $5M (examples of aggregator pages showing non-trivial quoted prices and FDV figures). ([coincarp.com](https://www.coincarp.com/currencies/space/project-info/?utm_source=openai))

Evidence that the market price (68.5%) might be incorrect (i.e., that YES is much more likely than 68.5%):
- If total supply = 1,000,000,000 and the public sale price (or an observed listing price) is ≈ $0.069 (as repeatedly reported), FDV = 1,000,000,000 × $0.069 = $69M, far above the $5M threshold. That single arithmetic fact makes YES overwhelmingly likely unless the token price collapses below $0.005 per token within the first day. Press and ICO-tracker figures support that sale price / FDV scale. ([decrypt.co](https://decrypt.co/352708/space-announces-public-sale-of-its-native-token-space/?utm_source=openai))
- Some aggregators report trading prices/FDV numbers (e.g., CoinCarp page showing a quoted price and FDV >> $5M), which (if accurate and based on live markets) would directly support YES. ([coincarp.com](https://www.coincarp.com/currencies/space/project-info/?utm_source=openai))

Evidence supporting the market price as reasonable / reasons to be skeptical of an automatic “YES near-certain”:
- Resolution specifics matter: the market resolves using “the most liquid price source available” at 4:00 PM ET the day after launch. If the token is only marginally tradable on a thin DEX pair with very little liquidity at listing, a tiny trade could establish a very low “liquid” price or conversely the reported “most liquid source” might not reflect the public sale price. Traders may be discounting that liquidity/price discovery risk.
- There’s potential ambiguity about which supply figure counts for FDV (projects sometimes report “max supply,” “total supply,” or “initial circulating supply” differently). If a much larger total supply (or a different on-chain contract config) exists than the announced figure, or if the published “total supply” is different from the contract total supply used by the resolution engine, FDV can change. The market’s explicit rule uses total token supply × token price — so the exact on-chain supply matters. (I found consistent reporting of 1,000,000,000 supply, but resolving depends on the specific on-chain supply at TGE.) ([decrypt.co](https://decrypt.co/352708/space-announces-public-sale-of-its-native-token-space/?utm_source=openai))
- The token must be “actively, publicly transferable and tradable” to be counted as launched. If the project locked trading, restricted listings, or only allowed contributions via a sale but did not make tokens transferable at TGE, the market would resolve No regardless of nominal FDV implied at sale. Traders may be discounting the chance of restricted transferability, delays, or other technicalities.
- Low volume on the prediction market (market metrics show Total Vol $0) means the market price could reflect just a few traders’ priors, not broad aggregation. That increases uncertainty about whether the price is a true consensus or simply conservative.

Source credibility and recency
- Official project site (into.space) is primary and authoritative for claims about sale and links to docs; it’s the logical primary source for tokenomics and launch timeline. Credibility: high for published claims (but still needs external confirmation for on-chain truth).
- Decrypt and similar crypto press pieces reporting the public sale and tokenomics are generally credible and contemporaneous with the announced sale (they are reporting project press releases). Credibility: medium-high for factual reporting about announced sale parameters; less authoritative than on-chain data but helpful corroboration. ([into.space](https://into.space/))
- CryptoRank / ICO trackers and aggregator sites collect sale data (sale price, amounts raised, stated total supply). Useful for corroboration but sometimes reflect project-submitted figures without independently verifying on-chain state or exchange listings. Credibility: medium. ([cryptorank.io](https://cryptorank.io/ico/intodotspace?utm_source=openai))
- CoinCarp / smaller aggregators are lower-tier but useful for seeing reported live prices/FDV; however such aggregators can lag, show stale or erroneous feeds, or conflate tokens with similar names. Credibility: low-medium; treat corroboratively rather than as sole evidence. ([coincarp.com](https://www.coincarp.com/currencies/space/project-info/?utm_source=openai))

Bullish (YES) perspective
- Reported total supply 1,000,000,000 + reported sale/list price ≈ $0.069 → FDV ≈ $69M (>> $5M). Unless the token’s market price collapses to < $0.005 within the first day, YES is almost guaranteed by arithmetic.
- Aggregator pages showing quoted prices and FDV well in excess of $5M further support YES if those quotes are real (on-chain/DEX/CEX listings). ([decrypt.co](https://decrypt.co/352708/space-announces-public-sale-of-its-native-token-space/?utm_source=openai))

Bearish (NO / discounting YES) perspective
- Technicalities around “publicly transferable and tradable” could invalidate a claimed TGE (e.g., tokens locked/vesting, or the TGE didn’t make tokens tradable at the time the resolution requires). Traders may be discounting this risk.
- Liquidity / price-source risk: the resolution uses the “most liquid price source available” — if that source is an extremely thin pair or an off-market quote, the observed price could be unreliable/unrepresentative of the sale price.
- Aggregators can be wrong / conflating tokens with similar names; if the reported supply or sale price is inaccurate, FDV calculations change materially.

3) MARKET EFFICIENCY ANALYSIS
- Reasonable interpretations that justify the current 68.5% price:
  - Traders are aware of published sale data (which implies FDV >> $5M) but are discounting non-zero operational/technical risks: transferability restrictions, listing delays, or ambiguity over which supply figure is used for the FDV calculation.
  - The market is thin (Total Vol $0), so the displayed price could reflect a few cautious traders rather than a broad consensus — i.e., it’s conservative until more volume comes in.
- Could this represent consensus among informed traders? Possibly, but the low volume suggests it likely does not yet reflect broad participation by many informed traders. The market could therefore understate the likelihood of YES because no one has arbitraged it closer to near-certain.
- Is the low volume because outcome is obvious? It seems the outcome is fairly straightforward mathematically if the published sale price and supply are correct — that would normally prompt arbitrage to push the market toward near-certain. Low volume suggests instead that either (a) traders view the launch/transferability as uncertain and thus are cautious, or (b) the prediction-market participants are simply not paying attention.

4) MISPRICING ASSESSMENT (rigorous check)
- If the project’s published figures (1,000,000,000 total supply; public sale / listing price ≈ $0.069; tokens unlocked at TGE and tradable) are correct and the token was tradable one day after launch, FDV >> $5M and YES is effectively certain.
- Given that, a market probability of 68.5% would imply a sizable mispricing (market undervaluing YES). But before concluding a >20-cent mispricing I must ask: What am I missing?
  - Could traders be aware that tokens were not transferable at the required time? Possibly — that would make the market correctly conservative.
  - Could the published total supply differ from the on-chain supply the resolver will use? That would matter — but I found multiple sources reporting the same total supply (1,000,000,000), reducing this worry. ([decrypt.co](https://decrypt.co/352708/space-announces-public-sale-of-its-native-token-space/?utm_source=openai))
  - Could the “most liquid price source” be an obscure low-price feed? That is plausible in low-liquidity listings, and traders may be pricing in a risk that the initial on-chain trades set a very low price before a healthy market forms.
- After weighing both sides: the preponderance of public reporting points to an FDV comfortably above $5M if the token is tradable at reasonable sale/list prices; therefore I see credible evidence that the market is conservative and likely understates YES — but not with absolute certainty because of the transferability / price-source ambiguity.

5) EXPECTED VALUE CALCULATION
- My estimate of the “true” probability that FDV > $5M one day after launch:
  - Base arithmetic (1bn supply × reported sale price $0.069) suggests near-certain YES — I would put a subjective probability ≈ 95% that FDV > $5M, conditional on tokens being tradable in the conventional sense at/after TGE.
  - Because there remain operational uncertainties (transfer restrictions, rarity of on-chain liquidity, or aggregator errors), I discount that a bit.
- Strength of evidence (how reliable / new / missing from market): 70% — project/site + several independent press/aggregator reports point strongly toward YES, but I lack direct on-chain price-at-4pm-ET verification and the market’s resolution rule’s price-source ambiguity creates non-negligible uncertainty.
- Magnitude of mispricing: market at 68.5% vs my subjective 95% → difference 26.5 cents.
- Expected value = Strength × Magnitude = 0.70 × 26.5 ≈ 18.55 cents.

Concluding judgment (objective)
- The evidence indicates a likely mispricing: publicly reported tokenomics and sale price imply FDV well above $5M, so the market price (68.5%) looks conservative and likely understates the probability of YES. The most charitable reasons for the conservative market price are (a) traders properly discounting token-transfer/listing technicalities and (b) low market participation leaving the price set by a few cautious traders.
- I cannot say with absolute certainty because I have not verified on-chain token supply vs contract, nor checked the actual price on the specific “most liquid” venue at the precise resolution timestamp. Those checks would be the next steps if you want to act on this as a trading opportunity.

EXPECTED_VALUE: 18.6
SUMMARY: Public reporting and the project’s own pages consistently state a 1,000,000,000 total supply and a public sale/list price implying an FDV (~$69M) far above the $5M threshold, so YES looks much more likely than the market’s 68.5% price. Remaining uncertainties (transferability at TGE, which on-chain supply the resolver will use, and liquidity/price-source ambiguity) justify a non-zero discount and warrant direct on-chain verification before trading. ([into.space](https://into.space/))
CONFIDENCE: medium

---

## Research Context

*The following sources were found via web search and used in the analysis:*

### [Space - 10x Prediction Markets on Solana](https://into.space/)
**Author:** Unknown | **Published:** Unknown

Official project website for Space (into.space). The site presents the platform (built on Solana), points to documentation (docs.into.space) and sale links (sale.into.space), and hosts FAQs about launch/token items. This is the primary project source referenced in press reports; if tokens are issued/transferrable on-chain as the site and docs imply, the market’s FDV calculation will use the on-chain supply and price at the resolution timestamp. This source supports the view that a public token sale/TGE was planned and directs to sale/documentation that underpins the tokenomics figures reported elsewhere. ([into.space](https://into.space/))

### [Space Announces Public Sale of its Native Token, $SPACE](https://decrypt.co/352708/space-announces-public-sale-of-its-native-token-space/)
**Author:** Unknown | **Published:** Unknown

Decrypt coverage of Space’s announced public sale / token details. The article reports tokenomics items repeatedly cited by other outlets, including a total supply figure of 1,000,000,000 and the public-sale/TGE timeline and sale mechanics. These reported tokenomics imply an FDV (at the reported sale price) well above $5M — a central datapoint for assessing whether YES is effectively certain. Decrypt is a recognized crypto press outlet, providing corroboration independent of project press releases. ([decrypt.co](https://decrypt.co/352708/space-announces-public-sale-of-its-native-token-space/?utm_source=openai))

### [Space (SPACE) ICO Funding Rounds, Token Sale Review & Tokenomics | CryptoRank](https://cryptorank.io/ico/intodotspace)
**Author:** Unknown | **Published:** Unknown

CryptoRank’s ICO/project page aggregates fundraising and tokenomics information: reported funds raised, public-sale dates, sale price and tokenomics, and a reported FDV figure (calculated from total supply × sale price). CryptoRank lists total supply as 1,000,000,000 and an FDV in the tens of millions based on reported sale price — this corroborates the arithmetic that FDV should be comfortably above $5M at typical sale/list prices. CryptoRank is a data aggregator that generally sources project disclosures and sale pages; useful for corroboration but not a substitute for on-chain verification. ([cryptorank.io](https://cryptorank.io/ico/intodotspace?utm_source=openai))

### [SPACE(SPACE) Tokenomics and ICO/IDO (Token Sale) info | CoinCarp](https://www.coincarp.com/currencies/space/project-info/)
**Author:** Unknown | **Published:** Unknown

CoinCarp lists token data and a quoted price and FDV for SPACE (aggregated token data). The page shows a token price and an implied FDV well above $5M, which—if derived from live exchange/DEX prices—directly supports YES. CoinCarp is a smaller aggregator and its pages can reflect a mixture of feeds; it is helpful corroboration of reported sale/list prices but should be validated against primary on-chain or exchange sources for final confirmation. ([coincarp.com](https://www.coincarp.com/currencies/space/project-info/?utm_source=openai))
