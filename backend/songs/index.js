const express = require('express')
const router = express.Router()
const ytdl = require('ytdl-core');
const ytrend = require("@freetube/yt-trending-scraper")
const songModel = require('../Models/SongModel')
const userModel = require('../Models/UserModel')


function removeAccents(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .toLowerCase();
}


function getNumberText(num) {
    if (num.length >= 0 && num.length < 4) {
        return num
    } else if (num.length >= 4 && num.length < 7) {
        const newNum = num.slice(0, -3);
        const textNum = `${newNum} N`
        return textNum
    }
    else if (num.length >= 7 && num.length < 10) {
        const newNum = num.slice(0, -6);
        const textNum = `${newNum} Tr`
        return textNum
    } else if (num.length >= 10 && num.length < 13) {
        const newNum = `${num.slice(0, -9)},${num.slice(1, -8)}`;
        const textNum = `${newNum} Tỷ`
        return textNum
    }
}
function getNumber(num) {
    if (num.length >= 0 && num.length <= 3) {
        console.log(num);
    }
    else if (num.length >= 4 && num.length < 7) {
        const newNum = num.slice(0, -3) + ',' + num.slice(-3);
        return newNum;
    }
    else if (num.length >= 7 && num.length < 10) {
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


router.post('/add-song', async (req, res) => {
    try {

        // Check List-Video URL 
        const video_url = req.body.video_url
        if (video_url.length !== 28) return res.status(500).send('không add list bài hát')

        // Get data by Youtube URL 
        await ytdl.getInfo(video_url).then(async (info) => {

            // Check Empty Data URL 
            if (!info) return res.sendStatus(500);

            const findUrl = await songModel.findOne({ video_url: video_url })


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
                    subscriber_count: info.videoDetails.author.subscriber_count,
                    subscriber_count_text: getNumberText(info.videoDetails.author.subscriber_count.toString()),
                    video_url: video_url,
                    publish_date: info.videoDetails.publishDate,
                    description: info.videoDetails.description,
                    view_count: getNumber(info.videoDetails.viewCount),
                    view_count_text: getNumberText(info.videoDetails.viewCount),
                    keywords: info.videoDetails.keywords,

                })
                const songId = await songModel.findOne({ video_url: video_url })

                return res.status(200).send(songId)
            } else {
                return res.status(400).send(findUrl)
            }
        });

    }
    catch (error) {
        console.log(error);
        res.send("Error!")
    }
})



router.post("/add-album", async (req, res) => {
    try {
        // lấy data từ client
        const video_url = req.body.video_url
        const userId = req.headers.userid

        // Check List-Video URL 
        if (video_url.length !== 28) return res.status(500).send('không đúng dạng url youtube')

        // Check User trong DB
        const user = await userModel.findById(userId);
        if (!user) return res.status(404)

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
                    subscriber_count_text: getNumberText(info.videoDetails.author.subscriber_count.toString()),
                    video_url: video_url,
                    publish_date: info.videoDetails.publishDate,
                    description: info.videoDetails.description,
                    view_count: getNumber(info.videoDetails.viewCount),
                    view_count_text: getNumberText(info.videoDetails.viewCount),
                    keywords: info.videoDetails.keywords,
                })
                const songId = await songModel.findOne({ video_url: video_url })

                user.songs.push(songId._id)
                user.save();
                return res.status(200).send(user)

            })
        } else if (user && video) {
            if (user.songs.includes(video._id)) return res.status(401).send('da co trong DB')
            else {
                user.songs.push(video._id)
                user.save();
                res.status(201).send(user)
            }

        } else res.send('error')

    } catch (error) {
        console.log(error);
        res.send('Error!')
    }
});




router.get("/get-songs", async (req, res) => {
    try {
        const songs = await songModel.find({}).lean();
        songs.sort(() => (Math.random() > .5) ? 1 : -1);
        res.status(200).send(songs);

    } catch (error) {
        console.log(error);
        res.send('Error!')
    }
});


router.get("/trending/:type", async (req, res) => {
    try {

        const parameters = {
            geoLocation: 'VN',
            parseCreatorOnRise: false,
            page: req.params.type
        }

        ytrend.scrapeTrendingPage(parameters).then((data) => {
            const newData = data.map(song => ({
                title: song.title,
                channel: song.author,
                channel_url: `https://www.youtube.com/${song.authorUrl}`,
                description: song.description,
                verified: song.isVerified,
                view_count: getNumber(song.viewCount.toString()),
                view_count_text: getNumberText(song.viewCount.toString()),
                published_text: song.publishedText,
                thumbnail_url: song.videoThumbnails[1].url,
                verified_artist: song.isVerifiedArtist,
                video_url: `https://youtu.be/${song.videoId}`
            }))
            res.status(200).send(newData);

        }).catch((error) => {
            console.error(error);
        });




    } catch (error) {
        console.log(error);
        res.send('Error!')
    }
});







router.get("/watch/:songid", async (req, res) => {
    try {
        const songs = await songModel.findById(req.params.songid);
        res.status(200).send(songs);

    } catch (error) {
        console.log(error);
        res.send('Error!')
    }
});


router.get("/dashboard/watch/:songid", async (req, res) => {
    try {
        const songs = await songModel.findById(req.params.songid);
        res.status(200).send(songs);

    } catch (error) {
        console.log(error);
        res.send('Error!')
    }
});
router.patch("/test", async (req, res) => {
    try {
        const data = await songModel.find({})
        const dada = data.map(e => ({ video: ytdl.getInfo(e.video_url).then(info => info.videoDetails.viewCount) }))
        console.log(dada);
        res.send('ok')

    } catch (error) {
        console.log(error);
        res.send('Error!')
    }


})



module.exports = router
