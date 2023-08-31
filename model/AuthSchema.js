const mongoose = require('mongoose')
const { default: validator } = require('validator')
const bcrypt = require('bcrypt')


const schema = mongoose.Schema

const Auth = new schema(
    {
        email:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        },
        username:
        {
            type: String
        }
    })

Auth.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('please fill all fields')
    }

    if (validator.isEmail(email)) {
        const user = await this.findOne({ email })

        if (!user) {
            throw Error('incorrect email or password')
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error('incorrect email or password')
        }

        const retrieve = 
        {
            username : user.username,
            Email : user.email,
            id : user._id
        }

        return retrieve
    }

    if(!validator.isEmail(email))
    {
        const user = await this.findOne({username: { $eq: email }})
        if (!user) {
            throw Error('incorrect email or password')
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error('incorrect email or password')
        }

        const retrieve = 
        {
            username : user.username,
            Email : user.email,
            id : user._id
        }
        return retrieve
    }
}



Auth.statics.signup = async function (email, password, username) {

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const numberRegex = /\d/;

    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasSymbol = symbolRegex.test(password);
    const hasNumber = numberRegex.test(password);

    if (!email || !password || !username) {
        throw Error('please fill all fields')
    }

    const exist = await this.findOne({ email })

    if (exist) {
        throw Error('user already exist')
    }

    const valid = await this.findOne({ username })
    if (valid) {
        throw Error('username taken')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is invalid')
    }

    if (password.length < 8) {
        throw Error('password must be at least 8 characters!')
    }
    if (!hasUppercase) {
        throw Error('password must contain at least an uppercase!')
    }
    if (!hasLowercase) {
        throw Error('password must contain at least a lowercase')
    }
    if (!hasSymbol) {
        throw Error('password must contain at least a symbol')
    }
    if (!hasNumber) {
        throw Error('password must contain at least a number')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, username, password: hash })

    return user
}

module.exports = mongoose.model('QuestionQuiverAuth', Auth)