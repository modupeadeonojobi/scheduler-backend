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

module.exports = createUser