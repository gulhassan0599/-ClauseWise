import { generateCompletion } from './aiService.js';
import { getContractChatPrompt, CHAT_PARAMETERS } from '../prompts/chatPrompt.js';
import logger from '../utils/logger.js';

/**
 * Interactive Chat Service.
 * Handles the compilation of conversation history, contract context, and the new user question
 * into a single cohesive prompt for the Groq AI, strictly enforcing token limits.
 * 
 * @param {string} contractText - The extracted text of the contract.
 * @param {Object} contractAnalysis - The structured analysis object previously generated.
 * @param {Array} previousHistory - Array of previous chat messages ({ role, content }).
 * @param {string} userQuestion - The new question asked by the user.
 * @returns {Promise<string>} The AI's conversational response.
 * @throws {Error} Throws if required context is missing.
 */
export const handleUserChat = async (contractText, contractAnalysis, previousHistory, userQuestion) => {
  if (!contractText) {
    throw new Error('No valid contract text provided for chat context.');
  }
  if (!userQuestion) {
    throw new Error('User question is required.');
  }

  logger.info('Processing user chat question...');

  // 1. Fetch system prompt
  const systemPrompt = getContractChatPrompt();

  // Truncate to prevent Groq API rate limits (6000 TPM limit on free tier)
  // Chat requires history + prompt + response tokens, so limit text strictly.
  const MAX_CHARS = 10000;
  let textToChat = contractText;
  if (contractText.length > MAX_CHARS) {
    textToChat = contractText.substring(0, MAX_CHARS) + "\n\n...[DOCUMENT TRUNCATED DUE TO SIZE LIMITS]...";
  }

  // 2. Combine the contract text, history, and question into the user payload
  // We intentionally omit the full JSON analysis here to save heavy tokens.
  let userPayload = `--- UPLOADED CONTRACT TEXT ---\n${textToChat}\n\n`;

  if (previousHistory && Array.isArray(previousHistory) && previousHistory.length > 0) {
    userPayload += `--- PREVIOUS CONVERSATION HISTORY ---\n`;
    userPayload += previousHistory.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join('\n') + `\n\n`;
  }

  userPayload += `--- NEW USER QUESTION ---\n${userQuestion}`;

  // 3. Call Groq AI service with the chat parameters
  // No JSON validation is needed because this returns a natural language conversational string
  const aiAnswer = await generateCompletion(systemPrompt, userPayload, CHAT_PARAMETERS);

  logger.info('AI chat response generated successfully.');

  // 4. Return the raw answer string
  return aiAnswer;
};
