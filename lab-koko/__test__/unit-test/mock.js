'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');
const Gallery = require('../../model/gallery');
const mocks = module.exports = {};


mocks.Auth = {};
mocks.Auth.createOne = () => {
  let results = {};
  results.password = faker.internet.userName();
  return new Auth({
    username: faker.internet.userName(),
    email: faker.internet.email(),
  })
    .then(user => results.user = user)
    .then(user => user.generateToken())
    .then(token => results.token = token)
    .then(() => {
      return results;
    });
};
mocks.Gallery = {};
mocks.Gallery.createOne = () => {
  let resultsMock = {};
  return mocks.user.createOne()
    .then(createdUserMock => resultsMock = createdUserMock)
    .then(createdUserMock => {
      return new Gallery ({
        name: faker.internet.domainWorld(),
        description: faker.random.words(15),
        userID: createdUserMock.user._id,
      }).save();
    })
    .then(gallery => resultsMock.gallery = gallery);

};
mocks.Auth.removeAll = () => Promise.all([Auth.remove()]);