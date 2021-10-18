const response = require('../helpers/function')

const loginUser = (user, res) => {
    const { _id, password, ...userDetails } = user._doc

    return response(res, 200, userDetails)
}

module.exports = loginUser