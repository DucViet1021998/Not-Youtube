const express = require('express')
const router = express.Router()
const searchController = require('../controllers/search.controller')


router.post('/search', searchController.search)
router.get('/search/:searchText', searchController.searchText)

router.post('/dashboard/search', searchController.DBsearch)
router.get('/dashboard/search/:searchText', searchController.BDSearchText)


module.exports = router
