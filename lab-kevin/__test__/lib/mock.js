'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');
const Gallery = require('../../model/gallery');
const debug = require('debug')('http:mock');

debug('mocks');

const mock = module.exports = {};

mock.auth = {};
mock.gallery = {};

mock.new_user = () => {
  return {
    username: `${faker.name.prefix()}${faker.hacker.adjective()}`.replace(/[.\s]/, ''),
    email: `${faker.internet.email()}`,
    password:`${faker.hacker.adjective()}${faker.hacker.noun()}`.replace(/[.\s]/, ''),
  };
};

mock.auth.createUser = () => {
  let auth_data = {};
  mock.user = mock.new_user();
  debug('mock.user', mock.user);
  auth_data.password = mock.user.password;
  let newUser = Auth({username: mock.user.username, email: mock.user.email});
  return newUser.createHashedpassword(auth_data.password)
    .then(() => newUser.save())
    .then(() => newUser.createToken())
    .then(token =>{
      auth_data.user = newUser;
      auth_data.user_token = token;
      return auth_data;
    })
    .catch(err => err);
};

mock.removeUsers = () => Promise.all([Auth.remove()]); 
mock.removeGalleries = () => Promise.all([Gallery.remove()]);

mock.gallery.new_gallery_data = () => {
  let newGallery_data = {};
  newGallery_data.title = `${faker.hacker.adjective()} ${faker.random.locale()}`;
  newGallery_data.description = `${faker.company.catchPhraseDescriptor()}`;
  return mock.auth.createUser()
    .then(user_data => {
      newGallery_data.user_data = user_data;
      return newGallery_data;
    });
};  

mock.gallery.create_gallery = () => {
  let new_gallery = {};
  return mock.gallery.new_gallery_data()
    .then(gallery_data => {
      new_gallery.user_data = gallery_data.user_data;
      let gallery_obj = {title: gallery_data.title, description: gallery_data.description, user_id: gallery_data.user_data.user._id};
      return gallery_obj;
    })
    .then(gallery_obj => new Gallery(gallery_obj).save())
    .then(gallery => {
      new_gallery.gallery = gallery;
      return new_gallery;
    })
    .catch(console.error);
};

mock.gallery.find_gallery = (id) => {
  return Gallery.findOne(id);
};

mock.gallery.delete_one_gallery = (id) => {
  return Gallery.findOne(id)
    .then(gallery => {
      if (gallery) gallery.remove();
    })
    .catch(err => err);
};
