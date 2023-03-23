const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')
const record = require('../../models/record.js')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
return Record.create(req.body)
         .then(() => res.redirect('/'))
         .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id).lean()
           .then(record => {
             record.date = record.date.toISOString().slice(0, 10)
             return record
           })
           .then(record => res.render('edit', { record }))
           .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const editData = req.body
  return Record.findById(id)
           .then(record => {
            record = Object.assign(record, editData)
            return record.save()
           })
           .then(() => res.redirect('/'))
           .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.deleteOne({ _id: id })
           .then(() => res.redirect('/'))
           .catch(error => console.log(error))
})

module.exports = router