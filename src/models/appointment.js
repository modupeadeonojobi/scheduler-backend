const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const timesSchema = new Schema({
  isTaken: {
    type: Boolean,
    required: true,
  },
  time: {
    type: String,
    required: true
  }
});


const timeSchema = new Schema({
  day: { type: String },
  times: [ timesSchema ]
});


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
    type: Object,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  availableTimes: [
    timeSchema
  ]
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;