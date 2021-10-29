const { getRequestBody } = require('../helpers/function')
const { USER_EXISTS, INVALID_REQUEST_BODY } = require('../helpers/variables')

const UserController = (serviceContainer, response) => {

    // @desc    Create New User
    // @route   POST /api/user/register
    async function createUser(req, res) {
        try {
            const userData = await getRequestBody(req)
    
            // Get user input
            const { name, email, password, gender } = userData
            
            // Validate user input
            if (!(name && email && password && gender)) throw new Error(INVALID_REQUEST_BODY)
    
            // check if user already exist
            // Validate if user exist in our database
            const newUser = await serviceContainer.UserService.checkIfExistingUser(email)

            // register user
            if (newUser) {
                const user = await serviceContainer.UserService.registerUser(userData)
                response(res, 200, user)
            }
          
        } catch (error) {
            if (error.message === USER_EXISTS || INVALID_REQUEST_BODY) {
                statusCode = 400
                response(res, statusCode, {
                    error:  error.message,
                })
            } else {
                statusCode = 404
                response(res, statusCode, {
                    error:  error.message,
                })
            }

        }
    }
    
    
    // @desc    Login User
    // @route   POST /api/user/login
    async function loginUser(req, res) {
    
        try {
            const userData = await getRequestBody(req)
    
            // Get user input
            const { email, password } = userData;
    
            // Validate user input
            if (!(email && password)) {
                throw new Error(INVALID_REQUEST_BODY)

            } else {
    
                // Validate if user exist in our database and password
                const user = await serviceContainer.UserService.validateCredentials(email, password)
                console.log('i got here', user)
                if (user) {
                    response(res, 200, user)
                }
            }

        } catch (error) {
            if (error.message === INVALID_REQUEST_BODY) {
                statusCode = 400
                response(res, statusCode, {
                    error:  error.message,
                })
            } else {
                statusCode = 404
                response(res, statusCode, {
                    error:  error.message,
                })
            }
        }
    }
    
    // @desc    Get all users
    // @route   GET /api/users
    async function getUsers(res) {
        try {
            const users = await serviceContainer.UserService.getUsers()
            response(res, 200, users)

        } catch (error) {
            response(res, 404, {
                message: 'An error occurred. Please try again',
                error:  error.message,
                statusCode: 404
            })
        }
    }

    return {
        createUser,
        loginUser,
        getUsers
    }
}

module.exports = UserController