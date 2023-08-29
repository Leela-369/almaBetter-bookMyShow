// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the booking data
const bookingSchema = new mongoose.Schema({
  // Define fields for movie, time slot, and seat reservations
  movie: String,              // Store the selected movie
  timeSlot: String,           // Store the selected time slot
  seatReservations: Array,    // Store an array of seat reservations
}, { 
  // Configure the schema options
  timestamps: true            // Automatically add createdAt and updatedAt timestamps
});

// Create the Booking model using the bookingSchema
const Booking = mongoose.model('Booking', bookingSchema);

// Export the Booking model to be used in other parts of the application
module.exports = Booking;
