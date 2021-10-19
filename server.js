const http = require('http');
const mongoose = require('mongoose');
const routeHandler = require('./src/routehandler');
require('dotenv').config();


const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  routeHandler(req, res)
});



// Database connection MONGODB ATLAS
const uri = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000;

async function connectDB() {
  try {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      server.listen(PORT, () => console.log(`Listening for requests on port ${PORT}`));
      console.log('Connected to database');

  } catch (error) {
    console.log(`Failed to connect to database. ${error}`);
  }
}
mongoose.set("debug", true);

connectDB();