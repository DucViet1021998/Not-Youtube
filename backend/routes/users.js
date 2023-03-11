const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')
const multer = require('multer');
const ImgurStorage = require('multer-storage-imgur');

const authenticateToken = require('../helpers/authenticateToken')

const upload = multer({
    storage: ImgurStorage({ clientId: '51f37a263f2fa7c' }),
});


router.post('/register', upload.any('avatar'), usersController.register)
router.post('/login', usersController.login)
router.get('/current-user', authenticateToken, usersController.getUser)
router.post('/refresh-token', usersController.refreshToken)
router.post('/logout', usersController.logout)
router.get('/user-songs', usersController.userSongs)
router.get('/user-songs/notify', usersController.userSongsNotify)

module.exports = router