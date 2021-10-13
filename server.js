const http = require('http');
require('dotenv').config();



const server = http.createServer((req, res) => {
  res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('The port is working');
});


// LISTEN
const { PORT, HOST } = process.env;
server.listen(PORT, HOST, () => {
  console.log(`Listening for requests on port ${PORT}`);
});