const createUser = require('./createUser')
const loginUser = require('./loginUser')
const getUsers = require('./getUsers')

const ContainerService = () => {
    return {
        createUser: createUser,
        loginUser: loginUser,
        getUsers: getUsers
    }
}

module.exports = ContainerService