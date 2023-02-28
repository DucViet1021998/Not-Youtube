const mongoose = require('mongoose');
const { Schema } = mongoose;


const songSchema = new Schema({
    video_url: mongoose.Schema.Types.String,
    channel: mongoose.Schema.Types.String,
    channel_avatar: mongoose.Schema.Types.String,
    channel_url: mongoose.Schema.Types.String,
    title: mongoose.Schema.Types.String,
    title_normalize: mongoose.Schema.Types.String,
    thumbnail_url: mongoose.Schema.Types.String,
    verified: mongoose.Schema.Types.Boolean,
    subscriber_count: mongoose.Schema.Types.Number,
    view_count: mongoose.Schema.Types.String,
    publish_date: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,
    view_count_text: mongoose.Schema.Types.String,
    subscriber_count_text: mongoose.Schema.Types.String,
})


const songModel = mongoose.model('songs', songSchema);


module.exports = songModel