'use strict'

const faker = require('faker')
const mocks = require('../lib/mocks')
const superagent = require('superagent')
const server = require('../../lib/server')
require('jest')

describe('GET /api/v1/pet', function() {
  beforeAll(server.start)
  beforeAll(() => mocks.auth.createOne().then(data => this.mockUser = data))
  afterAll(server.stop)
  afterAll(mocks.auth.removeAll)
  afterAll(mocks.pet.removeAll)

  describe('Valid request', () => {
    //------------------------------------------------------------------------------------------
    // vinicio - I added this code to show you how to use mocks in conjunction with bearer auth
    //------------------------------------------------------------------------------------------
    it('should return a 200 FIND ALL status code', () => {
      let petMock = null;
      return mocks.pet.createOne()
        .then(mock => {
          petMock = mock;
          return superagent.get(`:${process.env.PORT}/api/v1/pet`)
            .set('Authorization', `Bearer ${petMock.token}`)
        })
        .then(response => {
          expect(response.status).toEqual(200);
        });
    });
    it('should return a 200 FIND ONE status code', () => {
      let petMock = null;
      return mocks.pet.createOne()
        .then(mock => {
          petMock = mock;
          return superagent.get(`:${process.env.PORT}/api/v1/pet/${petMock._id}`)
            .set('Authorization', `Bearer ${petMock.token}`)
        })
        .then(response => {
          expect(response.status).toEqual(200);
        });
    });
    //------------------------------------------------------------------------------------------
  });

  describe('Invalid request', () => {
    it('should return a 401 NOT AUTHORIZED given back token', () => {
      return superagent.get(`:${process.env.PORT}/api/v1/pet`)
      .set('Authorization', 'Bearer BADTOKEN')
      .catch(err => expect(err.status).toEqual(401))
    })
    it('should return a 400 BAD REQUEST on improperly formatted body', () => {
      return superagent.get(`:${process.env.PORT}/api/v1/pet`)
      .set('Authorization', `Bearer ${this.mockUser.token}`)
      .send({})
      .catch(err => expect(err.status).toEqual(400))
    })
    it('should return a 404 BAD PATH on improperly formatted body', () => {
      return superagent.get(`:${process.env.PORT}/api/v1/pet/notpet`)
      .set('Authorization', `Bearer ${this.mockUser.token}`)
      .send({})
      .catch(err => expect(err.status).toEqual(404))
    })
  })
})
