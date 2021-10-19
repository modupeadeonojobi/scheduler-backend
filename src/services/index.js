const { createUser, loginUser, getUsers } = require('./user')
const { getAppointments, getAppointment, createAppointment, deleteAppointment, updateAppointment } = require('./appointment')
const bookAppointment = require('./bookAppointment')

const ContainerService = () => {
    return {
        createUser: createUser,
        loginUser: loginUser,
        getUsers: getUsers,
        getAppointments: getAppointments,
        getAppointment: getAppointment,
        createAppointment: createAppointment,
        deleteAppointment: deleteAppointment,
        updateAppointment: updateAppointment,
        bookAppointment: bookAppointment
    }
}

module.exports = ContainerService