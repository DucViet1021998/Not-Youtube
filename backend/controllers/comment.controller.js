const CommentModel = require('../Models/comment.model')
module.exports = {

    // [Post METHOD]  
    // Create user comment and save to DB
    async comment(req, res) {
        try {
            const cmt = req.body.comment
            await CommentModel.create({
                songs: req.body.songId,
                users: req.user._id,
                comment: cmt
            })
            res.sendStatus(200)

        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    // [GET METHOD]  
    // Read comments from database 
    async readComment(req, res) {
        try {
            const cmt = await CommentModel.find({ songs: req.headers.songid })
                .lean()
                .populate(['users', 'songs'])
            res.status(200).send(cmt)
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    // [POST METHOD]  
    // Toggle user like  
    async likeComment(req, res) {
        try {
            const cmt = await CommentModel.findById(req.body.cmt)
            if (cmt.likes.includes(req.user._id)) {
                cmt.likes.remove(req.user._id)
                cmt.save()
                return res.sendStatus(200)
            } else {
                cmt.likes.unshift(req.user._id);
                cmt.save();
                return res.sendStatus(202)
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(400);
        }
    },

    // [POST METHOD]  
    // Toggle user dislike  
    async dislikeComment(req, res) {
        try {
            const cmt = await CommentModel.findById(req.body.cmt)
            if (cmt.dislikes.includes(req.user._id)) {
                cmt.dislikes.remove(req.user._id)
                cmt.save()
                return res.sendStatus(200)
            } else {
                cmt.dislikes.unshift(req.user._id);
                cmt.save();
                return res.sendStatus(202)
            }

        } catch (error) {
            console.log(error);
            res.sendStatus(400);
        }
    },

}
