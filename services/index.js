const UserService = require('./userService')
const AppointmentService = require('./appointmentService')
const bookAppointment = require('./bookAppointment')

const ContainerService = () => {
    return {
        UserService: UserService(),
        AppointmentService: AppointmentService(),
        bookAppointment
    }
}

module.exports = ContainerService()