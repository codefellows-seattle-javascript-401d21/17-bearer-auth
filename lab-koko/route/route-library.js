'use strict';

const Library = require('../../model/library');
const bodyParser = require('body-parser').json();
const errorHandler = require('../../lib/error-handler');
const bearerAuthMiddleware = require('../../lib/bearer-auth-middleware');

const ERROR_MESSAGE = 'Authorization Failed';


module.exports = router => {
  
  router.route('/gallery/:id?')
    .post(bearerAuthMiddleware,bodyParser,(req,res) => {
      req.body.userId = req.user._id;
      console.log(req.user);
      return new Library(req.body).save()
        .then(createdLibrary => res.status(201).json(createdLibrary))
        .catch(err => errorHandler(err,res));
    })

    .get(bearerAuthMiddleware,(req,res) => {
      if(req.params._id){
        return Library.findById(req.params._id)
          .then(library => res.status(200).json(library))
          .catch(err => errorHandler(err,res));
      }
      return Library.find()
        .then(libraries => {
          let librariesIds = libraries.map(library => library._id);
          res.status(200).json(librariesIds);
        })
        .catch(err => errorHandler(err,res));
    })
    
    .put(bearerAuthMiddleware,bodyParser,(req,res) => {
      Library.findById(req.params._id,req.body)
        .then(library => {
          if(library.userId.toString() === req.user._id.toString()){
            library.name = req.body.name || library.name;
            library.description = req.body.description || library.description;
            return library.save();
          }
          return errorHandler(new Error(ERROR_MESSAGE),res);
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err,res));
    })

    .delete(bearerAuthMiddleware,(req,res) => {
      return Library.findById(req.params._id)
        .then(library => {
          if(library.userId.toString() === req.user._id.toString())
            return library.remove();
          
          return errorHandler(new Error(ERROR_MESSAGE),res);
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err,res));
    });
};