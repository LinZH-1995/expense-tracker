const express = require('express')
const exphbs = require('express-handlebars')
const methodOverrirde = require('method-override')

const routes = require('./routes')
require('./config/mongoose.js')

const app = express()
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(methodOverrirde('_method'))
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log(`Now Server is working on localhost:${port}`)
})