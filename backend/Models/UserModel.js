const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/UserYoutube');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    gender: mongoose.Schema.Types.String,
    accessToken: mongoose.Schema.Types.String,
    refreshToken: mongoose.Schema.Types.String,
})

const userModel = mongoose.model('users', userSchema);


module.exports = userModel