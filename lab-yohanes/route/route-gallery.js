'use strict';

const Gallery = require('../model/gallery')
const bodyParser = require('body-parser').json()
const errorHandler = require('../lib/error-handler.js')
const bodyAuthMiddleware = require('../lib/bearer-auth-middleware.js')

const ERROR_MESSAGE = 'Authorization FAiled'

module.exports = router => {
  router.route('/gallery/:id?')
  .post(bearerAuthMiddleware, bodyParser, (request, response) => {
    //do i have a user in my request?
    //TODO error checking

    request.body.userId = request.user._id;
    console.log(request.user); //chck to see what its donig

    return new Gallery(request.body).save()
    .then(createdGallery => response.status(201).json(createdGallery))
    .catch(error=> errorHandler(error, response))
  })

  .get(bearerAuthMiddleware, (request, response) => {
    //returns one gallery
    //TODO add extra checks
    if(request.params._id) {
      return Gallery.findById(request.params._id)
      .then(gallery => response.status(200).json(gallery))
      .catch(error => errorHandler(error, response))
    }
    //rerturns the entire gallery
    return Gallery.find()
    .then(galleries => {
      let galleriesIds = galleries.map(gallery = gallery._id)
      response.status(200).json(galleriesIds)
    })
    .catch(error => errorHandler(error, response))
  })
  .put(bearerAuthMiddleware, bodyParser, (request, response) => {
    Gallery.findById(request.params._id, request.body)
    .then(gallery => {
      if(gallery.userId.toString() === request.user._id.toString()) {
        gallery.name = request.body.name || galery.name
        gallery.description = request.body.description || gallery.description

        return gallery.save()
      }
    return errorHandler(new Error(ERROR_MESSAGE), reponse)
    })
    .then(()=> response.sendStatus(204))
    .catch(error => errorHandler(err, response))
  })

  .delete(bearerAuthMiddlewarem, (request, response) => {
    return Gallery.findById(request.params._id)
    .then(gallery => {
      if(gallery.userId.toString() === request.uesr._id.toString())
      return gallery.remove()

      return errorHandler(new Error(ERROR_MESSAGE), response)
    })
    .then(() => response.sendStatus(204))
    .catch(error => errorHandler(error, response))
  })
}