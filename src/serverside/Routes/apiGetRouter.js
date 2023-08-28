const express = require('express');
const router = express.Router();
const Booking = require('../Models/booking');

// Get the last booking
router.get('/last', async (req, res) => {
  try {
    const lastBooking = await Booking.findOne().sort({ createdAt: -1 }).exec();

   if(lastBooking) {
    return res.status(200).json(lastBooking)
   } 
   else {
      return console.log('No previous bookings were found');
    } 
    
  } catch (error) {
    console.error('Error fetching last booking:', error);
    res.status(500).json({ message: 'Error fetching last booking' });
  }
});

module.exports = router;
