'use strict'

const faker = require('faker')
const User = require('../../model/auth.js')

const mock = module.exports = {}

// User Mocks - One, Many, RemoveAll
mock.user = {}
mock.user.createOne = () => new User({ username: faker.internet.userName(), email: faker.internet.email(), password: faker.random.uuid()}).save()

mock.user.removeAll = () => Promise.all([User.remove()])

