const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const User = require('../../models/user.js')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    const error = 'Password 與 Confirm Password 必須一致！'
    return res.render('register', { name, email, password, confirmPassword, error })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        const error = 'Email 已經註冊過了。'
        return res.render('register', { name, email, password, confirmPassword, error })
      }
      return bcrypt.genSalt(10)
    })
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({ name, email, password: hash }))
    .then(() => res.redirect('/users/login'))
    .catch(err => console.log(err))
})

module.exports = router