const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

router.get('/', (req, res) => {
  const userId = req.user._id

  Record.find({ userId }).lean()
    .then(records => {
      Category.find().lean()
        .then(categorys => {
          let totalAmount = 0
          records.forEach(record => {
            record.icon = categorys.find(category => category.name === record.category).icon || '--'
            record.date = record.date.toISOString().slice(0, 10)
            totalAmount += record.amount
          })
          return totalAmount.toLocaleString()
        })
        .then(totalAmount => res.render('index', { records, totalAmount }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const key = req.query.categorySelect

  if (key === '--') {
    return res.redirect('/')
  }

  Record.find({ userId, category: key }).lean()
    .then(records => {
      Category.find().lean()
        .then(categorys => {
          let totalAmount = 0
          records.forEach(record => {
            record.icon = categorys.find(category => category.name === record.category).icon || '--'
            record.date = record.date.toISOString().slice(0, 10)
            totalAmount += record.amount
          })
          return totalAmount.toLocaleString()
        })
        .then(totalAmount => res.render('index', { records, totalAmount, key }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router