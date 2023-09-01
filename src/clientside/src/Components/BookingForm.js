import React,{useEffect, useState} from 'react';
import { Typography, Container, Box,Button} from '@mui/material';
import {LastBookingDetails}  from './LastBookingDetails';
import axios from 'axios'
import {MovieButton, TimeSlotButton, SeatTypeButton} from '../buttons/Buttons'
import {motion} from "framer-motion"



export const BookingForm = () => {
  const [lastBooking, setLastBooking] = useState(null);
  // state for the selecting the movie
  const [selectedMovie, setSelectedMovie] = useState('');
  // state for the selecting the time slot
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  // state for the selecting the seatTypes
  const [selectedSeatTypes, setSelectedSeatTypes] = useState([]);
  // state for the selecting hte seat numbers
  const [seatNumbers, setSeatNumbers] = useState(0);
  //state to show the message when the ticket's are booked
  const [showMessage, setShowMessage] = useState(false)

  //handle for the selecting the movie
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  // handle for the selecting for the time slot
  const handleSelectTimeSlot = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  // handle for selecting the seat Type
  const handleSelectSeatType = (seatType) => {
    setSelectedSeatTypes([...selectedSeatTypes, seatType]);
  };

  // handle for the selecting the seat number change
  const handleNumberChange = (seatType, event) => {
    const updatedNumbers = { ...seatNumbers, [seatType]: parseInt(event.target.value) };
    setSeatNumbers(updatedNumbers);
  };

 // Function to fetch the last booking data from the API.
 const fetchLastBookingData = async () => {
  try {
    // Get the base URL from environment variables.
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    // Send a GET request to fetch the last booking data.
    const response = await axios.get(`${BASE_URL}/api/last`);
    const lastbookingData = response.data;
    // Set the fetched data in the 'lastBooking' state.
    setLastBooking(lastbookingData);
    //Debugging it with console log
    console.log("data of lastbookings", lastbookingData)
  } catch (error) {
    // Handle errors if the API request fails.
    console.error('Error fetching last booking:', error);
  }
};
  // This useEffect hook runs once when the component is mounted.
  useEffect(() => {
    // Fetches the last booking data from the API and sets it in the state.
    fetchLastBookingData();
  }, []);

    // handle for the booking the movie
  const handleBookNow = async () => {
    if (!selectedMovie || !selectedTimeSlot || selectedSeatTypes.length === 0 ) {
      alert("Please select all details before booking");
      return;
    } 
    
    // create an array of all seat types
    const allSeatTypes = ['A1', 'A2', 'A3', 'A4', 'D1', 'D2'];
    // Create reservations by mapping through each seat type and constructing objects
    const reservations = allSeatTypes.map(seatType => ({
    seatType,
    number: seatNumbers[seatType] || 0 // Use seatNumbers state or default to 0
    }));

    // get the base url from the envinormental variables
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    // Prepare booking data with selected movie, time slot, and seat reservations
const bookingData = {
  movie: selectedMovie,
  timeSlot: selectedTimeSlot,
  seatReservations: reservations
};

// Log booking data for debugging
console.log('Booking data:', bookingData);

try {
  // Send a POST request to the backend to create a new booking
  const response = await axios.post(`${BASE_URL}/api/bookings`, bookingData);

  // Log the backend response for debugging
  console.log('Backend response:', response.data);

  // Reset selected values after successful booking
  setSelectedMovie('');
  setSelectedTimeSlot('');
  setSeatNumbers({});
  setSelectedSeatTypes([]);
  setShowMessage(true)
  setTimeout(() => {
    setShowMessage(false)
  },2000)
  fetchLastBookingData()
} catch (error) {
  // Handle errors by logging the error message
  console.error(error);
}
  };

  return (
    <div>
      {/* Booking form for booking the movie, time slot, seatType and No of seats  */}
      <Container maxWidth="lg" sx={{ marginTop: '3rem',marginBottom:'1rem' }}>
         {/* Heading for the form */}
        <Typography variant='h6'>Book that show!!</Typography>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: ['column', 'column', 'row'],
              gap: 5,
              backgroundColor: 'white',
              padding: 1,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Box sx={{ border: 2, width: 'full', padding: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Heading for the movie slot */}
                <Box>
                  <Typography variant='h6'>
                    Select A Movie
                  </Typography>
                </Box>
                {/* {Movie Buttons} */}
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <MovieButton 
                movieName='suraj par mangal bhari'
                isSelected={ selectedMovie === 'suraj par mangal bhari'}
                onClick={() => handleSelectMovie('suraj par mangal bhari')}/>
              <MovieButton 
              movieName='Tenet'
              isSelected={selectedMovie === 'Tenet'}
              onClick={() => handleSelectMovie('Tenet')}/>
              <MovieButton 
              movieName='The war with grandpa'
              isSelected={selectedMovie === 'The war with grandpa'}
              onClick={() => handleSelectMovie('The war with grandpa')}/>
              <MovieButton  
              movieName="The personal history of David Copperfield"
               isSelected={selectedMovie === 'The personal history of David Copperfield'}
              onClick={() => handleSelectMovie('The personal history of David Copperfield')}/>
              <MovieButton 
              movieName="Come Play"
              isSelected={selectedMovie === 'Come Play'}
              onClick={() => handleSelectMovie('Come Play')}
              />
                </Box>
              </Box>
              <Box sx={{ border: 2, width: 'full', padding: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Heading for the Time Slot */}
                <Box>
                  <Typography>
                    Select A Time Slot
                  </Typography>
                </Box>
                {/* {Time Slot Buttons} */}
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <TimeSlotButton 
                timeSlot='10:00 PM'
                isSelected={selectedTimeSlot === '10:00 PM'}
                onClick={() => handleSelectTimeSlot('10:00 PM')}/>
              <TimeSlotButton
               timeSlot='01:00 PM'
                isSelected={selectedTimeSlot === '01:00 PM'}
                 onClick={() => handleSelectTimeSlot('01:00 PM')}/>
              <TimeSlotButton 
              timeSlot='03:00 PM'
                isSelected={selectedTimeSlot === '03:00 PM'}
                 onClick={() => handleSelectTimeSlot('03:00 PM')}/>
              <TimeSlotButton 
              timeSlot='08:00 PM'
                isSelected={selectedTimeSlot === '08:00 PM'}
                 onClick={() => handleSelectTimeSlot('08:00 PM')}/>
                </Box>
              </Box>
              <Box sx={{ border: 2, width: 'auto', padding: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Heading for the Type of Seats */}
                <Box>
                  <Typography>
                    Select the Seats
                  </Typography>
                </Box>
                {/* buttons for the selecting seatTypes and no of seats */}
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <SeatTypeButton
                 seatType='Type A1'
                 isSelected={ selectedSeatTypes.includes('A1')}
                  onClick={() => handleSelectSeatType('A1')}
                  value={seatNumbers['A1'] || 0}
                  onChange={(event) => handleNumberChange('A1', event)}
                 />
                
                <SeatTypeButton 
                seatType='Type A2'
                isSelected={ selectedSeatTypes.includes('A2')}
                value={seatNumbers['A2'] || 0}
                onChange={(event) => handleNumberChange('A2', event)}
                  onClick={() => handleSelectSeatType('A2')}
                  /> 

                <SeatTypeButton
                seatType='Type A3'
                isSelected={selectedSeatTypes.includes('A3')}
                   onChange={(event) => handleNumberChange('A3', event)}
                   value={seatNumbers['A3'] || 0}
                   onClick={() => handleSelectSeatType('A3')}
                   />                

                <SeatTypeButton 
                isSelected={selectedSeatTypes.includes('A4')}
                seatType='Type A4'
                value={seatNumbers['A4'] || 0}
                onChange={(event) => handleNumberChange('A4', event)}
                  onClick={() => handleSelectSeatType('A4')}
                  /> 

                <SeatTypeButton 
                seatType='Type D1'
                isSelected={selectedSeatTypes.includes('D1')}
                value={seatNumbers['D1'] || 0}
                onChange={(event) => handleNumberChange('D1', event)}
                  onClick={() => handleSelectSeatType('D1')}/>
                <SeatTypeButton 
                seatType='Type D2'
                isSelected={selectedSeatTypes.includes('D2')}
                value={seatNumbers['D2'] || 0}
                onChange={(event) =>handleNumberChange('D2', event)}
                  onClick={() => handleSelectSeatType('D2')}
                  /> 
                </Box>
              </Box>
              {/* SeatTypeButton for booking and send the data to the backend */}
              <Button
                variant="contained"
                sx={{
                    width:'7rem',
                  textTransform: 'none',
                  backgroundImage: 'linear-gradient(to right, #00A6FF, #00E396)',
                  color: '#fff',
                  '&:hover': {
                    backgroundImage: 'linear-gradient(to right, #0072FF, #00C853)',
                  },
                }}
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </Box>
            <LastBookingDetails lastBooking={lastBooking} /> 
          </Box>
        </div>
      </Container>
      {showMessage &&(
          <motion.div
          initial={{ x: -300 }} // Slide in from the left
          animate={{ x: 0 }}    // Move to the normal position
          exit={{ x: -300 }}    // Slide out to the left
          transition={{ duration: 0.5 }}
          style={{
            padding: '5px',
            width: '10rem',
            border: '1px solid black',
            position: 'relative',
            left: 8,
            bottom: 2,
            backgroundColor: 'green'
          }}
        >
          {/* message when the bookings are successful */}
          <Typography sx={{color:'white'}}> Tickets Are Booked!! </Typography>
        </motion.div>
        )}
    </div>
  )
}
