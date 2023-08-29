// Import the Express library
const express = require('express');
// Create a new router instance
const router = express.Router();
// Import the Booking model from the '../Models/booking' path
const Booking = require('../Models/booking');

// Define a route to get the last booking
router.get('/last', async (req, res) => {
  try {
    // Find the last booking in the database and sort by createdAt in descending order
    const lastBooking = await Booking.findOne().sort({ createdAt: -1 }).exec();

    // If a last booking is found
    if (lastBooking) {
      // Return a successful response with the lastBooking data
      return res.status(200).json(lastBooking);
    } 
    // If no last booking is found
    else {
      // Log a message indicating that no previous bookings were found
      return console.log('No previous bookings were found');
    } 
  } catch (error) {
    // Handle errors by logging an error message and returning a 500 Internal Server Error response
    console.error('Error fetching last booking:', error);
    res.status(500).json({ message: 'Error fetching last booking' });
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
