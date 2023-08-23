const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movie: String,
  timeSlot: String,
  seatReservations: Array,
},{ timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
