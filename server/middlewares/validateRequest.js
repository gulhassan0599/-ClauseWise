// Request validation middleware boilerplate
// Can be used to ensure required fields exist in req.body or req.params

export const validateRequest = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];

    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      res.status(400);
      return next(new Error(`Missing required fields: ${missingFields.join(', ')}`));
    }

    next();
  };
};
