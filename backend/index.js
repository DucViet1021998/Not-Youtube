const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./routes');
const dotenv = require('dotenv');


dotenv.config();
mongoose.connect(process.env.DB_CONNECTION);

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes init
route(app);

app.listen(3023);

// module.exports = app;
