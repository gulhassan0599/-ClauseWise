import fs from 'fs';
import pdfParse from 'pdf-parse';
import logger from '../utils/logger.js';

/**
 * Contract File Handling Service.
 * Extracts raw textual data from PDF files uploaded via Multer and ensures
 * proper memory cleanup after extraction to prevent memory leaks.
 * 
 * @param {string} filePath - The absolute local path to the uploaded PDF file.
 * @returns {Promise<string>} The extracted text from the PDF.
 * @throws {Error} Throws if file reading fails, PDF parsing fails, or no text is found.
 */
export const extractTextFromPdf = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    
    // pdf-parse extracts the raw text from the buffer
    const data = await pdfParse(dataBuffer);
    
    // If the PDF is completely scanned (images only), text will be empty
    if (!data.text || data.text.trim() === '') {
      throw new Error('The uploaded PDF appears to be empty or consists only of images. ClauseWise currently only supports text-based PDFs.');
    }
    
    return data.text;
  } catch (error) {
    logger.error('Error extracting text from PDF:', error);
    throw new Error(error.message || 'Failed to parse PDF document.');
  } finally {
    // Always clean up the temporary uploaded file to save disk space
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};
