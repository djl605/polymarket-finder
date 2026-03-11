/**
 * Current version of the research logic
 *
 * Update this version whenever you make significant changes to:
 * - Web search configuration
 * - AI reasoning prompts
 * - Analysis parsing logic
 *
 * Version History:
 * - 0.0: Initial implementation with Exa SDK, deep search, context parameter
 * - 1.0: Major improvements by directly asking Exa for information relevant to the specific market question.
 * - 1.1: Focus on specific evidence and also hinted that if it thinks the resolution criteria have already been met, it's probably wrong.
 * - 1.2: Updated prompt to be more objective and less biased towards mispricing.
 * - 1.3: Updated prompt to suggest not assume consensus from a few sources and to consider the timeline of the market.
 * - 1.3.1: Updated SDK call to set summary=true to get summaries again.
 * - 1.3.2: Updated Exa SDK version
 * - 2.0: Replaced Exa with OpenAI Responses API (gpt-5.4 + web_search). Single-call research + reasoning. Upgraded OpenAI SDK to v6.
 * - 2.1: Switched from gpt-5.4 to gpt-4.1 for better cost/quality balance.
 */
export const RESEARCH_VERSION = '2.1';
