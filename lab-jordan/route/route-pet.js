'use strict';

const Pet = require('../model/pet');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

const ERROR_MESSAGE = 'Authorization Failed';


module.exports = router => {

  router.route('/pet/:id?')
    .post(bearerAuthMiddleware,bodyParser,(request,response) => {
      // vinicio - do I have a user in my request?
      // vinicio - TODO: Add error checking

      request.body.userID = request.user._id;
      console.log(request.user);

      return new Pet(request.body).save()
        .then(createdPet => response.status(201).json(createdPet))
        .catch(error => errorHandler(error,response));
    })

    .get(bearerAuthMiddleware,(request,response) => {
      // vinicio - returns one pet
      // vinicio - TODO: add extra checks
      if(request.params._id){
        return Pet.findById(request.params._id)
          .then(pet => response.status(200).json(pet))
          .catch(error => errorHandler(error,response));
      }

      // vinicio - returns all the galleries
      return Pet.find()
        .then(galleries => {
          let galleriesIds = galleries.map(pet => pet._id);

          response.status(200).json(galleriesIds);
        })
        .catch(error => errorHandler(error,response));
    })
    .put(bearerAuthMiddleware,bodyParser,(request,response) => {
      Pet.findById(request.params._id,request.body)
        .then(pet => {
          if(pet.userID.toString() === request.user._id.toString()){
            pet.name = request.body.name || pet.name;
            pet.description = request.body.description || pet.description;

            return pet.save();
          }

          return errorHandler(new Error(ERROR_MESSAGE),response);
        })
        .then(() => response.sendStatus(204))
        .catch(error => errorHandler(error,response));
    })

    .delete(bearerAuthMiddleware,(request,response) => {
      return Pet.findById(request.params._id)
        .then(pet => {
          if(pet.userID.toString() === request.user._id.toString())
            return pet.remove();

          return errorHandler(new Error(ERROR_MESSAGE),response);
        })
        .then(() => response.sendStatus(204))
        .catch(error => errorHandler(error,response));
    });
};
