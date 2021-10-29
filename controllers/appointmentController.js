const { getRequestBody } = require('../helpers/function')
const { INVALID_REQUEST_BODY } = require('../helpers/variables')


const AppointmentController = (serviceContainer, response) => {

	// @desc    Get all appointments
	// @route   GET /api/appointments
	async function getAppointments(res) {
		try {
			const appointments = await serviceContainer.AppointmentService.getAppointments(res)
			response(res, 200, appointments)
			
		} catch (error) {
            response(res, 404, { error:  error.message })
        }
	}
  
  
	// @desc    Get a single appointment
	// @route   GET /api/appointment/:id
	async function getAppointment(res, id) {	
		try {
			const appointment = await serviceContainer.AppointmentService.getAppointment(res, id)
			response(res, 200, appointment)

		} catch (error) {
			response(res, 404, { error:  error.message })
		}
	}
  
  
	// @desc    Create appointment
	// @route   POST /api/appointment
	async function createAppointment(req, res) {
		try {
			const requestBody = await getRequestBody(req)

			// Get formData
			const { title, user, venue, duration, availableTimes } = requestBody

			// Validate user input
			if (!(title && user && venue && duration && availableTimes)) throw new Error(INVALID_REQUEST_BODY)

			const newAppointment = await serviceContainer.AppointmentService.createAppointment(requestBody)
			response(res, 200, newAppointment)
	
		} catch (error) {
			if (error.message === INVALID_REQUEST_BODY) {
                statusCode = 400
                response(res, statusCode, { error:  error.message })
			} else {
				response(res, 404, { error:  error.message })
			}
		}
	}
  
  
	// @desc    Delete one appointment
	// @route   DELETE /api/appointment/:id
	async function deleteAppointment(res, id) {
		try {
			const deletedAppointment = await serviceContainer.AppointmentService.deleteAppointment(id)
			response(res, 200, deletedAppointment)

		} catch (error) {
			response(res, 404, { error:  error.message })
		}
	}
  
  
	// @desc    Update available date 
	// @route   PATCH /api/appointment/:id
	async function updateAppointment(req, res, id) {
		try {
			const requestBody = await getRequestBody(req)

			const updatedAppointment = await serviceContainer.AppointmentService.updateAppointment(requestBody, id)
			response(res, 200, updatedAppointment)
	
		} catch (error) {
			response(res, 404, { error:  error.message })
		}
	}

	return {
		getAppointments,
		getAppointment,
		createAppointment,
		deleteAppointment,
		updateAppointment
	}
}


module.exports = AppointmentController