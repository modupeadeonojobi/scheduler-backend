const BookAppointment = require('../models/bookAppointment');

const BookAppointmentRepository = () => {

    const bookAppointment = async requestBody => {
        const appointment = await BookAppointment.create(requestBody)
        return appointment
    }

    return {
        bookAppointment
    }
}

module.exports = BookAppointmentRepository()