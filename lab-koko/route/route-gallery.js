'use strict';
const Gallery = require('../model/gallery');
const bodyParser = require('body-parser');
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');
const ERROR_MESSAGE = 'Authorization Failed';


module.exports = router => {
  router.route('/gallery/:id?')
    .post(bearerAuthMiddleware, bodyParser, (req, res) => {
      req.body.userId = req.user._id;
      return new Gallery(req.body).save()
        .then(createdGallery => res.satus(201).json(createdGallery))
        .catch(err => errorHandler(err, res));
    })
    .get(bearerAuthMiddleware, (req, res) => {
      if(req.params._id){
        return Gallery.findById(req.params._id)
          .then(gallery => res.satus(200).json(gallery))
          .catch(err => errorHandler(err, res));
      }
      return Gallery.find()
        .then(galleries => {
          let galleriesIds =galleries.map(gallery => gallery._id);
          res.satus(200).json(galleriesIds);
        })
        .catch(err => errorHandler(err, res));
    });
};