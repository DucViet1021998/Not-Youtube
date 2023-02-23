

const ytdl = require('ytdl-core');


ytdl.getInfo('https://youtu.be/tRCuw8iZJPQ').then(info => {
    // console.log('rating:', info.player_response.videoDetails.averageRating);
    // console.log('uploaded by:', info.videoDetails.author.name);

    // console.log(info.videoDetails.find(thumb => thumb.incluse('width: 1920')));


    // const des = info.videoDetails.description
    // des.replaceAll('/n', '<br/>')
    console.log(info.videoDetails);
});


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
