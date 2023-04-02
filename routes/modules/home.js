const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')
const record = require('../../models/record.js')

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
  const { categorySelect, monthSelect } = req.query

  Record.find({ userId }).lean()
    .then(records => {
      if (categorySelect) records = records.filter(record => record.category === categorySelect)
      if (monthSelect) records = records.filter(record => record.date.toISOString().substring(0, 7) === monthSelect)
      Category.find().lean()
        .then(categorys => {
          let totalAmount = 0
          records.forEach(record => {
            record.icon = categorys.find(category => category.name === record.category).icon || '--'
            record.date = record.date.toISOString().substring(0, 10)
            totalAmount += record.amount
          })
          return totalAmount.toLocaleString()
        })
        .then(totalAmount => res.render('index', { records, totalAmount, categorySelect, monthSelect }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router