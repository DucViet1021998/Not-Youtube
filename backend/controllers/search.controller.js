const SongModel = require('../Models/song.model')


module.exports = {
    async search(req, res) {
        const search = req.body.search.toLowerCase();

        try {
            // // Find all song results from Database
            // const song = await SongModel.aggregate([
            //     [
            //         {
            //             '$match': {
            //                 'keywords': {
            //                     '$regex': 'thi'
            //                 }
            //             }
            //         }, {
            //             '$addFields': {
            //                 'name': 'group'
            //             }
            //         }, {
            //             '$group': {
            //                 '_id': null,
            //                 'group': {
            //                     '$push': '$keywords'
            //                 }
            //             }
            //         }, {
            //             '$project': {
            //                 'keywords': {
            //                     '$reduce': {
            //                         'input': '$group',
            //                         'initialValue': [],
            //                         'in': {
            //                             '$setUnion': [
            //                                 '$$value', '$$this'
            //                             ]
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     ]
            // ])
            // console.log(song);
            // res.send(song.keywords)
            const song = await SongModel.find({
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
    },


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



    async DBsearch(req, res) {
        const search = req.body.search.toLowerCase();
        try {
            const song = await SongModel.find({
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
    },



    async BDSearchText(req, res) {
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