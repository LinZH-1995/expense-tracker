const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },

  category: {
    type: Schema.Types.String,
    ref: 'Category',
    trim: true,
    index: true,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)