const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const { recurringSchema } = require('./recurring.js');
const { oneTimeSchema } = require('./oneTime.js');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [{ isAsync: false, validator: isEmail, msg: 'Invalid Email Address' }],
    required: 'Please supply an email address',
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
  password: {
    type: String,
    required: 'Please supply a password',
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  budget: Number,
  googleId: String,
  googleToken: String,
  recurring: [{ type: mongoose.Schema.ObjectId, ref: recurringSchema }],
  oneTime: [{ type: mongoose.Schema.ObjectId, ref: oneTimeSchema }],
  imageUrl: String,
});

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    }
    return callback(null, isMatch);
  });
};

// The second argument of pre can't be arrow function or else this will not be the user
userSchema.pre('save', function (next) {
  return bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      return next(error);
    }
    this.password = hash;
    return next();
  });
});

module.exports.User = mongoose.model('User', userSchema);
