import express from 'express';
import { getHealthStatus } from '../controllers/healthController.js';
import contractRoutes from './contractRoutes.js';
import { analyzeText } from '../controllers/contractController.js';

const router = express.Router();

// Health endpoint
router.get('/health', getHealthStatus);

// Analyze raw text endpoint
router.post('/analyze-text', analyzeText);

// API routes for file uploads and other actions
router.use('/contracts', contractRoutes);

export default router;
