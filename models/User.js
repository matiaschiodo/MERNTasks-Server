const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  createdIn: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('User', UsersSchema)