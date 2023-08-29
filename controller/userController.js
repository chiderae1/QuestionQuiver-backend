const { findOne } = require('../model/AuthSchema');
const model = require('../model/userSchema')


const getExam = async (req,res) => 
{
    try{
        //  get unique Exam_names from database
        const retrieve = await model.aggregate([{ $group: { _id: '$Exam_name' } }]); 
        //  get the Exam_name alone without the id
        const uniqueExamNames = [...new Set(retrieve.map(exam => exam._id))];
        //  send the exam names to the frontend
        res.status(200).json(uniqueExamNames)
    }catch(error)
    {
        // send error if any
        res.status(400).json({error: "couldn't retieve data from database"})
    }
    
}

const getQuestion = async (req,res) => 
{
    // get exam name from frontend
    const {ExamName} = req.body
    try{
        // retrieve all the question with exam name
        const retrieve = await model.find({Exam_name: { $eq: ExamName }})
        const time = await model.findOne({Exam_name : ExamName})
         // send back all the questions to frontend
        res.status(200).json({Questions : retrieve, time : time.time})
        
    }catch(error)
    {
        // send error if any be
        res.status(400).json({error:error.message})
    }
}


const markQuestion = (req,res) => 
{
    // get the answers with the question id from the frontned
    const selectedValue = req.body

    if(Object.keys(selectedValue).length === 0)
    {
        return res.status(200).json({score : 0})
    }
    // convert them to array so you can loop them one by one
    const entries = Object.entries(selectedValue);
    // get the length of the object in order to beat the asynchronous trap
    let len = entries.length
    
    // initialize value of score that would be incremented
    score = 0
    
    try{
        // loop through the converted array
         entries.forEach(async([key, value]) => {
            // find the answer of the question id
            const retrieve = await model.findById(key).select('answer')
            // check if the answer of the question id is same as user anwser
            if(retrieve.answer === value)
            {
                // if true increment score
                score += 1
            }

            // reduce the lenght of the array to show the array has completed exuction 
            // that is the array has finished looping through the id and value

            len -= 1
            // when the array has finsih looping thorugh then send back a response to the frontend
            // that's how the asynchronous was defeated

            if(len === 0)
            {                
                res.status(200).json({'score' : score,'submitted' : true})
            }
          });
    }catch(error)
    {
        res.status(400).json({error:error.message})
    }
}


module.exports = {getExam,getQuestion,markQuestion}