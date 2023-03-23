const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

router.get('/', (req, res) => {
  return Record.find().lean()
           .then(records => {
              Category.find().lean()
                .then(categorys => {
                  let totalAmount = 0
                  records.forEach(record => {
                    const { icon }  = categorys.find(category => category.name === record.category) || '--'
                    record.icon = icon
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
  const key = req.query.categorySelect
  console.log(key)

  if (key === '--') {
    return res.redirect('/')
  }

  return Record.find({ category: key}).lean()
           .then(records => {
              Category.find().lean()
                .then(categorys => {
                  let totalAmount = 0
                  records.forEach(record => {
                    const { icon } = categorys.find(category => category.name === record.category) || '--'
                    record.icon = icon
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