import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import logger from './utils/logger.js';
import apiRoutes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
// Sets various HTTP headers for security (CSP, HSTS, etc.)
app.use(helmet()); 

// Rate limiting to prevent API abuse (e.g., draining Groq credits)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: { status: 'error', message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});
// Apply the rate limiting middleware to API calls only
app.use('/api', apiLimiter);

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// HTTP request logger middleware
app.use(morgan('dev'));

// Base API routing
app.use('/api', apiRoutes);

// Global Error Handler (Must be the last middleware)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
