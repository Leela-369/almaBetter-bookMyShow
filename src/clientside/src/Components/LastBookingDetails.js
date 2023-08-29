import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

// Functional component to display the details of the last booking
export const LastBookingDetails = () => {
  // State to hold the data of the last booking
  const [lastBooking, setLastBooking] = useState(null);

  // UseEffect to fetch the last booking data when the component mounts or when lastBooking changes
  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        // Get the BASE_URL from environment variables
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        // Fetch the last booking data from the server
        const response = await axios.get(`${BASE_URL}/api/last`);
        const lastBookingData = response.data;
        // Update the state with the fetched last booking data
        setLastBooking(lastBookingData);
      } catch (error) {
        // Handle errors by logging an error message
        console.error('Error fetching last booking:', error);
      }
    };

    // Call the fetchData function when the component mounts or when lastBooking changes
    fetchData();
  }, [lastBooking]); // The dependency array ensures this effect runs when lastBooking changes

  return (
    <div>
      <Box sx={{ width: ['auto','auto','12rem'], minHeight: '12rem', border: 2, padding: 3,display:'flex', justifyContent:'center', alignItems:'center', }}>
          <div>
            {/* Display the booking details if lastBooking is not null */}
            {lastBooking ? (
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
