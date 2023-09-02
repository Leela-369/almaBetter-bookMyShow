// Import necessary dependencies from MUI (Material-UI)
import React from 'react';
import { Button, TextField, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

// Define a styled input using MUI's styling
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

// Component for rendering a movie button
export const MovieButton = ({ movieName, isSelected, onClick }) => {
  return (
    <Button
      sx={{
        // Define button styles based on selection state
        color: isSelected ? '#33eaff' : grey[900],
        borderColor: isSelected ? '#33eaff' : grey[900],
        boxShadow: isSelected ? '0px 0px 10px #33eaff' : grey[900],
        textTransform: 'none',
        padding: '4px',
        width: 'auto',
        margin: '4px',
        fontSize: '1rem',
        display: 'flex',
        flexDirection: 'column'
      }}
      variant="outlined"
      onClick={onClick}
    >
      {movieName}
    </Button>
  );
};

// Component for rendering a time slot button
export const TimeSlotButton = ({ timeSlot, isSelected, onClick }) => {
  return (
    <Button
      sx={{
        // Define button styles based on selection state
        color: isSelected ? '#33eaff' : grey[900],
        borderColor: isSelected ? '#33eaff' : grey[900],
        boxShadow: isSelected ? '0px 0px 10px #33eaff' : grey[900],
        textTransform: 'none',
        padding: '4px',
        width: 'auto',
        margin: '4px',
        fontSize: '1rem',
        display: 'flex',
        flexDirection: 'column'
      }}
      variant="outlined"
      onClick={onClick}
    >
      {timeSlot}
    </Button>
  );
}

// Component for rendering a seat type button with an input field
export const SeatTypeButton = ({
  seatType,
  isSelected,
  onClick,
  value,
  onChange,
}) => {
  return (
    <Button
      sx={{
        // Define button styles based on selection state
        color: isSelected ? '#33eaff' : grey[900],
        borderColor: isSelected ? '#33eaff' : grey[900],
        boxShadow: isSelected ? '0px 0px 10px #33eaff' : grey[900],
        textTransform: 'none',
        padding: '4px',
        width: 'auto',
        margin: '4px',
        fontSize: '1rem',
        display: 'flex',
        flexDirection: 'column',
      }}
      variant="outlined"
      disableRipple={true}
      onClick={onClick}
    >
      {seatType}
      {/* Input field for seat number with min and max limits */}
      <Input
        type="number"
        value={value || 0}
        onChange={onChange}
        InputProps={{ inputProps: { min: 0, max: 12 } }}
      />
    </Button>
  );
};
