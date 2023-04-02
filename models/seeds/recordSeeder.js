if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose.js')
const Record = require('../record.js')
const User = require('../user.js')
const dataList = require('./data.json').results

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    recordSeeds: dataList.slice(0, 3)
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    recordSeeds: dataList.slice(3)
  }
]

db.once('open', () => {

  Promise.all(Array.from({ length: 2 }, (element, index) => {
    return bcrypt.genSalt(10).then(salt => bcrypt.hash(SEED_USERS[index].password, salt))
  }))
    .then(hashs => {
      hashs.forEach((hash, index) => SEED_USERS[index].password = hash)
      return SEED_USERS
    })
    .then(seedUsers => User.insertMany(seedUsers))
    .then(users => {
      console.log('User seeds already import ！')
      users.forEach((user, index) => {
        const userId = user._id
        SEED_USERS[index].recordSeeds.forEach(record => record.userId = userId)
      })
      return SEED_USERS
    })
    .then(seedUsers => Promise.all(Array.from({ length: 2 }, (element, index) => {
      return Record.insertMany(seedUsers[index].recordSeeds)
    })))
    .then(() => console.log('Record seeds belong own User already import ！'))
    .then(() => process.exit())
    .catch(err => console.log(err))
})