'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const faker = require('faker');
const Auth = require('../../model/auth');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/signup`;

describe('POST /api/v1/signup', function() {
  this.mockCharacter = { username: 'testuser', password: 'testpws', email: 'bob@bob.com'};
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(server.stop);

  describe('Valid requests', () => {
    beforeAll(() => {
      return superagent.post(`${api}`)
        .send(this.mockCharacter)
        .then(res => this.response = res);
    });

    it('should return a status of 201', () => {
      expect(this.response.status).toEqual(201);
    });


    describe('inValid requests', () => {
      it('should return a status 404 given no request body', () => {
        return superagent.post(`:${port}/api/v1/signfoo`)
          .send()
          .catch(err => expect(err.status).toEqual(404));
      });
      it('should return a status 400 on bad request body', () => {
        return superagent.post(api)
          .send(new Auth({
            username: '',
            password: faker.name.lastName(),
            email: faker.internet.email(),
          }))
          .catch(err => expect(err.status).toBe(400));
      });
    });
  });
});