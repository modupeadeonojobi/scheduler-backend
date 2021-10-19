const AppointmentController = require('./controllers/appointmentController')
const UserController = require('./controllers/userController')
const BookAppointmentController = require('./controllers/bookAppointmentController');
const serviceContainer = require('./services/index')

const UserControllerHandler = UserController(serviceContainer)
const AppointmentControllerHandler = AppointmentController(serviceContainer)
const BookAppointmentControllerHandler = BookAppointmentController(serviceContainer)

const routeHandler = (req, res) => {
    const id = req.url.split('/')[3];

    if (req.url === `/api/user/register` && req.method === 'POST') {
        UserControllerHandler.createUser(req, res);
    } else if (req.url === `/api/user/login` && req.method === 'POST') {
        UserControllerHandler.loginUser(req, res);
    } else if (req.url === `/api/users` && req.method === 'GET') {
        UserControllerHandler.getUsers(res);
    } else if (req.url === '/api/appointments' && req.method === 'GET') {
        AppointmentControllerHandler.getAppointments(res);
    } else if (req.url === `/api/appointment` && req.method === 'POST') {
        AppointmentControllerHandler.createAppointment(req, res);
    } else if (req.url === `/api/appointment/${id}` && req.method === 'GET') {
        AppointmentControllerHandler.getAppointment(res, id);
    } else if (req.url === `/api/appointment/${id}` && req.method === 'DELETE') {
        AppointmentControllerHandler.deleteAppointment(res, id);
    } else if (req.url === `/api/appointment/${id}` && req.method === 'PATCH') {
        AppointmentControllerHandler.updateAppointment(req, res, id);
    } else if (req.url === `/api/book-appointment` && req.method === 'POST') {
        BookAppointmentControllerHandler.createBookAppointment(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
}

module.exports = routeHandler