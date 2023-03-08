const express = require('express');
const CronJob = require('cron').CronJob;
const ytdl = require('ytdl-core');
const ytrend = require('@freetube/yt-trending-scraper');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const axios = require('axios');
const router = express.Router();
// const getNumber = require('../Functions')

const search = require('./SearchSong/search')
const addSongs = require('./AddSongs/AddSongs')
const songModel = require('../Models/SongModel');
dayjs.extend(relativeTime);

router.use('/', addSongs);
router.use('/', search);

function getNumber(num) {
    if (num.length >= 0 && num.length <= 3) {
        console.log(num);
    } else if (num.length >= 4 && num.length < 7) {
        const newNum = num.slice(0, -3) + ',' + num.slice(-3);
        return newNum;
    } else if (num.length >= 7 && num.length < 10) {
        const newNum = num.slice(0, -3) + ',' + num.slice(-3);
        const newNum2 = newNum.slice(0, -7) + ',' + newNum.slice(-7);
        return newNum2;
    } else if (num.length >= 10 && num.length < 13) {
        const newNum = num.slice(0, -3) + ',' + num.slice(-3);
        const newNum2 = newNum.slice(0, -7) + ',' + newNum.slice(-7);
        const newNum3 = newNum2.slice(0, -11) + ',' + newNum2.slice(-11);
        return newNum3;
    }
}

function getNumberText(num) {
    numText = num.toString()
    if (numText.length >= 0 && numText.length < 4) {
        return numText;
    } else if (numText.length >= 4 && numText.length < 7) {
        const newNum = numText.slice(0, -3);
        const textNum = `${newNum}K`;
        return textNum;
    } else if (numText.length >= 7 && numText.length < 10) {
        const newNum = numText.slice(0, -6);
        const textNum = `${newNum}M`;
        return textNum;
    } else if (numText.length >= 10 && numText.length < 13) {
        const newNum = `${numText.slice(0, -9)},${numText.slice(1, -8)}`;
        const textNum = `${newNum}B`;
        return textNum;
    }
}

router.get('/get-songs', async (req, res) => {
    try {
        const songs = await songModel.find({}).lean();
        songs.sort(() => (Math.random() > 0.5 ? 1 : -1));
        res.status(200).send(songs);
    } catch (error) {
        console.log(error);
        res.send('Error!');
    }
});

router.get('/trending/:type', async (req, res) => {
    try {

        console.log(req.params.type);

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
                    view_count: getNumber(song.viewCount.toString()),
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
});

router.get('/watch/:songid', async (req, res) => {
    try {
        const songs = await songModel.findById(req.params.songid);
        res.status(200).send(songs);
    } catch (error) {
        console.log(error);
        res.send('Error!');
    }
});

router.get('/dashboard/watch/:songid', async (req, res) => {
    try {
        const songs = await songModel.findById(req.params.songid);
        res.status(200).send(songs);
    } catch (error) {
        console.log(error);
        res.send('Error!');
    }
});

router.patch('/update', async (req, res) => {
    try {
        const data = await songModel.find();
        data.map((e) => {
            ytdl.getInfo(e.video_url)
                .then((info) => {
                    (e.view_count = getNumber(info.videoDetails.viewCount)),
                        (e.subscriber_count = getNumber(info.videoDetails.author.subscriber_count.toString())),
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
});

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

module.exports = router;
