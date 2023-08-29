const express = require('express')
const {Login,Signup} = require('../controller/AuthController')

const route = express.Router()

route.post('/login',Login)
route.post('/signup',Signup)

module.exports = route