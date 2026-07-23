import { generateCompletion } from './aiService.js';
import { getContractAnalysisPrompt, ANALYSIS_PARAMETERS } from '../prompts/analysisPrompt.js';
import { validateAndParseJson } from '../utils/jsonValidator.js';
import logger from '../utils/logger.js';

/**
 * Primary service for analyzing legal contract documents using the Groq AI.
 * Handles token limit truncation, prompt construction, and rigorous JSON validation
 * to guarantee structured responses for the frontend.
 * 
 * @param {string} extractedText - The raw text extracted from the uploaded PDF contract.
 * @returns {Promise<Object>} The validated and structured analysis JSON object.
 * @throws {Error} Throws if the text is invalid, AI fails, or JSON validation fails.
 */
export const analyzeContractDocument = async (extractedText) => {
  if (!extractedText || typeof extractedText !== 'string' || extractedText.trim() === '') {
    throw new Error('No valid contract text provided for analysis.');
  }

  logger.info('Initiating AI contract analysis...');

  // Truncate to prevent Groq API rate limits (6000 TPM limit on free tier)
  // ~4 chars per token. 14,000 chars is ~3,500 tokens, leaving room for prompt & response.
  const MAX_CHARS = 14000;
  let textToAnalyze = extractedText;
  if (extractedText.length > MAX_CHARS) {
    logger.warn(`Document too large (${extractedText.length} chars). Truncating to ${MAX_CHARS} chars to fit AI limits.`);
    textToAnalyze = extractedText.substring(0, MAX_CHARS) + "\n\n...[DOCUMENT TRUNCATED DUE TO SIZE LIMITS]...";
  }

  // 1. Fetch system prompt
  const systemPrompt = getContractAnalysisPrompt();

  // 2. Prepare the user payload
  const userPrompt = `Here is the document text to analyze:\n\n${textToAnalyze}`;

  // 3. Call Groq AI service with JSON mode explicitly enabled
  const rawAiResponse = await generateCompletion(systemPrompt, userPrompt, {
    ...ANALYSIS_PARAMETERS,
    response_format: { type: 'json_object' }
  });

  // 4. Safely parse and validate the AI's output
  const validationResult = validateAndParseJson(rawAiResponse);

  if (!validationResult.success) {
    logger.error(`AI response failed validation: ${validationResult.error}`);
    throw new Error(`Analysis failed: ${validationResult.error}`);
  }

  logger.info('AI contract analysis completed successfully.');

  // 5. Return the clean JavaScript object
  return validationResult.data;
};
