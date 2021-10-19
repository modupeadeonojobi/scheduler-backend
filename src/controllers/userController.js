const User = require("../models/user");
const bcrypt = require('bcryptjs')
const response = require('../helpers/function')

const UserController = (serviceContainer) => {

    // @desc    Create New User
    // @route   POST /api/user/register
    async function createUser(req, res) {
        try {
            const buffers = [];
    
            for await (const chunk of req) {
                buffers.push(chunk);
            }
    
            const data = Buffer.concat(buffers).toString()
            const result = JSON.parse(data) 
    
            // Get user input
            const { name, email, password, gender } = result;
            
            // Validate user input
            if (!(name && email && password && gender)) {
                response(res, 400, {
                    message: 'All input is required',
                    statusCode: 400
                })
            }
    
            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await User.findOne({ email });
    
            if (oldUser) {
                response(res, 409, {
                    message: 'User Already Exist. Please Login',
                    statusCode: 409
                }) 
            } else {
                serviceContainer().createUser(result, res)
            }
          
        } catch (error) {
            response(res, 404, {
                message: 'An Error Occured while creating user. Please, try again.',
                error:  error.message,
                statusCode: 404
            })
        }
    }
    
    
    // @desc    Login User
    // @route   POST /api/user/login
    async function loginUser(req, res) {
    
        try {
            const buffers = [];
    
            for await (const chunk of req) {
                buffers.push(chunk);
            }
    
            const data = Buffer.concat(buffers).toString();
            const result = JSON.parse(data) 
    
            // Get user input
            const { email, password } = result;
    
            // Validate user input
            if (!(email && password)) {
                response(res, 400, {
                    message: 'All input is required',
                    statusCode: 400
                })
            } else {
    
                // Validate if user exist in our database
                const user = await User.findOne({ email }).select('+password');
        
                if (user) {
                    bcrypt.compare(password, user.password, (err, data) => {
                        //if error then handle error
                        if (err) {
                            response(res, 404, {
                                message: 'An error occurred. Please try again',
                                error:  err.message,
                                statusCode: 404
                            })
                        }
        
                        //if both match than you can do anything
                        if (data) {
                            serviceContainer().loginUser(user, res)
                        } else {
                            response(res, 401, {
                                message: 'Invalid credentials. Please try again',
                                statusCode: 401
                            })
                        }
                    })
                } else {
                    response(res, 401, {
                        message: 'Invalid details. Please try again',
                        statusCode: 401
                    })
                }
            }
        } catch (error) {
            response(res, 404, {
                message: 'An error occurred. Please try again',
                error:  error.message,
                statusCode: 404
            })
        }
    }
    
    // @desc    Get all users
    // @route   GET /api/users
    function getUsers(res) {
        serviceContainer().getUsers(res)
    }

    return {
        createUser,
        loginUser,
        getUsers
    }
}

module.exports = UserController