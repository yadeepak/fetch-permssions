const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  connections: {
    required: true,
    type: [],

  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('UserData', userSchema)