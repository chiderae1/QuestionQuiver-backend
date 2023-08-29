const mongoose = require('mongoose')

const schema = mongoose.Schema

const Question = new schema(
    {
        Question:
        {
            type: String,
            required : true
        },
        option1:
        {
            type : String,
            required : true
        },
        option2:
        {
            type : String,
            required : true
        },
        option3:
        {
            type : String,
            required : true
        },
        option4:
        {
            type : String,
            required : true
        },
        answer:
        {
            type : String,
            required: true
        },
        Exam_name:
        {
            type : String,
            required : true
        },
        time:
        {
            type : Number,
            required : true
        }
    },  {timestamps: true}
)

module.exports = mongoose.model('IleriNode',Question)