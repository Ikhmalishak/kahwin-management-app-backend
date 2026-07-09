const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Successfully logged out'
  });
};

module.exports = {
  register,
  login,
  logout
};
