const User = require("../models/user");
const bcrypt = require('bcryptjs')

// @desc    Create New User
async function createUser(req, res) {
    try {
        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }

        const data = Buffer.concat(buffers).toString();

        const result = JSON.parse(data) 

        // Get user input
        const { name, email, password, gender } = result;
        
        // Validate user input
        if (!(name && email && password && gender)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                message: 'All input is required',
                error:  error,
                statusCode: res.statusCode
            }));
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                message: 'User Already Exist. Please Login',
                error:  error,
                statusCode: res.statusCode
            }));
        }
      
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            name: name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            gender: gender,
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user)); 
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
  createUser
}