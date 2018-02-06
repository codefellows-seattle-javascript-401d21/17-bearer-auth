'use strict';

const Gallery = require('../../model/gallery'); 
const Auth = require('../../model/Auth'); 
const mock = require('mock');
const debug = require('debug')('http:Auth-unit-test');

describe('NOTE unit testing', function() {
  describe('Test object', function() {
    beforeAll(() => {
      this.gallery_object = mock.new_gallery_data();
      let user_id = this.gallery_object.user_data.user_id;
      let gallery_title = this.gallery_object.title;
      let gallery_description = this.gallery_object.description;
      this.user_token = this.gallery_object.user_data.user_token;
      let gallery_data = {title: gallery_title, description: gallery_description, user_id: user_id};
      new Gallery(gallery_data).save()
        .then(gallery => {
          debug('Gallery', gallery);
          this.gallery = gallery;
        });
    });

    afterAll(() => {
      Auth.remove();
      Gallery.remove();
    });
    
    it('should be an object', () => {
      debug('Gallery',this.gallery);
      expect (this.gallery).toBeInstanceOf(Object);
    });
    it('should have a uuid', () => {
      expect (this.gallery.user_id).toMatch(/^[0-9a-fA-F]{24}$/);
    });
    it('should have properties with values', () => {
      expect(this.gallery.title).not.toBeNull();
      expect(this.gallery.description).not.toBeNull();
      expect(this.gallery.user_id).not.toBeNull();
    });

    // it('should have a hashed password that does not match the original plain text password', () => {
    //   expect(this.auth.password).not.toEqual(this.password);
    // });

    // it('should return true when comparing hashed password to original with the comparePasswords method', () => {
    //   this.auth.comparePasswords(this.password)
    //     .then(valid => {
    //       expect(valid).toBe(true);
    //     });
    // });
  });
});