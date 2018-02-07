'use strict';

const Auth = require('../../model/auth');
const faker = require('faker');
const Library = require('../../model/library');
const mock = module.exports = {};

mock.Auth = {};
mock.Auth.createOne = () => {
  let result = {};
  result.password = faker.internet.password();
  return new Auth({
    username: faker.internet.userName(),
    email: faker.internet.email(),
  })
    .generatePasswordHash(result.password)
    .then(user => result.user = user)
    .then(user => user.generateToken())
    .then(token => result.token = token)
    .then(() => {
      return result;
    });
};

mock.Library = {};
mock.Library.createOne = () => {
  let resultMock = null;
  return mock.Auth.createOne()
    .then(createdUserMock => resultMock = createdUserMock)
    .then(createdUserMock => {
      return new Library({
        name: faker.internet.domainWord(),
        description: faker.random.words(15),
        userId: createdUserMock.user._id,
      }).save(); // vinicio - something is being saved into Mongo
    })
    .then(library => {
      resultMock.gallery = library;
      console.log(resultMock);
      return resultMock;
    });
};

mock.Auth.removeAll = () => Promise.all([Auth.remove()]);