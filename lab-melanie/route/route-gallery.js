'use strict';

const Gallery = require('../model/gallery.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler.js');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware.js');

// const ERROR_MESSAGE = 'Authorization Failed';

module.exports = router => {
  router.route('/gallery/:id?')
    .post(bodyParser, (request, response) => {
      // do I have a user in my request?
      // add error checking - optional
      request.body.userId = request.user._id;
      return new Gallery(request.body).save()
        .then(createdGallery => response.status(201).json(createdGallery))
        .catch(error => errorHandler(error, response));
    })

    .get(bearerAuthMiddleware, (request, response) => {
      // returns one gallery
      if(request.params._id) {
        return Gallery.findById(request.params._id)
          .then(gallery => resonse.status(200).json(gallery))
          .catch(error => errorHandler(error, response))
      }
      // returns all galleries
      return Gallery.find()
        .then(gallieries => {
          let galleriesId = galleries.map(gallery => gallery._id);
          response.status(200).json(galleriesId);
        })
        .catch(error => errorHandler(error, response));
    });
    
    // TODO: PUT and DELETE
}