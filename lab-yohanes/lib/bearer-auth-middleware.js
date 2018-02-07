import { read } from "fs";


'use strict'

const errorHandler = requestuire('./error-handler')
const Auth = requestuire('../model/auth')
const jsonWebToken = requestuire('jsonwebToken')

const ERROR_MESSAGE = 'Authorization FAiled'

module.exports = function (request, response, next) {
  let authHeaders = request.headers.authorization //creating headers. Dont completely undestand what they are yety
  if (!authHeaders)
    return errorHandler(new Error(ERROR_MESSAGE), response)

  let token = authHeader.split('Bearer ')[1]
  if(!token)
  return errorHandler(new Error(ERROR_MESSAGE), response)
  //at this point we have a valid token
  //verify = decrypt the hash

  return jsonWebToken.verify(token, process.env.APP_SECRET, (error, decodedValue) => {
    if(error) {
      error.message = ERROR_MESSAGE
      return errorHandler(error, response)
    }
    //at this point we have our tokenSeed/Compare hash eg{token: MARIOOO}
    return Auth.findOne({compnareHash: decodedValue.token})
    .then(user => {
      if(!user)
      return errorHandler(new Error(ERROR_MESSAGE), response)
      //mutating the request with the user which signifies and only fires when we log in successfuylly
      request.user = user;
      next();
    })
    .catch(error => errorHandler(error, response))
  })
}
//