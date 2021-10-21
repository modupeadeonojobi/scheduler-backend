const { createUser, loginUser, getUsers } = require('./user')
const { getAppointments, getAppointment, createAppointment, deleteAppointment, updateAppointment } = require('./appointment')
const bookAppointment = require('./bookAppointment')

const ContainerService = () => {
    return {
        createUser,
        loginUser,
        getUsers,
        getAppointments,
        getAppointment,
        createAppointment,
        deleteAppointment,
        updateAppointment,
        bookAppointment
    }
}

module.exports = ContainerService