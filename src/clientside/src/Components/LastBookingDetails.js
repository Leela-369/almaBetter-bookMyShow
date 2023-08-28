import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

export const LastBookingDetails = () => {
  const [lastBooking, setLastBooking] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${BASE_URL}/api/last`);
        const lastBookingData = response.data;
        setLastBooking(lastBookingData);
      } catch (error) {
        console.error('Error fetching last booking:', error);
      }
    };

    fetchData();
  }, [lastBooking]);

  return (
    <div>
      <Box sx={{ width: ['auto','auto','12rem'], minHeight: '12rem', border: 2, padding: 3,display:'flex', justifyContent:'center', alignItems:'center', }}>
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

      </Box>
    </div>
  );
};
