const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const records = require('./modules/record.js')
const users = require('./modules/users.js')
const auth = require('./modules/auth.js')
const { authenticator } = require('../middleware/auth.js')

router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router