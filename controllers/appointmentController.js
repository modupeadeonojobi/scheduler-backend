
const AppointmentController = (serviceContainer) => {

	// @desc    Get all appointments
	// @route   GET /api/appointments
	async function getAppointments(res) {
		serviceContainer().getAppointments(res)
	}
  
  
	// @desc    Get a single appointment
	// @route   GET /api/appointment/:id
	async function getAppointment(res, id) {	
		serviceContainer().getAppointment(res, id)
	}
  
  
	// @desc    Create appointment
	// @route   POST /api/appointment
	async function createAppointment(req, res) {
	
		try {
			const buffers = [];
		
			for await (const chunk of req) {
				buffers.push(chunk);
			}
		
			const data = Buffer.concat(buffers).toString();
		
			const requestBody = JSON.parse(data);

			serviceContainer().createAppointment(requestBody, res);
	
		} catch (error) {
			response(res, 404, {
                message:  'Could not create appointment',
                error:  error.message,
                statusCode: 404
            })
		}
	}
  
  
	// @desc    Delete one appointment
	// @route   DELETE /api/appointment/:id
	async function deleteAppointment(res, id) {
		serviceContainer().deleteAppointment(res,id);
	}
  
  
	// @desc    Update available date 
	// @route   PATCH /api/appointment/:id
	async function updateAppointment(req, res, id) {
		try {
	
			const buffers = [];
		
			for await (const chunk of req) {
				buffers.push(chunk);
			}
		
			const data = Buffer.concat(buffers).toString();
		
			const requestBody = JSON.parse(data);

			serviceContainer().updateAppointment(requestBody, res, id)
	
		} catch (error) {
			response(res, 404, {
                message:  'An error occurred',
                error:  error.message,
                statusCode: 404
            })
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