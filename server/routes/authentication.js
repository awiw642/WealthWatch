const {
  localAuth, jwtAuth, googleAuth, googleAuthCallback,
} = require('../authentication/authentication');

const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../../database/models/user.js');
const { _secret } = require('../../config');

// Helper functions
const generateToken = user => jwt.sign(user, _secret, { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 });

/* ******************************************************* */

// Test route: The purpose of this route is only to test JWT authentication
router.get('/', jwtAuth(), (req, res) => {
  res.json('Authentication Route');
});
/* ******************************************************* */

router.post('/login', localAuth(), (req, res) => {
  const { _id, email, name } = req.user;
  const user = { _id, email, name };
  const token = generateToken(user);
  res.json({ message: 'Login successful', token });
});

router.post('/signup', (req, res) => {
  const { email, name, password } = req.body;
  const jwtData = { email, name };
  const newUser = new User({ email, name, password });
  console.log('Email: ', email);
  console.log(User);

  User.findOne({ email })
    .then((user) => {
      console.log('Then 1');
      if (user) {
        res.status(409).json({ message: 'Email taken' });
      }
      return newUser.save();
    })
    .then(() => {
      const token = generateToken(jwtData);
      res.status(201).json({ message: 'Registration Successful', token });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

router.get('/google', googleAuth());

router.get('/google/callback', googleAuthCallback(), function (req, res) {
  res.redirect('/');
});

module.exports.auth = router;
