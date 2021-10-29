const userRepository = require('../repositories/user')
const { USER_EXISTS, INVALID_CREDENTIALS } = require('../helpers/variables')

const UserService = () => {
    const registerUser = (userData) => {
        const user = userRepository.createUser(userData)
        return user
    }

    
    const checkIfExistingUser = async(email) => {
        const user = await userRepository.checkUserExistsRegister(email)
        if (user === null) {
            const isNewUser = true
            return isNewUser
        } else {
            throw new Error(USER_EXISTS)
        }
    }


    const validateCredentials = async(email, password) => {
        const user = await userRepository.checkUserExistsLogin(email)
        
        if (user !== null) {
            const validatedUser = await userRepository.validatePassword(user, password)
            return validatedUser
            
        } else {
            throw new Error(INVALID_CREDENTIALS)
        }
        
    }
    
    
    const getUsers = async() => {
        const users = await userRepository.fetchUsers()
        return users
    }

    return {
        registerUser,
        checkIfExistingUser,
        validateCredentials,
        getUsers
    }
}


module.exports = UserService