const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    accessToken: mongoose.Schema.Types.String,
    refreshToken: mongoose.Schema.Types.String,
    avatar: mongoose.Schema.Types.String,
    role: mongoose.Schema.Types.String,
    check: mongoose.Schema.Types.Boolean,
    songs: [{ type: mongoose.ObjectId, ref: 'songs' }],
},
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
