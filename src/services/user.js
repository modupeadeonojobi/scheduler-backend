const User = require("../models/user");
const bcrypt = require('bcryptjs')
const response = require('../helpers/function')

const createUser = async(result, res) => {
    const {name, email, password, gender} = result

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name: name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: await encryptedPassword,
        gender: gender,
    })

    if (user) {
        const { password, ...responseUser } = user._doc;
        return response(res, 200, responseUser)
    }
}


const loginUser = (user, res) => {
    const { _id, password, ...userDetails } = user._doc

    return response(res, 200, userDetails)
}


const getUsers = async(res) => {
    try {
        const users = await User.find();
        response(res, 200, users)
    } catch (error) {
        response(res, 404, {
            message: 'An error occurred. Please try again',
            error:  error.message,
            statusCode: 404
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    getUsers
}