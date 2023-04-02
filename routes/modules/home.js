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

  if (categorySelect === '--' && monthSelect === '--') {
    return res.redirect('/')
  }

  if (categorySelect !== '--' && monthSelect !== '--') {
    return Record.find({ userId, category: categorySelect }).lean()
      .then(records => {
        records = records.filter(record => record.date.getMonth() === Number(monthSelect) - 1)
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
          .then(totalAmount => res.render('index', { records, totalAmount, categorySelect, monthSelect }))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }

  const key = categorySelect !== '--' ? 'category' : 'date'
  const value = key === 'category' ? categorySelect : monthSelect
  if (key === 'category') {
    return Record.find({ userId }).lean()
      .then(records => {
        records = records.filter(record => record[key] === value)
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
          .then(totalAmount => res.render('index', { records, totalAmount, categorySelect }))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }

  Record.find({ userId }).lean()
    .then(records => {
      records = records.filter(record => record[key].getMonth() === Number(value) - 1)
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
        .then(totalAmount => res.render('index', { records, totalAmount, monthSelect }))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

})

module.exports = router