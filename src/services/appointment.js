const Appointment = require("../models/appointment");
const response = require('../helpers/function')

// Get all appointments
const getAppointments = async(res) => {
    try {
        const appointments = await Appointment.find()
        response(res, 200, appointments)
    } catch (error) {
        response(res, 404, {
            message: 'An error occurred. Please try again',
            error:  error.message,
            statusCode: 404
        })
    }
}

// Get particular appointment
const getAppointment = async(res, id) => {
    try {
        const appointment = await Appointment.findById(id)
        response(res, 200, appointment)
    } catch (error) {
        response(res, 404, {
            message:  `Appointment id: ${id} not found`,
            error:  error.message,
            statusCode: 404
        })
    }
}

// Create appointment
const createAppointment = async(requestBody, res) => {
    const appointment = await Appointment.create(requestBody);
	response(res, 200, appointment)
}

// Delete appointment
const deleteAppointment = async(res, id) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(id)
            
        response(res, 200, { message: `Appointment with id: ${id} was deleted` })
    } catch (error) {
        response(res, 404, {
            message:  `Appointment id: ${id} not found`,
            error:  error.message,
            statusCode: 404
        })
    }
}

// Update appointment
const updateAppointment = async(requestBody, res, id) => {
    try {
        const { isTaken, availableTimeIndex, timeIndex } = requestBody;
    
        const appointment = await Appointment.findById(id);
    
        // Update availabilty time for false to true
        const takenResponse = appointment.availableTimes[availableTimeIndex].times[timeIndex].isTaken = isTaken;
        await appointment.save();
    
        response(res, 200, { 
            isTaken: takenResponse,
            statusCode: res.statusCode
        })
    } catch (error) {
        response(res, 404, {
            message:  'isTaken field can not be updated',
            error: error.message,
            statusCode: 404
        })
    }
}


module.exports = { 
    getAppointments,
    getAppointment,
    createAppointment,
    deleteAppointment,
    updateAppointment
}