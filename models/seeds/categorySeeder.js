const db = require('../../config/mongoose.js')
const Category = require('../category.js')
const dataList = require('./data.json')

db.once('open', () => {
  const collectionArray = []

  dataList.results.forEach(result => {
    const { icon, icon_name } = result
    collectionArray.push({ icon, name: icon_name })
  })

  Category.insertMany(collectionArray)
    .then(() => console.log('Category seed create OK !'))
    .then(() => db.close())
    .then(() => console.log('MongoDB Connection closed !'))
    .catch(error => console.error(error))
})
