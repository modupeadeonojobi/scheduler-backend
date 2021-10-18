const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const { getAppointments, getAppointment, createAppointment, deleteAppointment } = require('./controllers/appointmentController');
const { createUser } = require('./controllers/createUser')
const { loginUser } = require('./controllers/loginUser')
const { createBookAppointment } = require('./controllers/bookAppointmentController');
const { updateAppointment } = require('./controllers/appointmentController');



const server = http.createServer((req, res) => {

  const id = req.url.split('/')[3];

  if (req.url === `/api/user/register` && req.method === 'POST') {
    createUser(req, res);
  } else if (req.url === `api/user/login` && req.method === 'POST') {
    loginUser(req, res);
  } else if (req.url === '/api/appointments' && req.method === 'GET') {
    getAppointments(req, res);
  } else if (req.url === `/api/appointment/${id}` && req.method === 'GET') {
    getAppointment(req, res, id);
  } else if (req.url === `/api/appointment` && req.method === 'POST') {
    createAppointment(req, res);
  } else if (req.url === `/api/appointment/${id}` && req.method === 'DELETE') {
    deleteAppointment(req, res, id);
  } else if (req.url === `/api/appointment/${id}` && req.method === 'PATCH') {
    updateAppointment(req, res, id);
  } else if (req.url === `/api/book-appointment` && req.method === 'POST') {
    createBookAppointment(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
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
  connectDB();

// mongoose.set("debug", true);



module.exports = server;