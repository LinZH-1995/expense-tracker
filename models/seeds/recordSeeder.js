const db = require('../../config/mongoose.js')
const Record = require('../record.js')
const dataList = require('./data.json')

db.once('open', () => {
  const collectionArray = []

  dataList.results.forEach(result => {
    const { name, category, date, amount } = result
    collectionArray.push({ name, category, date, amount})
  })

  Record.create(collectionArray)
    .then(() => console.log('Record seed create OK !'))
    .then(() => db.close())
    .then(() => console.log('MongoDB Connection closed !'))
    .catch(error => console.error(error))
})