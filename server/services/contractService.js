import pdfParse from 'pdf-parse';
import logger from '../utils/logger.js';

/**
 * Contract File Handling Service.
 * Extracts raw textual data from a PDF buffer in memory.
 * 
 * @param {Buffer} fileBuffer - The memory buffer of the uploaded PDF file.
 * @returns {Promise<string>} The extracted text from the PDF.
 * @throws {Error} Throws if PDF parsing fails or no text is found.
 */
export const extractTextFromPdf = async (fileBuffer) => {
  try {
    // pdf-parse extracts the raw text directly from the buffer
    const data = await pdfParse(fileBuffer);
    
    // If the PDF is completely scanned (images only), text will be empty
    if (!data.text || data.text.trim() === '') {
      throw new Error('The uploaded PDF appears to be empty or consists only of images. ClauseWise currently only supports text-based PDFs.');
    }
    
    return data.text;
  } catch (error) {
    logger.error('Error extracting text from PDF:', error);
    throw new Error(error.message || 'Failed to parse PDF document.');
  }
};
