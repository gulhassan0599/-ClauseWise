import logger from './logger.js';

/**
 * Safely parses and validates the JSON string from the AI.
 * Returns an object: { success: boolean, data: Object, error: string }
 * This safe return pattern ensures we never throw unhandled exceptions that could crash Express.
 */
export const validateAndParseJson = (jsonString, requiredFields = ['isContract', 'summary']) => {
  try {
    // 1. Clean the string in case the AI wrapped the JSON in markdown code blocks
    const cleanJsonString = jsonString.replace(/```json/gi, '').replace(/```/g, '').trim();

    // 2. Safely parse JSON
    const parsedData = JSON.parse(cleanJsonString);

    // 3. Validate required fields conditionally based on isContract
    if (parsedData.isContract === false) {
      // It's a rejection, so we don't expect a summary or other analysis fields
      const rejectionFields = ['isContract', 'reason', 'message'];
      const missingFields = rejectionFields.filter(field => !(field in parsedData));
      if (missingFields.length > 0) {
        return { success: false, data: null, error: `Missing rejection fields: ${missingFields.join(', ')}` };
      }
    } else {
      // It is a contract, so validate the standard required fields
      if (requiredFields && requiredFields.length > 0) {
        const missingFields = requiredFields.filter(field => !(field in parsedData));
        
        if (missingFields.length > 0) {
          const errorMsg = `Missing required fields from AI response: ${missingFields.join(', ')}`;
          logger.warn(`JSON Validation Error: ${errorMsg}`);
          return { success: false, data: null, error: errorMsg };
        }
      }
    }

    // 4. Return the valid data safely
    return { success: true, data: parsedData, error: null };

  } catch (error) {
    logger.error('Failed to parse AI JSON response:', error.message);
    return { 
      success: false, 
      data: null, 
      error: 'The AI provided an invalid format that could not be parsed as JSON.' 
    };
  }
};
