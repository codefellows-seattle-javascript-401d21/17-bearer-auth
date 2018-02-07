'use strict';

const faker = require('faker');
const Auth = require('../../model/auth.js');
const Gallery = require('../../model/gallery.js');


const mock = module.exports = {};

// Auth Mocks - One, RemoveAll
mock.auth = {};

mock.auth.createOne = () => {
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

mock.auth.removeAll = () => Promise.all([Auth.remove()]);

mock.gallery = {};
mock.gallery.createOne = () => {
  let resultMock = null;

  return mock.auth.createOne()
    .then(createdUserMock => resultMock = createdUserMock)
    .then(createdUserMock => {
      return new Gallery({
        name: faker.internet.domainWord(),
        description: faker.random.words(15),
        userId: createdUserMock.user._id,
      }).save(); // vinicio - something is being saved into Mongo
    })
    .then(gallery => {
      resultMock.gallery = gallery;
      return resultMock;
    });
};
// mock.gallery = {};

// mock.gallery.createOne = () => {
//   let result = {};

//   return mock.auth.createOne()
//     .then(createdUser => result = createdUser)
//     .then(createdUser => {
//       return new Gallery({
//         name: faker.internet.domainName(),
//         description: faker.random.words(15),
//         userId: createdUser.auth._id,
//       }).save(); // something is being saved in Mongo
//     })
//     .then(gallery => result.gallery = gallery);
// };

mock.gallery.removeAll = () => Promise.all([Gallery.remove()]);
