const Appointment = require('../models/appointment');



// @desc    Get all appointments
// @route   GET /api/appointments
async function getAppointments(req, res) {
  try {
    const appointment = await Appointment.find();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(appointment));

  } catch (error) {
    console.log(error);
  }
}



// @desc    Get one appointment
// @route   GET /api/appointment/:id
async function getAppointment(req, res, id) {
  try {
    const appointment = await Appointment.findById(id);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(appointment));

  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(
      {
        message: `Id ${id} not found`,
        error: error.message,
        statusCode: res.statusCode
      }
    ));
    console.log(error);
  }
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

    const appointment = await Appointment.create(requestBody);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(appointment));

  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(
      {
        message: `Could not create appointment`,
        error: error.message,
        statusCode: res.statusCode
      }
    ))
    console.log(error)
  }
}



// @desc    Delete one appointment
// @route   DELETE /api/appointment/:id
async function deleteAppointment(req, res, id) {
  try {

    const appointment = await Appointment.findByIdAndDelete(id)

    if (appointment) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: `Appointment with id: ${id} was deleted` }))
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Appointment Not Found' }))
    }


  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(
      {
        message: `Id ${id} not found`,
        error: error.message,
        statusCode: res.statusCode
      }
    ));
    console.log(error)
  }
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
    const { isTaken, availableTimeIndex, timeIndex } = requestBody;
    console.log(isTaken, availableTimeIndex, timeIndex )

    const appointment = await Appointment.findById(id);

    // Update the field and save to database
    console.log(appointment.availableTimes[availableTimeIndex])
    const response = appointment.availableTimes[availableTimeIndex].times[timeIndex].isTaken = isTaken;
    await appointment.save();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(
      {
        isTaken: response,
        statusCode: res.statusCode
      }))

  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(
      {
        message: `isTaken field can not be updated`,
        error: error.message,
        statusCode: res.statusCode
      }
    ));
  }
}


module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment
}