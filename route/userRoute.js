const express = require('express');
const {getExam,getQuestion,markQuestion} = require('../controller/userController')


const route = express.Router()

route.get('/',getExam)
route.post('/test',getQuestion)
route.post('/test/score',markQuestion)

module.exports = route