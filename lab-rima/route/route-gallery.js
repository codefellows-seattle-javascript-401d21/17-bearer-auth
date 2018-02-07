'use strict';

const Gallery = require('../model/gallery');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');


module.exports = router => {

  router.route('/gallery/:id?')
    .post(bearerAuthMiddleware, bodyParser, (req, res) => {
      req.body.userId = req.user._id;

      return new Gallery(req.body).save()
        .then(createdGallery => res.status(201).json(createdGallery))
        .catch(err => errorHandler(err, res));
    })

    .get(bearerAuthMiddleware, (req, res) => {
      if(req.params._id){
        return Gallery.findById(req.params._id)
          .then(gallery => res.status(200).json(gallery))
          .catch(err => errorHandler(err, res));
      }
      return Gallery.find()
        .then(galleries => {
          let galleriesIds = galleries.map(gallery => gallery._id);

          res.status(200).json(galleriesIds);
        })
        .catch(err => errorHandler(err, res));
    })

    .put(bearerAuthMiddleware, bodyParser, (req, res) => {
      req.body.userId = req.user._id;

      return Gallery.findByIdAndUpdate(req.params._id, req.body)
        .then(updatedGallery => res.status(204).json(updatedGallery))
        .catch(err => errorHandler(err, res));
    })

    .delete(bearerAuthMiddleware, (req, res) => {
      if(req.params._id){
        return Gallery.findById(req.params._id)
          .then(gallery => gallery.remove())
          .then(() => res.status(204).end())
          .catch(err => errorHandler(err, res));
      }
      return Gallery.remove({})
        .then(() => res.status(200).end())
        .catch(err => errorHandler(err, res));
    });
};
