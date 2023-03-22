const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    comment: mongoose.Schema.Types.String,
    likes: [{ type: mongoose.ObjectId, ref: 'users' }],
    dislikes: [{ type: mongoose.ObjectId, ref: 'users' }],
    users: [{ type: mongoose.ObjectId, ref: 'users' }],
    songs: [{ type: mongoose.ObjectId, ref: 'songs' }]
},
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model('comment', CommentSchema);

module.exports = CommentModel;
