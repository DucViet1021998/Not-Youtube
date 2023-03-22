const SongModel = require('../Models/song.model')


module.exports = {

    // [Post METHOD]  
    // Search keywords from DB
    async search(req, res) {
        const search = req.body.search.toLowerCase();

        try {
            // Find all keyword song results from DB
            const song = await SongModel.aggregate([
                [
                    {
                        '$match': {
                            'keywords': {
                                '$regex': search
                            }
                        }
                    }, {
                        '$addFields': {
                            'name': 'group'
                        }
                    }, {
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
            ])

            // Check empty keywords
            if (!song.length) return res.sendStatus(400)

            // Get all song keywords from database     
            const keywords = song[0].keywords


            // loop to get search value in song keywords
            function filterItems(arr, query) {
                return arr.filter((el) =>
                    el.toLowerCase().includes(query.toLowerCase()),
                );
            }

            // Check double property song keywords
            function unique(arr) {
                var newArr = []
                newArr = arr.filter(function (item) {
                    return newArr.includes(item) ? '' : newArr.push(item)
                })
                return newArr
            }
            const result = filterItems(keywords, search);
            res.send(unique(result))

        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    // [GET METHOD]  
    // Read keywords from DB
    async searchText(req, res) {
        const search = req.params.searchText;
        try {
            const song = await SongModel.find({ keywords: { $regex: `${search}` } })
            res.send(song);

        } catch (error) {
            console.log(error);
            res.send('Error!');
        }

    },


}