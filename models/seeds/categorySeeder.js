const db = require('../../config/mongoose.js')
const Category = require('../category.js')
const dataList = require('./data.json')

db.once('open', () => {
  const collectionArray = []

  dataList.results.forEach(result => {
    const { category, icon } = result
    collectionArray.push({ name: category, icon })
  })

  Category.insertMany(collectionArray)
    .then(() => console.log('Category seed create OK !'))
    .then(() => db.close())
    .then(() => console.log('MongoDB Connection closed !'))
    .catch(error => console.error(error))
})
