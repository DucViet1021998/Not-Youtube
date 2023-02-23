const express = require('express')
const app = express()
const router = express.Router()
const songModel = require('./Models/songModel')
const ytdl = require('ytdl-core');
const cors = require('cors')

const userModel = require('./Models/UserModel')


app.use(cors())
app.use(express.json())

function getNumberText(num) {
    if (num.length >= 0 && num.length < 4) {
        return num
    } else if (num.length >= 4 && num.length < 7) {
        const newNum = num.slice(0, -3);
        const textNum = `${newNum}K`
        return textNum
    }
    else if (num.length >= 7 && num.length < 10) {
        const newNum = num.slice(0, -6);
        const textNum = `${newNum}M`
        return textNum
    } else if (num.length >= 10 && num.length < 13) {
        const newNum = `${num.slice(0, -9)},${num.slice(1, -8)}`;
        const textNum = `${newNum}B`
        return textNum
    }
}



router.post('/add-song', async (req, res) => {
    try {
        // Check List-Video URL 
        const video_url = req.body.video_url
        if (video_url.length == 47) return res.status(500).send(' không add list bài hát ')

        // Get data by Youtube URL 
        await ytdl.getInfo(video_url).then(async (info) => {

            console.log(typeof (info.videoDetails.subscriber_count));

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
                    thumbnail_url: info.videoDetails.thumbnails[3].url,
                    verified: info.videoDetails.author.verified,
                    subscriber_count: info.videoDetails.author.subscriber_count,
                    subscriber_count_text: getNumberText(info.videoDetails.author.subscriber_count.toString()),
                    video_url: video_url,
                    publish_date: info.videoDetails.publishDate,
                    description: info.videoDetails.description,
                    view_count: info.videoDetails.viewCount,
                    view_count_text: getNumberText(info.videoDetails.viewCount),
                })
                return res.sendStatus(200)
            } else {
                return res.status(200).send("Đã có trong database trước đó")
            }
        });

    }
    catch (error) {
        console.log(error);
        res.send("Error!")
    }
})

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





router.get("/test", async (req, res) => {
    try {

        const user = await userModel.findOne({ username: 'viet' }).populate(['songs'])

        res.send(user)

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





module.exports = router
