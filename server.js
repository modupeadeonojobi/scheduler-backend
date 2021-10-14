const http = require('http');
const mongoose = require("mongoose");
require('dotenv').config();
const { getPosts } = require('./controllers/postController'); // This is a sample of what needs to be done


const server = http.createServer((req, res) => {
  if (req.url === '/api/posts' && req.method === 'GET') {
    getPosts(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});


// Database connection
const dbURI = 'mongodb://localhost:27017/scheduler'; // This will be changed to mongo atlas db later
const PORT = process.env.PORT || 5000;

async function connectDB() {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    server.listen(PORT, () => console.log(`Listening for requests on port ${PORT}`));
    console.log('Connected to database');
    
  } catch (error) {
    console.log(`Failed to connect to database. ${error}`);
  }
}

connectDB();