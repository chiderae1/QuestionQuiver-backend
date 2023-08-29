const jwt = require('jsonwebtoken')
const Auth = require('../model/AuthSchema')

const createToken = (_id) => 
{
    jwt.sign({_id},process.env.SECRETE,{expiresIn : '2d'})

}
const Login = async (req,res) =>
{
    const {email,password} = req.body
    try
    {
        const {username,Email,id} = await Auth.login(email,password)
        const token = createToken(id)
        res.status(200).json({username,Email,token})
    }catch(error)
    {   
        res.status(400).json({error: error.message})
    }
    
}

const Signup = async (req,res) =>
{
    const {email,password,username} = req.body

    try
    {
        const user = await Auth.signup(email,password,username)
        const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch(error)
    {
        res.status(400).json({error: error.message})
    }
}

module.exports = {Login,Signup}