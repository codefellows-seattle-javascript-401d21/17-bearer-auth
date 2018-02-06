'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const debug = require('debug')('http:Auth');

const ERROR_MESSAGE = 'Authorization Error: authorization failed';

debug('Auth');

const Auth = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  compHash: {type: String, unique: true},
},
{timestamps: true}
);

Auth.methods.createHashedpassword = function(password){
  if(!password) return Promise.reject(new Error(ERROR_MESSAGE));
  debug('password arg:', password);
  return bcrypt.hash(password, 10)
    .then(hash => this.password = hash)
    .catch(err => err);
};

Auth.methods.comparePasswords = function(password) {
  debug('password', password);
  return bcrypt.compare(password, this.password)
    .then(valid => {
      debug('valid before:', valid);
      if(!valid) return new Error(ERROR_MESSAGE);
      debug('valid after:', valid);
      return this;
    })
    .catch(err => err);
};

Auth.methods.createCompHash = function() {
  debug('create compHash');
  this.compHash = crypto.randomBytes(64).toString('hex');
  debug('this.compHash', this.compHash);
  return this.save()
    .then(() => this.compHash)
    .catch(() => this.createCompHash());
};

Auth.methods.createToken = function() {
  debug('SECRET:', process.env.APP_SECRET);
  return this.createCompHash()
    .then(cmpHsh => jwt.sign({jwt: cmpHsh}, process.env.APP_SECRET))
    .catch(err => err);
};


module.exports = mongoose.model('auth', Auth);