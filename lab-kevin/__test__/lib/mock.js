'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');
const debug = require('debug')('http:mock');

const mock = module.exports = {};

mock.user = {
  username: `${faker.name.prefix()}${faker.hacker.adjective()}`.replace(/[.\s]/, ''),
  email: `${faker.internet.email()}`,
  password:`${faker.hacker.adjective()}${faker.hacker.noun()}`.replace(/[.\s]/, ''),
};

mock.mock_data = {};

mock.createUser = () => {
  let userCreds = mock.user;
  debug('mockuseer', mock.user);
  let pswd = userCreds.password;
  let newUser = new Auth({username:userCreds.username, email:userCreds.email});
  return newUser.createHashedpassword(pswd)
    .then(() => newUser.save())
    .then(() => {
      mock.mock_data.user = newUser;
      mock.mock_data.user_token = newUser.createToken();
      return mock.mock_data;
    })
    .catch(console.err);
};

mock.removeUsers = () => Promise.all([Auth.remove()]); 

mock.newGallery = () => {
  let newGallery = {};
  newGallery.title = `${faker.hacker.adjective()} ${faker.random.locale()}`;
  newGallery.description = `${faker.company.catchPhraseDescriptor()}`;
  newGallery.user_data = mock.createUser();
  return newGallery;
};
