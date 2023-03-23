const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
return Record.create(req.body)
         .then(() => res.redirect('/'))
         .catch(error => console.log(error))
})

module.exports = router