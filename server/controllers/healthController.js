// Health check controller

export const getHealthStatus = (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'ClauseWise API is healthy and running',
    timestamp: new Date().toISOString()
  });
};
