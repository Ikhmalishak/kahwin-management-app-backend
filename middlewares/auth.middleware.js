const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Authentication required');

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (!user.rows[0]) throw new Error('User not found');
    req.user = user.rows[0];
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access'
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };