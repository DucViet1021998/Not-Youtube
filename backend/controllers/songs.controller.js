const ytrend = require('@freetube/yt-trending-scraper');

const getNumberText = require('../helpers/getNumberText')
const ytdl = require('ytdl-core');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const axios = require('axios');
const CronJob = require('cron').CronJob;

const SongModel = require('../Models/song.model')
dayjs.extend(relativeTime);
const numberFormat = new Intl.NumberFormat("en-US");


module.exports = {

    // [GET METHOD]  
    // Read all songs in database
    async getAllSongs(req, res) {
        try {
            const songs = await SongModel.find({}).lean();
            songs.sort(() => (Math.random() > 0.5 ? 1 : -1));
            res.status(200).send(songs);
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    // [GET METHOD]  
    // Read all songs in youtube trending page 
    async trending(req, res) {
        try {
            const parameters = {
                geoLocation: 'VN',
                parseCreatorOnRise: false,
                page: req.params.type,
            };
            ytrend
                .scrapeTrendingPage(parameters)
                .then(data => {
                    const newData = data.map((song) => ({
                        title: song.title,
                        channel: song.author,
                        channel_url: `https://www.youtube.com/${song.authorUrl}`,
                        description: song.description,
                        verified: song.isVerified,
                        view_count: numberFormat.format(song.viewCount),
                        view_count_text: getNumberText(song.viewCount),
                        published_text: song.publishedText,
                        thumbnail_url: song.videoThumbnails[1].url,
                        verified_artist: song.isVerifiedArtist,
                        video_url: `https://youtu.be/${song.videoId}`,
                    }));
                    res.status(200).send(newData);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    // [GET METHOD]  
    // Get single song in database send to Watch Page
    async watchPage(req, res) {
        try {
            const songs = await SongModel.findById(req.params.songId);
            res.status(200).send(songs);
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    // [DELETE METHOD]  
    // Delete youtube video in database
    async delete(req, res) {
        try {
            // Check admin request
            if (!req.user.role === 'admin') res.sendStatus(400)
            await SongModel.findOneAndDelete({ _id: req.headers.songid })
            res.sendStatus(200)
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },



    // [PATCH METHOD]  
    // Update information all Video in database by Cron job
    async update(req, res) {
        try {
            const data = await SongModel.find();
            data.map((e) => {
                ytdl.getInfo(e.video_url)
                    .then((info) => {
                        (e.view_count = numberFormat.format(info.videoDetails.viewCount)),
                            (e.subscriber_count = numberFormat.format(info.videoDetails.author.subscriber_count)),
                            (e.publish_date_compare = dayjs(info.videoDetails.publishDate).fromNow()),
                            (e.view_count_text = getNumberText(info.videoDetails.viewCount)),
                            (e.subscriber_count_text = getNumberText(info.videoDetails.author.subscriber_count))
                    })
                    .then(() => e.save());
            });
            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

}

// Cron Job 
var job = new CronJob(
    '0 */15 * * * *',
    async function () {
        try {
            await axios.patch('http://localhost:3023/update');

        } catch (error) {
            console.log(error);
        }
    },
    null,
    true,
    'America/Los_Angeles',
);

job.start();






