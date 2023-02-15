const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('combined'))
app.use(express.json())



app.listen(3096)