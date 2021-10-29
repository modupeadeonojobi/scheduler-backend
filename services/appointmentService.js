const appointmentRepository = require('../repositories/appointment')
const { NO_APPOINTMENTS, CREATE_APPOINTMENT_ERROR, UPDATE_APPOINTMENT_ERROR } = require('../helpers/variables')

const AppointmentService = () => {
    
    // Get all appointments
    const getAppointments = async() => {
        const appointments = await appointmentRepository.getAppointments()

        if (!appointments) throw new Error(NO_APPOINTMENTS)
        return appointments
    }
    
    // Get particular appointment
    const getAppointment = async id => {
        const appointment = await appointmentRepository.getAppointments(id)
    
        if (!appointment) throw new Error(`Appointment id: ${id} not found`)
        return appointment
    }
    
    // Create appointment
    const createAppointment = async requestBody => {
        const appointment = await appointmentRepository.addAppointment(requestBody)

        if (!appointment) throw new Error(CREATE_APPOINTMENT_ERROR)
        return appointment
    }

    // Delete appointment
    const deleteAppointment = async id => {
        const appointment = await appointmentRepository.removeAppointment(id)
        
        if (!appointment) throw new Error(`Appointment id: ${id} not found`)
        return appointment
    }
    
    // Update appointment
    const updateAppointment = async(requestBody, id) => {
        const appointment = await appointmentRepository.updateAppointment(id, requestBody)

        if (!appointment) throw new Error(UPDATE_APPOINTMENT_ERROR)
        return appointment
    }

    return {
        getAppointments,
        getAppointment,
        createAppointment,
        deleteAppointment,
        updateAppointment
    }
}


module.exports = AppointmentService