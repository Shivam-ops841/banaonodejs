const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Model');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = await User.create({ email, password: hashedPassword });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '12h' });

        res.status(200).json({ message: 'User registered successfully.', token });
    } catch (error) {
        res.status(500).json({ error: 'Unable to register user.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email:email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(user.password,password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '12h' });

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ error: 'Unable to log in.' });
    }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }

      // Implement your logic to send a password recovery email or message here
      // For demonstration purposes, let's just return a success message
      return res.status(200).json({ message: 'Password recovery initiated. Check your email for further instructions.' });
  } catch (error) {
      res.status(500).json({ error: 'Unable to initiate password recovery.' });
  }
};

