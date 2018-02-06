'use strict';

const errorHandler = require('./error-handler.js');
const Auth = require('../model/auth.js');
const jsonWebToken = require('jsonwebtoken');

const ERROR_MESSAGE = 'Authorization Failed';

module.exports = function(request, response, next) {
  let authHeader = request.headers.authorization;
  if(!authHeader) return errorHandler(new Error(ERROR_MESSAGE), response);

  let token = authHeader.split('bearer ')[1];
  if(!token) return errorHandler(new Error(ERROR_MESSAGE), response);

  // at this point we have a TOKEN
  // verify === decrypt
  jsonWebToken.verify(token, process.env.APP_SECRET, (error, decodedValue) => {
    if(error) {
      error.message = ERROR_MESSAGE;
      return errorHandler(error, response);
    }
    // at this point we have the decoded/decrypted value (toeknSeed/compareHash)

    Auth.findOne({compareHash: decodedValue.token})
      .then(user => {
        if(!user) return errorHandler(new Error(ERROR_MESSAGE), response);
        // we are mutating the request with a user, if user, logged in, if no user, not logged in
        request.user = user;
        next();
      })
      .catch(error => errorHandler(error, response))
  })
}