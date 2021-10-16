const BookAppointment = require('../models/bookAppointment');


// @desc    Book appointment
// @route   POST /api/book-appointment
async function createBookAppointment(req, res) {

  try {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();

    const requestBody = JSON.parse(data);

    const bookAppointment = await BookAppointment.create(requestBody);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(bookAppointment));

  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(
      {
        message: `Could not book an appointment`,
        error: error.message,
        statusCode: res.statusCode
      }
    ))
    console.log(error)
  }
}



module.exports = {
  createBookAppointment
}