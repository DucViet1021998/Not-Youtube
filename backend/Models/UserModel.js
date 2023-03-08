const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    gender: mongoose.Schema.Types.String,
    accessToken: mongoose.Schema.Types.String,
    refreshToken: mongoose.Schema.Types.String,
    avatar: mongoose.Schema.Types.String,
    songs: [{ type: mongoose.ObjectId, ref: 'songs' }],
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
