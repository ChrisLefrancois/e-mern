const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = adminMiddleware;
