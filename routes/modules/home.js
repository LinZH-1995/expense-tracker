const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router