'use strict';

const faker = require('faker');
const Auth = require('../../model/auth.js');
const Gallery = require('../model/gallery.js');


const mock = module.exports = {};

// Auth Mocks - One, RemoveAll
mock.auth = {};

mock.auth.createOne = () => {
  let result = {};
  result.password = faker.internet.password();

  let auth = new Auth({
    username: faker.internet.userName(),
    email: faker.internet.email(),
  });

  return auth.generatePasswordHash(result.password)
    .then(auth => {
      result.auth = auth;
      return auth.save();
    })
    .then(auth => auth.generateToken())
    .then(token => {
      result.token = token;
      return result;
    });
};

mock.auth.removeAll = () => Promise.all([Auth.remove()]);

mock.gallery = {};

mock.gallery.createOne = () => {
  let result = {};

  return mock.auth.createOne()
    .then(createdUser => result = createdUser)
    .then(createdUser => {
      return new Gallery({
        name: faker.internet.domainName(),
        description: faker.random.words(15),
        userId: createdUser.auth._id,
      }).save(); // something is being saved in Mongo
    })
    .then(gallery => result.gallery = gallery);
};

mock.gallery.removeAll = () => Promise.all([Gallery.remove()]);
