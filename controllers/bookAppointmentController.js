const { getRequestBody } = require("../helpers/function");
const { INVALID_REQUEST_BODY } = require("../helpers/variables");

const BookAppointmentController = (serviceContainer, response) => {

	// @desc    Book appointment
	// @route   POST /api/book-appointment
	async function createBookAppointment(req, res) {
		try {
			const requestBody = await getRequestBody(req)

			// Get formData
			const { title, host, name, email, venue, slotPicked, comment } = requestBody

			// Validate user input
			if (!(title && host && venue && name && email && slotPicked)) throw new Error(INVALID_REQUEST_BODY)

			const bookedAppointment = await serviceContainer.bookAppointment(requestBody)
			response(res, 200, bookedAppointment)
			
		} catch (error) {
			if (error.message === INVALID_REQUEST_BODY) {
                statusCode = 400
                response(res, statusCode, { error:  error.message })
			} else {
				response(res, 404, { error:  error.message })
			}
		}
	}

	return {
		createBookAppointment
	}
}

module.exports = BookAppointmentController