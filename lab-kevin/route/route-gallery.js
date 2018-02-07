'use strict';

const bodyParser = require('body-parser').json;
const Auth = require('../model/auth');
const Gallery = require('../model/gallery');
const bearer_auth_middleware = require('../lib/bear-auth-middleware');
const errorHandler = require('../lib/error-handler');

const ERROR_MESSAGE = 'Authorization Failed';

module.exports = function(router) {

  router.route('/gallery')
    .post(bearer_auth_middleware, bodyParser, (req, res) => {
      if (!req.user)  return new Error(ERROR_MESSAGE);
      if (!req.body) return new Error('Error: Bad request');
      Gallery.save(req.body)
        .then(gallery => res.status(201).json(gallery));
    })
    .get((req, res) => {
      res;
      //do a thing
    })
    .put((req, res) => {
      res;
      //do a thing
    })
    .delete((req, res) => {
      res;
      //do a thing
    });


};