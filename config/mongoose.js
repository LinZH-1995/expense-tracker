const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker')

const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB Connect fail !')
})

db.once('open', () => {
  console.log('MongoDB Connect Success !')
})

module.exports = db