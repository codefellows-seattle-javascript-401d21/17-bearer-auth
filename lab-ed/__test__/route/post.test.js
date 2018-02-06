'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
const faker = require('faker')
require('jest')

describe('POST /api/v1/signup', function() {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/signup`)
  beforeAll(server.start)
  afterAll(server.stop)

  describe('Valid Request to the POST API, ', () => {
    describe('POST /ba/', () => {
      it('should respond with a status 201', () => {
        return superagent.post(`${this.base}`)
          .send({username: faker.internet.userName(), email: faker.internet.email(), password: faker.random.uuid()})
          .then(res => {
            expect(res.status).toBe(201)
          })
      })
    })
  })
  it('should return a token if post is succesful', () => {
    return superagent.post(`${this.base}`)
      .send({username: faker.internet.userName(), password: faker.internet.password(), email: faker.internet.email()})
      .then(res => {
        let rawBuff = Buffer.from(res.body.split('.')[1], 'base64').toString()
        expect(rawBuff).toContain('token')
      })
  })

  describe('Invalid Request to the POST API, ', () => {
    describe('POST /ba/', () => {
      it('should respond with a status 409 and BulkWriteError', () => {
        return superagent.post(`${this.base}`)
          .send({username: 'ed', email: faker.internet.email(), password: 'hello'})
          .catch(err => {
            expect(err.status).toBe(409)
            expect(err.response.text).toMatch(/BulkWriteError/i)
          })
      })
      it('should respond with a status 400 and auth validation failed', () => {
        return superagent.post(`${this.base}`)
          .send({username: '', email: faker.internet.email(), password: 'hello'})
          .catch(err => {
            expect(err.status).toBe(400)
            expect(err.response.text).toMatch(/auth validation failed/i)
          })
      })
    })
  })
  it('should return a status 401 given no request body', () => {
    return superagent.post(`${this.base}`)
      .send()
      .catch(err => expect(err.status).toEqual(401))
  })
  it('should return a status 401 given an improperly formatted body', () => {
    return superagent.post(`${this.base}`)
      .send({gnarf: 200})
      .catch(err => expect(err.status).toEqual(401))
  })
  it('should respond with a status 404 for bad path', () => {
    return superagent.get(':4000/api/v1/imWrong/')
      .catch(err => {
        expect(err.status).toBe(404)
      })
  })
})
