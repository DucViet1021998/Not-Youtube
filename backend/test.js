// const axios = require('axios')
const dayjs = require('dayjs')
const ytdl = require('ytdl-core');
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

ytdl.getInfo('https://youtu.be/mnBAZ-VkuEg').then(info => {
    // console.log('rating:', info.player_response.videoDetails.averageRating);
    // console.log('uploaded by:', info.videoDetails.author.name);

    // console.log(info.videoDetails.find(thumb => thumb.incluse('width: 1920')));


    // const des = info.videoDetails.description
    // des.replaceAll('/n', '<br/>')
    // console.log(info.videoDetails);
    console.log(dayjs(info.videoDetails.publishDate).fromNow());
});
// const getSongs = async () => {
//     const data = await axios.default.get('https://youtu.be/fyMgBQioTLo')

//     console.log(data.data);
// }
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

// function changeLineBreak(p) {
//     return console.log(p.replaceAll('/n', '<br/>'))

// }

// text = "Sài Gòn Đau Lòng Quá | Hứa Kim Tuyền x Hoàng Duyên | (Official MV 4k)\n#SaiGonDauLongQua #HuaKimTuyen #HoangDuyen #SGDLQ #YinYangMedia\n\nTikTok Version: https://vt.tiktok.com/ZSJ2va8qt/\n\nLanding page: https://YYM.lnk.to/SGDLQ\nDirect to service:\nSpotify: https://YYM.lnk.to/SGDLQ/spotify\nApple Music: https://YYM.lnk.to/SGDLQ/applemusic\niTunes: https://YYM.lnk.to/SGDLQ/itunes\nNCT: https://YYM.lnk.to/SGDLQ<br/>ct\nKeeng: https://YYM.lnk.to/SGDLQ/keeng\n\nPRODUCED BY DREAMS PRODUCTIONS, THE RED NOTE ENTERTAINMENT\n\nMusic Composer: Hứa Kim Tuyền\nMusic Producer: Hứa Kim Tuyền\nMusic Arranger: Hoàng Bảo\nRecorder: The Mask Production\nMix & Master: Minh Dat Nguyen\nStarring: Ma Ran Đô\n\nDirector: Gin Trần\nArt Director : Nachi Khang\nProducer: Kan Nguyễn\nAssistant Director: Nhỏ Xíu\n2nd Assistant Director: Sơn Trương\nSet Design: Basic Decor\nArtist Assistant: Huy Phờ, Vũ Đức Huy\nProduction Assistant : Huy Phờ\n\nDirector of Media Planning: Nguyễn Việt Nữ\nSocial Executive: Huy Phờ\nPR Assistan"

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
//     page: 'default'

// }

// ytrend.scrapeTrendingPage(parameters).then((data) => {
//     const newData = data.map(song => ({
//         title: song.title,
//         channel: song.author,
//         channel_url: `https://www.youtube.com/${song.authorUrl}`,
//         description: song.description,
//         verified: song.isVerified,
//         view_count: getNumber(song.viewCount.toString()),
//         published_text: song.publishedText,
//         thumbnail_url: song.videoThumbnails[1].url,
//         verified_artist: song.isVerifiedArtist,
//         video_url: `https://youtu.be/${song.videoId}`
//     }))

//     console.log(newData);

// }).catch((error) => {
//     console.error(error);
// });
