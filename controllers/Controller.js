const User = require('../models/Model');
const bcrypt=require('bcrypt');

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(200).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    // Logic to handle password recovery (send email, reset password, etc.)
    res.status(200).json({ message: 'Password recovery initiated' });
  } catch (error) {
    res.status(404).json({ message: 'User not found', error: error.message });
  }
};
