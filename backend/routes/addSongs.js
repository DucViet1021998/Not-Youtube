const express = require('express')
const router = express.Router()
const addSongsController = require('../controllers/addSongs.controller')


router.post('/add-song', addSongsController.addSongs)
router.post('/add-album', addSongsController.addAlbumUser)


module.exports = router
