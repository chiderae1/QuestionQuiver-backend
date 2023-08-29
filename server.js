require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const route = require('./route/userRoute')
const authRoute = require('./route/AuthRoute')
const leadRoute = require('./route/LeadRoute')

// database
mongoose.connect(process.env.dburl)
    .then(() => 
    {
        app.listen(process.env.PORT, (err) => 
        {
            if(err){
                console.log(err)
            }
        })
    })
    .catch(err => console.log(err))

// middle ware
app.use(express.json())

app.use((req,res,next)=>
{
    next()
})

app.use(cors())

// routes
app.use('/api/get',route)
app.use('/api/get',authRoute)
app.use('/api/get',leadRoute)