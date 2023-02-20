const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const users = require('./users')


const app = express()
app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

app.use('/', users)




app.listen(3023)