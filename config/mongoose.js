const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB Connect fail !')
})

db.once('open', () => {
  console.log('MongoDB Connect Success !')
})

module.exports = db