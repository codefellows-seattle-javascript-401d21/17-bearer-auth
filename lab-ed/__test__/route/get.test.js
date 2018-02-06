'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
require('jest')

describe('GET /api/v1/signin', function() {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/signin`)
  beforeAll(server.start)
  afterAll(server.stop)

  describe('Valid Request to the GET API, ', () => {
    describe('GET /ba/', () => {
      it('should respond with a status 200', () => {
        return superagent.get(`${this.base}`)
          .auth('ed', 'hello')
          .then(res => {
            expect(res.status).toBe(200)
          })
      })
    })
  })

  describe('Invalid Request to the GET API, ', () => {
    describe('GET /ba/', () => {
      it('should respond with a status 401', () => {
        return superagent.get(`${this.base}`)
          .auth('jimbo', 'hello')
          .catch(err => {
            expect(err.status).toBe(401)
            expect(err.response.text).toMatch(/Authorization Failed. User not found/i)
          })
      })
    })
  })
  it('should return a status 401 given no request body', () => {
    return superagent.get(`${this.base}`)
      .send()
      .catch(err => expect(err.status).toEqual(401))
  })
  it('should return a status 401 given an improperly formatted body', () => {
    return superagent.get(`${this.base}`)
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
