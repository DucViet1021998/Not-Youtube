const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const users = require('./users')
const songs = require('./songs')
const search = require("./songs/SearchSong")
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Youtube');

const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/', users)
app.use('/', songs)
app.use('/', search)

app.listen(3023)