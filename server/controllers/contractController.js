import { analyzeContractDocument } from '../services/analysisService.js';
import { handleUserChat } from '../services/chatService.js';
import { extractTextFromPdf } from '../services/contractService.js';

/**
 * Processes PDF contract uploads.
 * Handles missing file errors, initiates text extraction, triggers AI analysis,
 * and responds with structured data for the frontend.
 * 
 * @param {import('express').Request} req - Express request object (contains Multer req.file).
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 */
export const uploadContract = async (req, res, next) => {
  try {
    // 1. Handle missing file error (e.g., user clicked upload without selecting a file)
    if (!req.file) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'No file uploaded. Please select a valid PDF document.' 
      });
    }

    const filePath = req.file.path;

    // 2. Extract text from the PDF using pdf-parse
    const extractedText = await extractTextFromPdf(filePath);

    // 3. Send extracted text to Groq for analysis
    const analysisResult = await analyzeContractDocument(extractedText);

    // 4. Return structured JSON
    // We return both the analysis and the raw text so the frontend can hold it for the chat context
    res.status(200).json({
      status: 'success',
      data: {
        analysis: analysisResult,
        extractedText: extractedText
      }
    });

  } catch (error) {
    // Pass errors down to the global error handler
    next(error);
  }
};

// Endpoint to analyze raw text directly
export const analyzeText = async (req, res, next) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ status: 'error', message: 'Text field is required in the request body.' });
    }

    const analysisResult = await analyzeContractDocument(text);
    res.status(200).json(analysisResult);
  } catch (error) {
    next(error);
  }
};

// Endpoint for follow-up questions
export const askQuestion = async (req, res, next) => {
  try {
    const { contractText, contractAnalysis, history, question } = req.body;
    const answer = await handleUserChat(contractText, contractAnalysis, history, question);
    res.status(200).json({ answer });
  } catch (error) {
    next(error);
  }
};
