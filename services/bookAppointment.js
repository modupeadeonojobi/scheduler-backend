const bookAppointmentRepository = require('../repositories/bookAppointment')
const { BOOK_APPOINTMENT_ERROR } = require('../helpers/variables')

const bookAppointment = async(requestBody) => {
    const appointment = await bookAppointmentRepository.bookAppointment(requestBody)
    
    if (!appointment) throw new Error(BOOK_APPOINTMENT_ERROR)
    return appointment
}

module.exports = bookAppointment