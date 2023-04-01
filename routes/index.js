const express = require('express')
const router = express.Router()
const home = require('./modules/home.js')
const records = require('./modules/record.js')
const users = require('./modules/users.js')

router.use('/records', records)
router.use('/users', users)
router.use('/', home)

module.exports = router