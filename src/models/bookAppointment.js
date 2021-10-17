const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookAppointmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  host: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  slotPicked: {
    type: Object,
    required: true
  },
  venue: {
    type: Object,
    required: true
  },
  comment: {
    type: String
  }
}, { timestamps: true });

const BookAppointment = mongoose.model('BookAppointment', BookAppointmentSchema);
module.exports = BookAppointment;