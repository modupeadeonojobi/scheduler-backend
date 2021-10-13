const http = require('http');
const mongoose = require("mongoose");
require('dotenv').config();
const User = require('./models/user');



const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('The port is working');
});



// Database connection
const dbURI = 'mongodb://localhost:27017/scheduler';
const { PORT, HOST } = process.env;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    server.listen(PORT, HOST);
    console.log(`Listening for requests on port ${PORT}`);
    console.log('Connected to database')
  })
  .catch(error => console.log(error));