// Empty prompts for the AI
// We will store system instructions and prompt templates here

export const getAnalysisPrompt = (contractText) => {
  return `Please analyze the following contract... (Placeholder)`;
};

export const getQuestionPrompt = (contractText, question) => {
  return `Based on the contract... answer this question: ${question} (Placeholder)`;
};
