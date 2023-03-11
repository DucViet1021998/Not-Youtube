const ytdl = require('ytdl-core');
const dayjs = require('dayjs');

const SongModel = require('../Models/song.model')
const UserModel = require('../Models/user.model')

const numberFormat = new Intl.NumberFormat("en-US");

const getNumberText = require('../helpers/getNumberText')

module.exports = {
    async addSongs(req, res) {
        try {
            // Check List-Video URL
            const video_url = req.body.video_url;
            if (video_url.length !== 28) return res.sendStatus(500);

            // Get data by Youtube URL
            await ytdl.getInfo(video_url).then(async (info) => {
                // Check Empty Data URL
                if (!info) return res.sendStatus(403);


                const findUrl = await SongModel.findOne({ video_url: video_url });

                // Check URL exists in Database
                if (!findUrl) {
                    // Add Song and Save to Database
                    await SongModel.create({
                        channel: info.videoDetails.author.name,
                        channel_avatar: info.videoDetails.author.thumbnails[2].url
                            ? info.videoDetails.author.thumbnails[2].url
                            : (info.videoDetails.author.thumbnails[1].url || info.videoDetails.author.thumbnails[0].url),
                        channel_url: info.videoDetails.author.user_url,
                        title: info.videoDetails.title,
                        thumbnail_url: info.videoDetails.thumbnails[3].url,
                        verified: info.videoDetails.author.verified,
                        subscriber_count: numberFormat.format(info.videoDetails.author.subscriber_count),
                        subscriber_count_text: getNumberText(info.videoDetails.author.subscriber_count),
                        video_url: video_url,
                        publish_date: info.videoDetails.publishDate,
                        description: info.videoDetails.description,
                        view_count: numberFormat.format(info.videoDetails.viewCount),
                        view_count_text: getNumberText(info.videoDetails.viewCount),
                        keywords: info.videoDetails.keywords,
                        publish_date_compare: dayjs(info.videoDetails.publishDate).fromNow(),
                    });
                    const songId = await SongModel.findOne({
                        video_url: video_url,
                    });

                    return res.status(200).send(songId);
                } else {
                    return res.status(400).send(findUrl)
                }
            });
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    async addAlbumUser(req, res) {
        try {
            // lấy data từ client
            const video_url = req.body.video_url;
            const userId = req.headers.userid;

            // Check List-Video URL
            if (video_url.length !== 28) return res.sendStatus(500)

            // Check User trong DB
            const user = await UserModel.findById(userId);

            // throw error if not found user
            if (!user) return res.status(404);

            // Check URL Video trong data
            const video = await SongModel.findOne({ video_url: video_url }).lean();

            // Get data by Youtube URL
            if (!video) {
                await ytdl.getInfo(video_url).then(async (info) => {
                    // Check Empty Data URL
                    if (!info) return res.sendStatus(403);

                    // Add Song and Save to Database
                    await SongModel.create({
                        channel: info.videoDetails.author.name,
                        channel_avatar: info.videoDetails.author.thumbnails[2].url,
                        channel_url: info.videoDetails.author.user_url,
                        title: info.videoDetails.title,
                        thumbnail_url: info.videoDetails.thumbnails[3].url,
                        verified: info.videoDetails.author.verified,
                        subscriber_count: numberFormat.format(info.videoDetails.author.subscriber_count),
                        subscriber_count_text: getNumberText(info.videoDetails.author.subscriber_count),
                        video_url: video_url,
                        publish_date: info.videoDetails.publishDate,
                        description: info.videoDetails.description,
                        view_count: numberFormat.format(info.videoDetails.viewCount),
                        view_count_text: getNumberText(info.videoDetails.viewCount),
                        keywords: info.videoDetails.keywords,
                        publish_date_compare: dayjs(
                            info.videoDetails.publishDate,
                        ).fromNow(),
                    });
                    const songId = await SongModel.findOne({
                        video_url: video_url,
                    });
                    user.songs.unshift(songId._id);
                    user.save();

                    return res.sendStatus(200)
                });
            } else if (user && video) {
                if (user.songs.includes(video._id))
                    return res.sendStatus(401);
                else {
                    user.songs.unshift(video._id);
                    user.save();
                    return res.sendStatus(201)
                }
            } else res.send('error');
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },


}