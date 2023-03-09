const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./routes');
mongoose.connect('mongodb://localhost:27017/Youtube');

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes init
route(app);



app.listen(3023);
