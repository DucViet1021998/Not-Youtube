// const axios = require('axios')
const ytdl = require('ytdl-core');
const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

ytdl.getInfo('https://youtu.be/JZ8iSNtMPE0').then((info) => {
    console.log(typeof (info.videoDetails.viewCount));
    // });
    // const getSongs = async () => {
    //     const data = await axios.default.get('https://youtu.be/fyMgBQioTLo')

    //     console.log(data.data);
});
// const fs = require('fs');
// const ytdl = require('ytdl-core');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

// ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
//     .pipe(fs.createWriteStream('video.mp4'));
// let info = ytdl.getVideoID("https://youtu.be/PXyXzHIZlBo");
// let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
// console.log('Formats with only audio: ' + audioFormats.length)
// console.log(info);

// getSongs()

// const route = async ctx => {
//     const spanish = await translate(ctx.body, { to: "vi" });
//     return send(spanish);
// };
// route('hello')

// (async () => {
//     const text = await translate("Hello world", "es")
// })()

// function changeLineBreak(p) {
//     return console.log(p.replaceAll('/n', '<br/>'))

// }


// changeLineBreak(text)

// function getNumberText(num) {
//     if (num.length >= 0 && num.length < 4) {
//         return num
//     } else if (num.length >= 4 && num.length < 7) {
//         const newNum = num.slice(0, -3);
//         const textNum = `${newNum}K`
//         return textNum
//     }
//     else if (num.length >= 7 && num.length < 10) {
//         const newNum = num.slice(0, -6);
//         const textNum = `${newNum}M`
//         return textNum
//     } else if (num.length >= 10 && num.length < 13) {
//         const newNum = `${num.slice(0, -9)},${num.slice(1, -8)}`;
//         const textNum = `${newNum}B`
//         return textNum
//     }
// }

// function getNumberText2(num) {
//     if (num.length >= 0 && num.length < 4) {

//         return num
//     } else if (num.length >= 4 && num.length < 7) {
//         const newNum = num.slice(0, -3);
//         const newNumber = num.charAt(-3)
//         const textNum = `${newNum}K`
//         return textNum
//     }
//     else if (num.length >= 7 && num.length < 10) {
//         const newNum = num.slice(0, -6);
//         const textNum = `${newNum}M`
//         return textNum
//     } else if (num.length >= 10 && num.length < 13) {
//         const newNum = `${num.slice(0, -9)},${num.slice(1, -8)}`;
//         const textNum = `${newNum}B`
//         return textNum
//     }
// }

// console.log(getNumberText("7200000000"));
// function getNumberText(num) {
//     if (num.length >= 0 && num.length <= 3) {
//         console.log(num);
//     }
//     else if (num.length >= 4 && num.length < 7) {
//         const newNum = num.slice(0, -3) + ',' + num.slice(-3);
//         console.log(newNum);
//     }
//     else if (num.length >= 7 && num.length < 10) {
//         const newNum = num.slice(0, -3) + ',' + num.slice(-3);
//         const newNum2 = newNum.slice(0, -7) + ',' + newNum.slice(-7);

//         console.log(newNum2);

//     } else if (num.length >= 10 && num.length < 13) {
//         const newNum = num.slice(0, -3) + ',' + num.slice(-3);
//         const newNum2 = newNum.slice(0, -7) + ',' + newNum.slice(-7);
//         const newNum3 = newNum2.slice(0, -11) + ',' + newNum2.slice(-11);

//         console.log(newNum3);

//     }
// }

// getNumberText("124145434334")
// function getNumber(num) {
//     if (num.length >= 0 && num.length <= 3) {
//         console.log(num);
//     }
//     else if (num.length >= 4 && num.length < 7) {
//         const newNum = num.slice(0, -3) + ',' + num.slice(-3);
//         return newNum;
//     }
//     else if (num.length >= 7 && num.length < 10) {
//         const newNum = num.slice(0, -3) + ',' + num.slice(-3);
//         const newNum2 = newNum.slice(0, -7) + ',' + newNum.slice(-7);
//         return newNum2;
//     } else if (num.length >= 10 && num.length < 13) {
//         const newNum = num.slice(0, -3) + ',' + num.slice(-3);
//         const newNum2 = newNum.slice(0, -7) + ',' + newNum.slice(-7);
//         const newNum3 = newNum2.slice(0, -11) + ',' + newNum2.slice(-11);
//         return newNum3;
//     }
// }

// const ytrend = require("@freetube/yt-trending-scraper")
// const parameters = {
//     geoLocation: 'VN',
//     parseCreatorOnRise: false,
//     page: 'music'

// }

// // ytrend.scrapeTrendingPage(parameters).then((data) => {
// console.log(data[0].published.length);
// console.log(dayjs(data[0].published).$d);
// const day = dayjs(data[0].published).$d
// console.log(data[0].published);
// console.log(Date());
// console.log(data[0]);
// console.log(dayjs(1678172005967).fromNow());

// const newData = data.map(song => ({
//     title: song.title,
//     channel: song.author,
//     channel_url: `https://www.youtube.com/${song.authorUrl}`,
//     description: song.description,
//     verified: song.isVerified,
//     // view_count: getNumber(song.viewCount.toString()),
//     published_text: song.publishedText,
//     thumbnail_url: song.videoThumbnails[1].url,
//     verified_artist: song.isVerifiedArtist,
//     video_url: `https://youtu.be/${song.videoId}`
// }))

// console.log(newData);

// }).catch((error) => {
//     console.error(error);
// });
