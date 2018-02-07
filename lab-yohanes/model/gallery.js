'use strict'

const mongoose = require('mongoose')
const Gallery = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    req: 'user',
  },
})

module.exports = mongoose.model('gallerie', Gallery) //mongoose adds an 's' when epxorting so thats we we have 'gallerie'