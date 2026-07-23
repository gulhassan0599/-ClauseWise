// Simple custom logger utility for uniform console output
// In a larger app, this could wrap Winston or Pino

const logger = {
  info: (message) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  },
  warn: (message) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  },
  error: (message, error = null) => {
    if (error) {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
    } else {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }
  },
  debug: (message) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
  }
};

export default logger;
