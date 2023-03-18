const express = require('express')
const router = express.Router()
const addSongsController = require('../controllers/addSongs.controller')


const authenticateToken = require('../helpers/authenticateToken')


router.post('/add-song', addSongsController.addSongs)
router.get('/add-album', authenticateToken, addSongsController.addAlbumUser)


module.exports = router
