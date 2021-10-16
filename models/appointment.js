const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  venue: {
    type: Array,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  availableTimes: {
    type: Array,
    required: true
  }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;