

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') // compare tests
const crypto = require('crypto') //generate compare hash (****)
const mongoose = require('mongoose')

//saltRound // how many round of random generators before it spits back a *. this makes it very encrypt
const Auth = mongoose.Schema({ //
  username: { type: String, required: true, unique: true }, //unique true makes it so no two users ever have the same name
  password: { type: String, required: true },
  email: { type: String, required: true },
  compareHash: { type: String, unique: true }, //something to do with bcrypto
}, { timestamps: true })

Auth.methods.generatePasswordHash = function (password) {
  if (!password) return Promise.reject(new Error('Authorization Failed. Password REQUIRED.'))

  return bcrypt.hash(password, 10) //10 rounds of randmozing a character to convert it to a '*'
    .then(hash => this.password = hash)
    .then(() => this)
   .catch(err => err)
}

Auth.methods.comparePasswordHash = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => { //comparing the hash password with the user inputs password
      if (err) return reject(err)
      if (!valid) return reject(new Error('Authorization Failed. Password Invalid'))
      resolve(this)
    })
  })
}
//hash a password, pair a password
//this procerss will give a token to the user for every time they make a request and response to our API. Token exore=ires

Auth.methods.generateCompareHash = function () { //convert and encrypt password
  this.compareHash = crypto.randomBytes(64).toString('hex') //
  return this.save() //this saves the generated compare hash (token seeds)
    .then(() => Promise.resolve(this.compareHash))
    // .catch(() => this.generateCompareHash()) //linmits the users passwrod input trials i think
    .catch(console.error)
  }

Auth.methods.generateToken = function () { //generate token for access to our API
  return this.generateCompareHash()
    .then(compareHash => jwt.sign({ token: compareHash }, process.env.APP_SECET)) //this generates the token!!!
    .catch(err => err)
}

module.exports = mongoose.model('auth', Auth)