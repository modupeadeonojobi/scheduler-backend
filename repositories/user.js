const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { INVALID_CREDENTIALS } = require('../helpers/variables')

const UserRepository = () => {

    const createUser = async userData => {
        const { name, email, password, gender } = userData

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: await encryptedPassword,
            gender: gender,
        })

        // remove password field
        if (user) {
            const { password, ...responseUser } = user._doc;
            return  responseUser
        } else {
            throw new Error('blaablaa')
        }
    }

    const checkUserExistsRegister = async email => {
        const oldUser = await User.findOne({ email })
        return oldUser
    }

    const checkUserExistsLogin = async email => {
        const user = await User.findOne({ email }).select('+password')
        return user
    }

    const validatePassword = async(user, password) => {
        const isValid = await bcrypt.compare(password, user.password)

        if (isValid) {
            const { _id, password, ...userDetails } = user._doc
            return userDetails
        } else {
            throw new Error(INVALID_CREDENTIALS)
        }
    }

    const fetchUsers = async() => {
        const users = await User.find()
        return users
    }

    return {
        createUser,
        checkUserExistsRegister,
        checkUserExistsLogin,
        validatePassword,
        fetchUsers
    }
}

module.exports = UserRepository()