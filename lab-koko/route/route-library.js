'use strict';

const Library = require('../model/library');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');
const ERROR_MESSAGE = 'Authorization Failed';

module.exports = router => {
  router.route('/library/:id?')
    .post(bearerAuthMiddleware,bodyParser,(req,res) => {
      req.body.userId = req.user._id;
      return new Library(req.body).save()
        .then(newLibrary => res.status(201).json(newLibrary))
        .catch(err => errorHandler(err,res));
    })
    .get(bearerAuthMiddleware,(req,res) => {
      if(req.params.id){
        return Library.findById(req.params.id)
          .then(library => res.status(200).json(library))
          .catch(err => errorHandler(err,res));
      }
      return Library.find()
        .then(libraries => {
          let librariesIds = libraries.map(library => library.id);
          res.status(200).json(librariesIds);
        })
        .catch(err => errorHandler(err,res));
    })
    .put(bearerAuthMiddleware, bodyParser, (req,res) => {
      Library.findById(req.params.id,req.body)
        .then(library => {
          if(library.userId === req.user._id) {
            library.name = req.body.name || library.name;
            library.description = req.body.description || library.description;
            return library.save();
          }
          if (req.body.name === undefined || req.body.description === undefined ) {
            throw new Error('validation');
          }
          return new Error('validation');
        })
        .then(() => res.sendStatus(204))
        .catch(error => errorHandler(error,res));
    })

    .delete(bearerAuthMiddleware,(req,res) => {
      return Library.findById(req.params.id)
        .then(library => {
          if(library.userId.toString() === req.user.id.toString())
            return library.remove();
          return errorHandler(new Error(ERROR_MESSAGE),res);
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err,res));
    });
};