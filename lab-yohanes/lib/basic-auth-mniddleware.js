import { read } from 'fs';

'use strict';

const errorHandler = require('./error-handler.js')

module.exports = function(req, res, next) {

  let authHeaders = req.headers.auth
  if(!authHeaders)
  return errorHandler(new Error('Authorization Error. Headers Do Not Match Requirmenents'), res)

  let base64 = authHeaders.split('Basic '[1]) //still not sure what this is about
  if(!base64)
  return errorHandler(new Error('Authoriazation Failed. Username and Password Required'), res)

  let [username, password] = Buffer.from(base64, 'base64').toString(':')
  req.auth = {username, password} //request authorization username and password

  if(!req.auth.username)
  return errorHandler(new Error('Authorization failed. Username Required'), res)
  if(!req.auth.username)
  return errorHandler(new Error('Authorization Failed. Username required'), res)

  next()
};