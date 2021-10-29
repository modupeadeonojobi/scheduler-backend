const Appointment = require('../models/appointment');
const { APPOINTMENT_NOT_FOUND } = require('../helpers/variables')

const AppointmentRepository = () => {

    const getAppointments = async () => {
        const appointments = await Appointment.find()
        return appointments
    }

    const getAppointment = async id => {
        const appointment = await Appointment.findById(id)
        return appointment
    }

    const addAppointment = async requestBody => {
        const appointment = await Appointment.create(requestBody)
        return appointment
    }

    const removeAppointment = async id => {
        const appointment = await Appointment.findByIdAndDelete(id)
        return appointment
    }

    const updateAppointment = async (requestBody, id) => {
        const { isTaken, availableTimeIndex, timeIndex } = requestBody

        const appointment = await getAppointment(id)
        if (appointment) {
            // Update availabilty time for false to true
            const takenResponse = appointment.availableTimes[availableTimeIndex].times[timeIndex].isTaken = isTaken
            
            await appointment.save()
            return takenResponse
        } else {
            throw new Error(APPOINTMENT_NOT_FOUND)
        }
    }

    return {
        getAppointments,
        getAppointment,
        addAppointment,
        removeAppointment,
        updateAppointment
    }
}

module.exports = AppointmentRepository()