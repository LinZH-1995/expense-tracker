const express = require('express')
const exphbs = require('express-handlebars')
const methodOverrirde = require('method-override')
const expSession = require('express-session')

const usePassport = require('./config/passport.js')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose.js')

const app = express()
const port = process.env.PORT

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs', helpers: require('./hbs-helper.js') }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(methodOverrirde('_method'))
app.use(express.urlencoded({ extended: true }))

app.use(expSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use(routes)

app.listen(port, () => {
  console.log(`Now Server is working on localhost:${port}`)
})