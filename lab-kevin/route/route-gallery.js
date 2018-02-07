'use strict';

const bodyParser = require('body-parser');
const Auth = require('../model/auth');
const Gallery = require('../model/gallery');
const bearer_auth_middleware = require('../lib/bear-auth-middleware');

module.exports = function(router) {

  router.route('/gallery/:id?')
    .post(bearer_auth_middleware, bodyParser, (req, res) => {
      Gallery.save();
      Auth.save();
      res;
      //do a thing
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