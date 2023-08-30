import React from 'react';
import { Box, Typography } from '@mui/material';




// Functional component to display the details of the last booking
export const LastBookingDetails = ({lastBooking}) => {
  
  return (
    <div>
      <Box sx={{ width: ['auto','auto','12rem'], minHeight: '12rem', border: 2, padding: 3,display:'flex', justifyContent:'center', alignItems:'center', }}>
          <div>
            {/* Display the booking details if lastBooking is not null */}
            {lastBooking !==null ? (
              <div>
                <Typography>Last Booking Details:</Typography>
                <Typography>Movie: {lastBooking?.movie}</Typography>
                <Typography>Time Slot: {lastBooking?.timeSlot}</Typography>
                {/* Display seat reservations */}
                <Typography>Seat Reservations:</Typography>
                <ul>
                  {/* Map through the seat reservations and display them */}
                  {lastBooking?.seatReservations?.map(seat => (
                    <li key={seat?.seatType}>
                      {seat?.seatType}: {seat?.number}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              // Display a message when there is no previous booking
              <Typography>No Previous Booking Yet</Typography>
            )}
          </div>
      </Box>
    </div>
  );
};
