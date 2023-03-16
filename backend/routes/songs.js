const express = require('express')
const router = express.Router()
const songsController = require('../controllers/songs.controller')

const authenticateToken = require('../helpers/authenticateToken')

router.get('/get-songs', songsController.getAllSongs)
router.get('/trending/:type', songsController.trending)
router.get('/watch/:songId', songsController.watchPage)
router.get('/dashboard/watch/:songId', songsController.watchDashboardPage)
router.patch('/update', songsController.update)
router.delete('/delete-song', authenticateToken, songsController.delete)

module.exports = router