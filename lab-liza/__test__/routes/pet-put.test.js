'use strict';
// PUT - test 200, for a post request with a valid body
// PUT - test 401, if no token was provided
// PUT - test 400, if the body was invalid
// PUT - test 404, for a valid request made with an id that was not found


const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

describe('PUT /api/v1/pet', function() {
  beforeAll(server.start);
  beforeAll(() => mocks.auth.createOne().then(data => this.mockUser = data));
  afterAll(server.stop);
  afterAll(mocks.auth.removeAll);
  afterAll(mocks.pet.removeAll);

  describe('Valid request', () => {
    it('should return a 201 UPDATED status code', () => {
      let petMock = null;
      return mocks.pet.createOne()
        .then(mock => {
          petMock = mock;
          console.log(petMock.pet._id, petMock.pet.body, '********************');
          return superagent.put(`:${process.env.PORT}/api/v1/pet/${petMock.pet._id, petMock.pet.body}`)
            .set('Authorization', `Bearer ${mock.token}`)
            .send({
              name: faker.lorem.word(),
              breed: faker.lorem.words(4),
            });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body).toHaveProperty('name');
          expect(response.body).toHaveProperty('breed');
          expect(response.body).toHaveProperty('_id');
          expect(response.body.userId).toEqual(petMock.pet.userId.toString());
        });
    });
  });

  describe('Invalid request', () => {
    it('should return a 401 NOT AUTHORIZED given back token', () => {
      return superagent.put(`:${process.env.PORT}/api/v1/pet`)
        .set('Authorization', 'Bearer BADTOKEN')
        .catch(err => expect(err.status).toEqual(401));
    });
    // it('should return a 400 BAD REQUEST on improperly formatted body', () => {
    //   return superagent.put(`:${process.env.PORT}/api/v1/pet`)
    //     .set('Authorization', `Bearer ${this.mockUser.token}`)
    //     .send({})
    //     .catch(err => expect(err.status).toEqual(400));
    // });
  });
});