const User = require("../models/user");
const bcrypt = require('bcryptjs')

// @desc    Create New User
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
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                message: 'All input is required',
                error:  error,
                statusCode: res.statusCode
            }));
        }

        // Validate if user exist in our database
        const user = await User.findOne({ email });

        // user
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user))
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            message: 'Route not found',
            error:  error,
            statusCode: res.statusCode
        }));
    }
}

module.exports = {
  loginUser
}