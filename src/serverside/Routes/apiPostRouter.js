const express = require('express');
const router = express.Router();
const Booking = require('../Models/booking');

// Create a new booking
router.post('/bookings', async (req, res) => {
  const bookingData = req.body;
  // console.log('Received booking data:', bookingData);

  try {
    const newBooking = new Booking({
      movie: bookingData.movie,
      timeSlot: bookingData.timeSlot,
      seatReservations: bookingData.seatReservations,
    });
    

    await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
