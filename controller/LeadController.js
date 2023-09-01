const Authmodel = require('../model/AuthSchema')
const leadmodel = require('../model/LeadSchema')
const { default: validator } = require('validator')


const getleaderboard = async(req,res) =>
{
    const {ExamName} = req.body
    const retrieve = await leadmodel.find({Exam_name: { $eq: ExamName }}).sort({score : -1})
    
    try{
        res.status(200).json(retrieve)
    }catch(error){
        res.status(400).json({error: error.message})
    } 
}

// to create leaderboard
const leaderboard = async (req,res) => 
{
    // get's user score and ExamName from the frontend
    const {user,score,ExamName} = req.body
    
//    console.log(user)
    try{
        // find the username of the user
        const upload = await Authmodel.findOne({email:user}).select('username')
        const user_name = upload.username
        
        // to check if it already exist in the leaderboard
        const exist = await leadmodel.find({username : user_name,Exam_name :ExamName})
        
        // if it doesn't  
        if(exist.length === 0)
        {
              // create's the leaderboard
            await leadmodel.create({email:user,username: user_name,score,Exam_name: ExamName})
        }
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


// to check if user has done the Exam already
const filterleadboard = async(req,res) => 
{
    // get the usernane and Exam_name
    const {username,ExamName} = req.body
    try
    {
        // if user isn't logged in give user access
        if(username === null) {
            res.status(301).json({restricted : true})
        }

        // if user is logged in check
        if(username !== null){
            // the database if there's any array that continas both emial and Exam_name
            const search = await leadmodel.findOne({Exam_name: ExamName, email : username })
            // if there be any deny the user
            if(search)
            {
                // res.status(200).json(false)
                res.status(200).json({attempted : true})
            }
         
            // if there not be any give user access
            if(search === null)
            {
                res.status(200).json({Not_attempted : true})
            }
        }
        
    }catch(error){
        // send an error if there is one
        res.status(400).json({error: error.message})
    }
   

}

module.exports = {getleaderboard,leaderboard,filterleadboard}