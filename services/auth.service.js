const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require("../repositories/user.repository")

//register 
const registerUser = async ({ name, email, password, role = 'user' }) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, hashedPassword, role]
  );

  const user = result.rows[0];
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: '7d' }
  );

  return { ...user, token };
};

const loginUser = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: '7d' }
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token
  };
};
//login
//logout

module.exports = {
    registerUser,
    loginUser
}
