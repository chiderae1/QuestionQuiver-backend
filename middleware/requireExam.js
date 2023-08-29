// const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

const requireExam = async (req, res, next) => {
  // verify Exam is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Exam name required'})
  }

  const ExamName = authorization.split(' ')[1]
//   console.log(token)
//   console.log(ExamName)
  try {
    // const { _id } = jwt.verify(token, process.env.SECRET)
    // req.user = await User.findOne({ ExamName }).select('Exam_name')
    req.user = ExamName
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireExam