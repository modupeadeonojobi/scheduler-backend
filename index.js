const http = require('http');
const mongoose = require('mongoose');
const routeHandler = require('./src/routehandler');
require('dotenv').config();


const server = http.createServer((req, res) => {
  routeHandler(req, res)
});


// Database connection
const dbURI = process.env.URI;
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
mongoose.set("debug", true);

connectDB();