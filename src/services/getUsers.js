const User = require("../models/user");
const response = require('../helpers/function')

const getUsers = async(res) => {
    const users = await User.find();
    response(res, 200, users)
}

module.exports = getUsers