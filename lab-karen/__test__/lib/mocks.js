'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');
const Gallery = require('../../model/gallery');

const mocks = module.exports = {};
//set up object to hold mock auth data
mocks.auth = {};

mocks.auth.createOne = () => { //create one mock user
  let result = {}; //locally scoped object to build reponse on
  result.password = faker.internet.password();

  return new Auth({
    username: faker.internet.userName(),
    email: faker.internet.email(),
  })
    .generatePasswordHas(result.password) //call function to hash password
    .then(user => result.user = user)
    .then(user => user.generateToken())//call function to generate token
    .then(token => result.token = token)
    .then(() => {
      return result;
    });

};

mocks.gallery = {};
mocks.gallery.createOne = () => {
  let resultMock = null;

  return mocks.auth.createOne()
    .then(createdUserMock => resultMock = createdUserMock)
    .then(createdUserMock => {
      return new Gallery({
        name: faker.internet.domainWord(),
        description: faker.random.words(15),
        userId: createdUserMock.user._id,
      }).save();
    })
    .then(gallery => {
      resultMock.gallery = gallery;
      return resultMock;
    });
};
mocks.auth.removeAll = () => Promise.all([Auth.remove()]);
