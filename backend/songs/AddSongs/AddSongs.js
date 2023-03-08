const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const dayjs = require('dayjs');


const userModel = require('../../Models/UserModel');
const songModel = require('../../Models/SongModel');


function removeAccents(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase();
}

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

router.post('/add-song', async (req, res) => {
    try {
        // Check List-Video URL
        const video_url = req.body.video_url;
        if (video_url.length !== 28) return res.sendStatus(500);

        // Get data by Youtube URL
        await ytdl.getInfo(video_url).then(async (info) => {
            // Check Empty Data URL
            if (!info) return res.sendStatus(403);
            // console.log(info.videoDetails.author.subscriber_count.toString());

            const findUrl = await songModel.findOne({ video_url: video_url });

            // Check URL exists in Database
            if (!findUrl) {
                // Add Song and Save to Database
                await songModel.create({
                    channel: info.videoDetails.author.name,
                    channel_avatar: info.videoDetails.author.thumbnails[2].url,
                    channel_url: info.videoDetails.author.user_url,
                    title: info.videoDetails.title,
                    title_normalize: removeAccents(info.videoDetails.title),
                    thumbnail_url: info.videoDetails.thumbnails[3].url,
                    verified: info.videoDetails.author.verified,
                    subscriber_count: getNumber(info.videoDetails.author.subscriber_count.toString()),
                    subscriber_count_text: getNumberText(info.videoDetails.author.subscriber_count),
                    video_url: video_url,
                    publish_date: info.videoDetails.publishDate,
                    description: info.videoDetails.description,
                    view_count: getNumber(info.videoDetails.viewCount),
                    view_count_text: getNumberText(info.videoDetails.viewCount),
                    keywords: info.videoDetails.keywords,
                    publish_date_compare: dayjs(info.videoDetails.publishDate).fromNow(),
                });
                const songId = await songModel.findOne({
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
});

router.post('/add-album', async (req, res) => {
    try {
        // lấy data từ client
        const video_url = req.body.video_url;
        const userId = req.headers.userid;

        // Check List-Video URL
        if (video_url.length !== 28) return res.status(500).send('không đúng dạng url youtube');

        // Check User trong DB
        const user = await userModel.findById(userId);
        if (!user) return res.status(404);

        // Check URL Video trong data
        const video = await songModel.findOne({ video_url: video_url }).lean();

        // Get data by Youtube URL
        if (!video) {
            await ytdl.getInfo(video_url).then(async (info) => {
                // Check Empty Data URL
                if (!info) return res.status(500).send('link lỗi!');

                // Add Song and Save to Database
                await songModel.create({
                    channel: info.videoDetails.author.name,
                    channel_avatar: info.videoDetails.author.thumbnails[2].url,
                    channel_url: info.videoDetails.author.user_url,
                    title: info.videoDetails.title,
                    title_normalize: removeAccents(info.videoDetails.title),
                    thumbnail_url: info.videoDetails.thumbnails[3].url,
                    verified: info.videoDetails.author.verified,
                    subscriber_count: info.videoDetails.author.subscriber_count,
                    subscriber_count_text: getNumberText(info.videoDetails.author.subscriber_count),
                    video_url: video_url,
                    publish_date: info.videoDetails.publishDate,
                    description: info.videoDetails.description,
                    view_count: getNumber(info.videoDetails.viewCount),
                    view_count_text: getNumberText(info.videoDetails.viewCount),
                    keywords: info.videoDetails.keywords,
                    publish_date_compare: dayjs(
                        info.videoDetails.publishDate,
                    ).fromNow(),
                });
                const songId = await songModel.findOne({
                    video_url: video_url,
                });

                user.songs.push(songId._id);
                user.save();
                return res.status(200).send(user);
            });
        } else if (user && video) {
            if (user.songs.includes(video._id))
                return res.status(401);
            else {
                user.songs.push(video._id);
                user.save();
                res.status(201)
            }
        } else res.send('error');
    } catch (error) {
        console.log(error);
        res.send('Error!');
    }
});










module.exports = router;
