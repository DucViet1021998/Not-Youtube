const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment.controller')

const authenticateToken = require('../helpers/authenticateToken')


router.post('/comment', authenticateToken, commentController.comment)
router.get('/comment-songId', commentController.readComment)

module.exports = router
