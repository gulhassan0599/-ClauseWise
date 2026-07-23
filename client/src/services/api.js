import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

/**
 * Uploads a PDF contract to the backend for AI extraction and analysis.
 */
export const uploadContractPdf = async (file) => {
  const formData = new FormData();
  formData.append('document', file);

  try {
    const response = await api.post('/contracts/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('An unexpected error occurred during the file upload.');
  }
};

/**
 * Asks a follow-up question regarding the uploaded contract.
 */
export const askContractQuestion = async (contractText, contractAnalysis, history, question, signal) => {
  try {
    const response = await api.post('/contracts/ask', {
      contractText,
      contractAnalysis,
      history,
      question
    }, {
      signal // Allows the frontend to abort the request
    });
    return response.data.answer;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Generation stopped by user.');
    }
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to get an answer from the AI.');
  }
};
