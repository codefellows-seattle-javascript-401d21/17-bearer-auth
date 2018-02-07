'use strict'

const faker = require('faker')
const mocks = require('../lib/mocks')
const superagent = require('superagent')
const server = require('../../lib/server')
require('jest')

describe('PUT api/v1/pet', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(mocks.auth.removeAll);
  afterAll(mocks.pet.removeAll);

  beforeAll(() => mocks.auth.createOne().then(data => this.mockUser = data));
  beforeAll(() => mocks.pet.createOne().then(data => this.mockPet = data));

  describe('Valid request', () => {
    it('should return a single pet with an id', () => {
      return superagent.put(`:${process.env.PORT}/api/v1/pet/${this.mockPet.pet._id}`)
        .set('Authorization', `Bearer ${this.mockUser.token}`)
        .send({
          name: faker.lorem.word(),
          breed: faker.name.findName(),
        })
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });
  });


  describe('Invalid request', () => {
    it('should return a 401 NOT AUTHORIZED given back token', () => {
      return superagent.put(`:${process.env.PORT}/api/v1/pet/${this.mockPet.pet._id}`)
        .set('Authorization', 'Bearer BADTOKEN')
        .catch(err => expect(err.status).toEqual(401));
    });

    it('should return a 400 BAD REQUEST on improperly formatted body', () => {
      return superagent.put(`:${process.env.PORT}/api/v1/pet/${this.mockPet.pet._id}`)
        .set('Authorization', `Bearer ${this.mockUser.token}`)
        .send({
          pepper: faker.lorem.word(),
        })
        // .then(res => console.log(res))
        .catch(err => expect(err.status).toEqual(400));
    });
    it('should return a 404 with a bad ID', () => {
      return superagent.put(`:${process.env.PORT}/api/v1/pet/badpath`)
        .set('Authorization', `Bearer ${this.mockUser.token}`)
        .send({
          name: faker.lorem.word(),
          breed: faker.name.findName(),
        })
        .catch(err => expect(err.status).toEqual(404));
    });

  });
});
