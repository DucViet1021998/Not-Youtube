const express = require('express');
const router = express.Router();
const songModel = require('../../Models/SongModel');

router.post('/search', async (req, res) => {
    // Get Request from client
    const search = req.body.search.toLowerCase();

    try {
        // Find all song results from Database
        const song = await songModel.find({
            keywords: { $regex: `${search}` },
        });

        // Loop to get all song keywords from song results
        const songKeywords = song.map((e) => {
            return e.keywords;
        });

        // loop to get search value in song keywords
        function filterItems(arr, query) {
            return arr.filter((el) =>
                el.toLowerCase().includes(query.toLowerCase()),
            );
        }
        const result = filterItems(songKeywords.flat(), search);

        if (result.length > 10) {
            result.sort(() => (Math.random() > 0.5 ? 1 : -1));
            const tenResult = result.splice(0, 10);
            res.send(tenResult);
        } else res.send(result);
    } catch (error) {
        console.log(error);
        res.send('Error!');
    }
});

router.get('/search/:search', async (req, res) => {
    const search = req.params.search;
    try {
        const song = await songModel.find({
            keywords: { $regex: `${search}` },
        });

        res.send(song);
    } catch (error) {
        console.log(error);
        res.send('Error!');
    }
});


router.post('/searchtest', async (req, res) => {
    // Get Request from client
    // return console.log(req.body.search);
    const search = req.body.search;

    try {
        // Find all song results from Database
        const song = await songModel.aggregate(
            [{
                $match: {
                    '$addFields': {
                        'name': 'group'
                    }
                }
            },
                , {
                '$group': {
                    '_id': null,
                    'group': {
                        '$push': '$keywords'
                    }
                }
            }, {
                '$project': {
                    'keywords': {
                        '$reduce': {
                            'input': '$group',
                            'initialValue': [],
                            'in': {
                                '$setUnion': [
                                    '$$value', '$$this'
                                ]
                            }
                        }
                    }
                }
            }
            ]
        );
        return console.log(song);
        // Loop to get all song keywords from song results
        // const songKeywords = song.map((e) => {
        //     return e.keywords;
        // });

        // loop to get search value in song keywords
        function filterItems(arr, query) {
            return arr.filter((el) =>
                el.toLowerCase().includes(query.toLowerCase()),
            );
        }
        const result = filterItems(songKeywords.flat(), search);

        if (result.length > 10) {
            result.sort(() => (Math.random() > 0.5 ? 1 : -1));
            const tenResult = result.splice(0, 10);
            res.send(tenResult);
        } else res.send(result);
    } catch (error) {
        console.log(error);
        res.send('Error!');
    }
});









module.exports = router;
