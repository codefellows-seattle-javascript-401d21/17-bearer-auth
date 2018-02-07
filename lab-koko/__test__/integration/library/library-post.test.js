'use strict';

const faker = require('faker');
const mock = require('../../lib/mock');
const superagent = require('superagent');
const server = require('../../../lib/server');

describe('POST /api/v1/library', function() {
  beforeAll(server.start);
  beforeAll(() => mock.Auth.createOne().then(data => this.mockUser = data));
  afterAll(server.stop);
  afterAll(mock.Auth.removeAll);
  afterAll(mock.Library.removeAll);

  describe('Valid request', () => {
    it('should return a 201 CREATED status code', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/library`)
        .set('Authorization', `Bearer ${this.mockUser.token}`)
        .send({
          name: faker.lorem.word(),
          description: faker.lorem.words(4),
        })
        .then(res => {
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('description');
          expect(res.body).toHaveProperty('_id');
        });
    });
  });

  describe('Invalid request', () => {
    it('should return a 401 NOT AUTHORIZED given back token', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/library`)
        .set('Authorization', 'Bearer BADTOKEN')
        .catch(err => expect(err.status).toEqual(401));
    });
    it('should return a 400 BAD REQUEST on improperly formatted body', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/library`)
        .set('Authorization', `Bearer ${this.mockUser.token}`)
        .send({})
        .catch(err => expect(err.status).toEqual(400));
    });
  });
});