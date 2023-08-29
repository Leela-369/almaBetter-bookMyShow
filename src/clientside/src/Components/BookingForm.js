import React,{useState} from 'react';
import { Typography, Container, Box, Button, TextField, styled } from '@mui/material';
import { LastBookingDetails } from './LastBookingDetails';
import { grey } from '@mui/material/colors';
import axios from 'axios'

// Styled input using MUI's styling
const Input = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 12,
    padding: 3,
    width: '30px',
    height: '20px',
  },
}));



export const BookingForm = () => {
  // state for the selecting the movie
  const [selectedMovie, setSelectedMovie] = useState('');
  // state for the selecting the time slot
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  // state for the selecting the seatTypes
  const [selectedSeatTypes, setSelectedSeatTypes] = useState([]);
  // state for the selecting hte seat numbers
  const [seatNumbers, setSeatNumbers] = useState(0);

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
  
    // handle for the booking the movie
  const handleBookNow = async () => {
    if (!selectedMovie || !selectedTimeSlot || selectedSeatTypes.length === 0) {
      console.log("Please select all details before booking.");
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
} catch (error) {
  // Handle errors by logging the error message
  console.error(error);
}
  };
  

  return (
    <div>
      {/* Booking form for booking the movie, time slot, seatType and No of seats  */}
      <Container maxWidth="lg" sx={{ marginTop: '3rem', }}>
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
                <Button sx={{
                color: selectedMovie === 'suraj par mangal bhari' ? '#33eaff' : grey[900],
                borderColor: selectedMovie === 'suraj par mangal bhari' ? '#33eaff' : grey[900],
                boxShadow: selectedMovie === 'suraj par mangal bhari' ? '0px 0px 10px #33eaff' : grey[900],
                textTransform: 'none',
                padding: '4px',
                width: 'auto',
                margin: '4px',
                fontSize: '1rem',
                display: 'flex',
                flexDirection: 'column'
              }} variant='outlined' onClick={() => handleSelectMovie('suraj par mangal bhari')}>suraj par mangal bhari</Button>
              <Button sx={{
              color: selectedMovie === 'Tenet' ? '#33eaff': grey[900],
              borderColor: selectedMovie === 'Tenet' ? '#33eaff': grey[900],
              boxShadow : selectedMovie === 'Tenet' ? '0px 0px 10px #33eaff': grey[900],
              textTransform: 'none',
              padding: '4px',
              width: 'auto',
              margin: '4px',
              fontSize: '1rem',
              display: 'flex',
              flexDirection: 'column'
            }} variant='outlined' onClick={() => handleSelectMovie('Tenet')}>Tenet</Button>
              <Button sx={{
              color:selectedMovie === 'The war with grandpa'? '#33eaff' : grey[900],
              borderColor: selectedMovie === 'The war with grandpa'? '#33eaff' : grey[900],
              boxShadow: selectedMovie === 'The war with grandpa'? '0px 0px 10px #33eaff' : grey[900],
              textTransform: 'none',
              padding: '4px',
              width: 'auto',
              margin: '4px',
              fontSize: '1rem',
              display: 'flex',
              flexDirection: 'column'
            }} variant='outlined' onClick={() => handleSelectMovie('The war with grandpa')}>The war with grandpa</Button>
              <Button sx={{
                color:selectedMovie === 'The personal history of David Copperfield'? '#33eaff' : grey[900],
                borderColor: selectedMovie === 'The personal history of David Copperfield'? '#33eaff' : grey[900],
                boxShadow: selectedMovie === 'The personal history of David Copperfield'? '0px 0px 10px #33eaff' : grey[900],
                textTransform: 'none',
                padding: '4px',
                width: 'auto',
                margin: '4px',
                fontSize: '1rem',
                display: 'flex',
                flexDirection: 'column'
              }} variant='outlined' onClick={() => handleSelectMovie('The personal history of David Copperfield')}>The personal history of David Copperfield</Button>
              <Button sx={{
              color: selectedMovie === 'Come Play' ? '#33eaff': grey[900],
              borderColor: selectedMovie === 'Come Play' ? '#33eaff': grey[900],
              boxShadow : selectedMovie === 'Come Play' ? '0px 0px 10px #33eaff': grey[900],
              textTransform: 'none',
              padding: '4px',
              width: 'auto',
              margin: '4px',
              fontSize: '1rem',
              display: 'flex',
              flexDirection: 'column'
            }} variant='outlined' onClick={() => handleSelectMovie('Come Play')}>Come Play</Button>

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
                <Button sx={{
                color: selectedTimeSlot === '10:00 PM' ? '#33eaff': grey[900],
                borderColor: selectedTimeSlot === '10:00 PM' ? '#33eaff': grey[900],
                boxShadow : selectedTimeSlot === '10:00 PM' ? '0px 0px 10px #33eaff': grey[900],
                textTransform: 'none',
                padding: '4px',
                width: 'auto',
                margin: '4px',
                fontSize: '1rem',
                display: 'flex',
                flexDirection: 'column'
              }} variant='outlined' onClick={() => handleSelectTimeSlot('10:00 PM')}>10:00 PM</Button>
              <Button sx={{
                color: selectedTimeSlot === '01:00 PM' ? '#33eaff': grey[900],
                borderColor: selectedTimeSlot === '01:00 PM' ? '#33eaff': grey[900],
                boxShadow : selectedTimeSlot === '01:00 PM' ? '0px 0px 10px #33eaff': grey[900],
                textTransform: 'none',
                padding: '4px',
                width: 'auto',
                margin: '4px',
                fontSize: '1rem',
                display: 'flex',
                flexDirection: 'column'
              }} variant='outlined' onClick={() => handleSelectTimeSlot('01:00 PM')}>01:00 PM</Button>
              <Button sx={{
                color: selectedTimeSlot === '03:00 PM' ? '#33eaff': grey[900],
                borderColor: selectedTimeSlot === '03:00 PM' ? '#33eaff': grey[900],
                boxShadow : selectedTimeSlot === '03:00 PM' ? '0px 0px 10px #33eaff': grey[900],
                textTransform: 'none',
                padding: '4px',
                width: 'auto',
                margin: '4px',
                fontSize: '1rem',
                display: 'flex',
                flexDirection: 'column'
              }} 
              variant='outlined' onClick={() => handleSelectTimeSlot('03:00 PM')}>
                03:00 PM</Button>
              <Button sx={{
                color: selectedTimeSlot === '08:00 PM' ? '#33eaff': grey[900],
                borderColor: selectedTimeSlot === '08:00 PM' ? '#33eaff': grey[900],
                boxShadow : selectedTimeSlot === '08:00 PM' ? '0px 0px 10px #33eaff': grey[900],
                textTransform: 'none',
                padding: '4px',
                width: 'auto',
                margin: '4px',
                fontSize: '1rem',
                display: 'flex',
                flexDirection: 'column'
              }} 
              variant='outlined' onClick={() => handleSelectTimeSlot('08:00 PM')}>
                08:00 PM</Button>
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
                <Button
                 sx={{
                  color: selectedSeatTypes.includes('A1') ? '#33eaff': grey[900],
                  borderColor: selectedSeatTypes.includes('A1') ? '#33eaff': grey[900],
                  boxShadow : selectedSeatTypes.includes('A1') ? '0px 0px 10px #33eaff': grey[900],
                  textTransform: 'none',
                  padding: '4px',
                  width: 'auto',
                  margin: '4px',
                  fontSize: '1rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                  variant='outlined'
                  disableRipple={true}
                  onClick={() => handleSelectSeatType('A1')}
                  >
                  Type A1
                    <Input
                    type='number'
                    value={seatNumbers['A1'] || 0}
                    onChange={(event) => handleNumberChange('A1', event)}
                    InputProps={{ inputProps: { min: 0, max: 12 } }}
                  />
                </Button>

                <Button 
                sx={{
                    color: selectedSeatTypes.includes('A2') ? '#33eaff': grey[900],
                    borderColor: selectedSeatTypes.includes('A2') ? '#33eaff': grey[900],
                    boxShadow : selectedSeatTypes.includes('A2') ? '0px 0px 10px #33eaff': grey[900],
                    textTransform: 'none',
                    padding: '4px',
                    width: 'auto',
                    margin: '4px',
                    fontSize: '1rem',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                 variant='outlined'
                  disableRipple={true}
                  onClick={() => handleSelectSeatType('A2')}
                  > 
                Type A2 
                <Input
                type='number'
                value={seatNumbers['A2'] || 0}
                onChange={(event) => handleNumberChange('A2', event)}
                InputProps={{inputProps:{ min:0, max: 12}}}
                /></Button>

                <Button
                 sx={{
                    color: selectedSeatTypes.includes('A3') ? '#33eaff': grey[900],
                    borderColor: selectedSeatTypes.includes('A3') ? '#33eaff': grey[900],
                    boxShadow : selectedSeatTypes.includes('A3') ? '0px 0px 10px #33eaff': grey[900],
                    textTransform: 'none',
                    padding: '4px',
                    width: 'auto',
                    margin: '4px',
                    fontSize: '1rem',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  variant='outlined'
                   disableRipple={true}
                   onClick={() => handleSelectSeatType('A3')}> 
                Type A3
                <Input
                type='number'
                value={seatNumbers['A3'] || 0}
                onChange={(event) => handleNumberChange('A3', event)}
                InputProps={{inputProps:{ min:0, max: 12}}}
                /></Button>

                <Button 
                sx={{
                  color: selectedSeatTypes.includes('A4') ? '#33eaff': grey[900],
                  borderColor: selectedSeatTypes.includes('A4') ? '#33eaff': grey[900],
                  boxShadow : selectedSeatTypes.includes('A4') ? '0px 0px 10px #33eaff': grey[900],
                  textTransform: 'none',
                  padding: '4px',
                  width: 'auto',
                  margin: '4px',
                  fontSize: '1rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                 variant='outlined'
                  disableRipple={true}
                  onClick={() => handleSelectSeatType('A4')}
                  > 
                Type A4
                <Input
                type='number'
                value={seatNumbers['A4'] || 0}
                onChange={(event) => handleNumberChange('A4', event)}
                InputProps={{inputProps:{ min:0, max: 12}}}
                /></Button>

                <Button 
                sx={{
                  color: selectedSeatTypes.includes('D1') ? '#33eaff': grey[900],
                  borderColor: selectedSeatTypes.includes('D1') ? '#33eaff': grey[900],
                  boxShadow : selectedSeatTypes.includes('D1') ? '0px 0px 10px #33eaff': grey[900],
                  textTransform: 'none',
                  padding: '4px',
                  width: 'auto',
                  margin: '4px',
                  fontSize: '1rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                 variant='outlined'
                  disableRipple={true}
                  onClick={() => handleSelectSeatType('D1')}>
                   Type D1
                   <Input
                type='number'
                value={seatNumbers['D1'] || 0}
                onChange={(event) => handleNumberChange('D1', event)}
                InputProps={{inputProps:{ min:0, max: 12}}}
                /></Button>

                <Button 
                sx={{
                  color: selectedSeatTypes.includes('D2') ? '#33eaff': grey[900],
                  borderColor: selectedSeatTypes.includes('D2') ? '#33eaff': grey[900],
                  boxShadow : selectedSeatTypes.includes('D2') ? '0px 0px 10px #33eaff': grey[900],
                  textTransform: 'none',
                  padding: '4px',
                  width: 'auto',
                  margin: '4px',
                  fontSize: '1rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                 variant='outlined'
                  disableRipple={true}
                  onClick={() => handleSelectSeatType('D2')}
                  > 
                Type D2
                <Input
                type='number'
                value={seatNumbers['D2'] || 0}
                onChange={(event) =>handleNumberChange('D2', event)}
                InputProps={{inputProps:{ min:0, max: 12}}}
                /></Button>
                </Box>
              </Box>
              {/* button for booking and send the data to the backend */}
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
            <LastBookingDetails /> 
          </Box>
        </div>
      </Container>
    </div>
  )
}
