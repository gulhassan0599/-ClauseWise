import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

// Ensure environment variables are loaded if this file is imported early
dotenv.config();

let groqClient = null;

try {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is missing in environment variables.');
  }

  groqClient = new Groq({
    apiKey: apiKey,
  });

  logger.info('Groq client configured successfully.');
} catch (error) {
  logger.error('Failed to configure Groq client:', error.message);
  // We do not crash the app here, but the getGroqClient will throw when called
}

export const getGroqClient = () => {
  if (!groqClient) {
    throw new Error('Groq client is not initialized. Please configure a valid GROQ_API_KEY in your .env file.');
  }
  return groqClient;
};
