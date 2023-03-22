const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment.controller')

const authenticateToken = require('../helpers/authenticateToken')

router.post('/comment', authenticateToken, commentController.comment)
router.get('/comment-songId', commentController.readComment)
router.post('/like-comment', authenticateToken, commentController.likeComment)
router.post('/dislike-comment', authenticateToken, commentController.dislikeComment)



module.exports = router
