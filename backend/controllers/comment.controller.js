const CommentModel = require('../Models/comment.model')

module.exports = {


    // [Post METHOD]  
    // Update information all Video in database
    async comment(req, res) {
        try {
            await CommentModel.create({
                songs: req.body.songId,
                users: req.user._id,
                comment: req.body.comment
            })
            res.sendStatus(200)
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    // [GET METHOD]  
    // Update information all Video in database
    async readComment(req, res) {
        try {
            const cmt = await CommentModel.find({ songs: req.headers.songid }).lean().populate(['users', 'songs'])
            res.status(200).send(cmt)
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

}
