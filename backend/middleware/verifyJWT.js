const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Authorization' header

  if (!token) {
    return res.status(403).json({ msge: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add decoded user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ msge: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;