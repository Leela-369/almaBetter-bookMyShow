// Import the Express library
const express = require('express');
// Create a new router instance
const router = express.Router();
// Import the Booking model from the '../Models/booking' path
const Booking = require('../Models/booking');

// Define a route to create a new booking
router.post('/bookings', async (req, res) => {
  // Extract booking data from the request body
  const bookingData = req.body;

  try {
    // Create a new instance of the Booking model using the extracted data
    const newBooking = new Booking({
      movie: bookingData.movie,
      timeSlot: bookingData.timeSlot,
      seatReservations: bookingData.seatReservations,
    });

    // Save the new booking to the database
    await newBooking.save();

    // Return a successful response with a status code of 201 (Created)
    // and a message indicating successful creation along with the newBooking data
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    // Handle errors by logging an error message and returning a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
