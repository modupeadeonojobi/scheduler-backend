const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const { getAppointments, getAppointment, createAppointment, deleteAppointment } = require('./controllers/appointmentController');
const { createUser } = require('./controllers/createUser')
const { loginUser } = require('./controllers/loginUser')

const server = http.createServer((req, res) => {

  const indexUrl = '/api/'
  const id = req.url.split('/')[3];

  if (req.url === `${indexUrl}user/register` && req.method === 'POST') {
    createUser(req, res)
  } else if (req.url === `${indexUrl}user/login` && req.method === 'POST') {
    loginUser(req, res)
  } else if (req.url === `${indexUrl}appointments` && req.method === 'GET') {
    getAppointments(req, res, id);
  } else if (req.url === `${indexUrl}appointment/${id}` && req.method == 'GET') {
    getAppointment(req, res, id);
  } else if (req.url === `${indexUrl}appointment` && req.method === 'POST') {

    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      createAppointment(req, res, data)
    });

  } else if (req.url === `${indexUrl}appointment/${id}` && req.method == 'DELETE') {
    deleteAppointment(req, res, id);

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