const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
})

module.exports = mongoose.model('Task', TaskSchema)