import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

export const LastBookingDetails = () => {
  const [lastBooking, setLastBooking] = useState(null);
  const [error, setError] = useState(false); // Add state to track error

  useEffect(() => {
    // Make the GET request to fetch the last booking details
    axios.get('https://almabetter-bookmyshow-backendserver.onrender.com/api/last')
      .then(response => {
        const lastBookingData = response.data;
        setLastBooking(lastBookingData);
        setError(false); // Reset error state on successful response
      })
      .catch(error => {
        console.error('Error fetching last booking:', error);
        setError(true); // Set error state to true on error
      });
  }, [lastBooking]);

  return (
    <div>
      <Box sx={{ width: ['auto','auto','12rem'], minHeight: '12rem', border: 2, padding: 3,display:'flex', justifyContent:'center', alignItems:'center', }}>
        {error ? ( // Display error message conditionally
          <Typography>No Bookings Yet</Typography>
        ) : (
          <div>
            {lastBooking ? (
              <div>
                <Typography>Last Booking Details:</Typography>
                <Typography>Movie: {lastBooking?.movie}</Typography>
                <Typography>Time Slot: {lastBooking?.timeSlot}</Typography>
                {/* Display seat reservations */}
                <Typography>Seat Reservations:</Typography>
                <ul>
                  {lastBooking?.seatReservations?.map(seat => (
                    <li key={seat?.seatType}>
                      {seat?.seatType}: {seat?.number}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Typography>No Previous Booking Yet</Typography>
            )}
          </div>
        )}
      </Box>
    </div>
  );
};
