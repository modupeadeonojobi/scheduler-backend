const BookAppointment = require('../models/bookAppointment');
const response = require('../helpers/function')

const bookAppointment = async(requestBody, res) => {
    try {
        const bookAppointment = await BookAppointment.create(requestBody);
        response(res, 200, bookAppointment)

    } catch (error) {
        response(res, 404,  {
            message: `Could not book an appointment`,
            error: error.message,
            statusCode: res.statusCode
        })
    }
}

module.exports = bookAppointment