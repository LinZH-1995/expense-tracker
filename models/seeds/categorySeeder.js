if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

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
    .then(() => console.log('Category seeds already import ！'))
    .then(() => process.exit())
    .catch(error => console.error(error))
})
