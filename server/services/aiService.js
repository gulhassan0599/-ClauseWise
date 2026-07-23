import { getGroqClient } from '../config/groq.js';
import logger from '../utils/logger.js';

/**
 * Core AI wrapper service.
 * Abstracts the direct API calls to the Groq LLM to ensure all application components
 * use the same foundational inference logic, error handling, and model configurations.
 */

/**
 * Generates a chat completion using the Groq API.
 * 
 * @param {string} systemPrompt - The authoritative system prompt dictating the LLM's persona and rules.
 * @param {string} userPrompt - The user-provided context or question to evaluate.
 * @param {Object} [parameters={}] - Optional overrides for model, temperature, top_p, and response format.
 * @returns {Promise<string>} The raw text response from the LLM.
 * @throws {Error} Throws a human-readable error if the API is unavailable or rate limits are exceeded.
 */
export const generateCompletion = async (systemPrompt, userPrompt, parameters = {}) => {
  try {
    const client = getGroqClient();

    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      model: parameters.model || "openai/gpt-oss-120b", // Using Groq's active instant model
      temperature: parameters.temperature ?? 0.5,
      top_p: parameters.top_p ?? 0.9,
      // If we are expecting JSON, the service calling this can pass { response_format: { type: "json_object" } } via parameters
      ...(parameters.response_format && { response_format: parameters.response_format })
    });

    // Return the raw text response. No parsing or validation here.
    return response.choices[0]?.message?.content || "";
  } catch (error) {
    logger.error(`Error calling Groq API: ${error.status || ''} ${JSON.stringify(error.error || error.message)}`);

    // Check for specific token/rate limits
    if (error.status === 413 || error.status === 429 || (error.error && error.error.code === 'rate_limit_exceeded')) {
      throw new Error('Document is too large or AI rate limit exceeded. Please try again with a shorter document or wait a few minutes.');
    }

    throw new Error('AI service is currently unavailable.');
  }
};
