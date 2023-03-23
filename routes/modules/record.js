const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

router.get('/new', (req, res) => {
  res.render('new')
})

module.exports = router