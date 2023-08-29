// import { Schema, model } from 'mongoose'
const {Schema, model} = require('mongoose')
const schema = Schema

const leadboard = new schema(
    {
        email:
        {
            type : String,
            required : true
        },
        username: 
        {
            type : String,
            required : true,
        },
        score : 
        {
            type : Number,
            required : true
        },
        Exam_name: 
        {
            type : String,
            required : true
        }
    },{timestamps : true}
)

module.exports =  model('LeaderBoards',leadboard);;