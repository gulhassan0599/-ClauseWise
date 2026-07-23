import express from 'express';
import { uploadContract, askQuestion } from '../controllers/contractController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Define routes
// Uses multer upload middleware to handle single PDF file named 'document'
router.post('/upload', upload.single('document'), uploadContract);

// Endpoint for follow-up questions
router.post('/ask', askQuestion);

export default router;
