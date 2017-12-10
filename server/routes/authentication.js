const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../../database/models/user');
const { _secret } = require('../../config');

// Helper functions
const generateToken = user => {
  return jwt.sign(user, _secret, { expiresIn: 10080 });
};

router.post('/login', (req, res) => {
  console.log(req.body);
  res.json('LOGIN');
});

router.post('/signup', (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (user) {
        res.status(409).json({ message: 'Email taken' });
      } else {
        User.create(/*Add user here*/).then(user => {
          const token = generateToken(user);
          res.status(201).json({ message: 'Registration succcessful', token });
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

module.exports.auth = router;
