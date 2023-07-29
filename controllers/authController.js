// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (existingUser) => {
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        User.createUser(username, hash, (userId) => {
          res.status(201).json({ message: 'User registered', userId });
        });
      });
    }
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (user) => {
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;

        if (result) {
          const token = jwt.sign({ userId: user.id }, 'ryhabarafet', { expiresIn: '1h' });

          res.cookie('token', token, { httpOnly: true });

          res.status(200).json({ message: 'Login successful', token });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      });
    }
  });
};

exports.disconnect = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};
