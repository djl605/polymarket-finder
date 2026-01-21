/**
 * Current version of the research logic
 * 
 * Update this version whenever you make significant changes to:
 * - Search query generation
 * - Exa search parameters (type, numResults, etc.)
 * - AI reasoning prompts
 * - Analysis parsing logic
 * 
 * Version History:
 * - 0.0: Initial implementation with Exa SDK, deep search, context parameter
 * - 1.0: Major improvements by directly asking Exa for information relevant to the specific market question.
 * - 1.1: Focus on specific evidence and also hinted that if it thinks the resolution criteria have already been met, it's probably wrong.
 * - 1.2: Updated prompt to be more objective and less biased towards mispricing.
 */
export const RESEARCH_VERSION = '1.2';

