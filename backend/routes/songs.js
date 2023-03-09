const express = require('express')
const router = express.Router()
const songsController = require('../controllers/songs.controller')


router.get('/get-songs', songsController.getAllSongs)
router.get('/trending/:type', songsController.trending)
router.get('/watch/:songid', songsController.watchPage)
router.get('/dashboard/watch/:songid', songsController.watchDashboardPage)
router.patch('/update', songsController.update)

module.exports = router