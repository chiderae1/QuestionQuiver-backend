const express = require('express');
const {getleaderboard,leaderboard,filterleadboard } = require('../controller/LeadController')

const route = express.Router()

route.post('/test/post/leaderboard',leaderboard)
route.post('/test/retrieve/leadboard',getleaderboard)
route.post('/test/check/leadboard',filterleadboard)

module.exports = route