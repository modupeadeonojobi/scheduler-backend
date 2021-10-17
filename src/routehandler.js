const { getAppointments, getAppointment, createAppointment, deleteAppointment } = require('./controllers/appointmentController');
const UserController = require('./controllers/userController')
const { createBookAppointment } = require('./controllers/bookAppointmentController');
const { updateAppointment } = require('./controllers/appointmentController');
const serviceContainer = require('./services/index')

const UserControllerHandler = UserController(serviceContainer)

const routeHandler = (req, res) => {
    const id = req.url.split('/')[3];

    if (req.url === `/api/user/register` && req.method === 'POST') {
        UserControllerHandler.createUser(req, res);
    } else if (req.url === `/api/user/login` && req.method === 'POST') {
        UserControllerHandler.loginUser(req, res);
    } else if (req.url === `/api/users` && req.method === 'GET') {
        UserControllerHandler.getUsers(res);
    }else if (req.url === '/api/appointments' && req.method === 'GET') {
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
}

module.exports = routeHandler