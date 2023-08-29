// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const apiPostRoutes = require('./Routes/apiPostRouter'); 
const apiGetRoutes = require('./Routes/apiGetRouter');

// Load environment variables from .env
require('dotenv').config();

// Create an instance of the Express app
const app = express();

// Use bodyParser to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS with options from environment variable
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN, // Use the ALLOWED_ORIGIN from .env
  optionsSuccessStatus: 200,
}));

// Connect to MongoDB using the URI from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the defined API routes for POST requests
app.use('/api', apiPostRoutes);

// Use the defined API routes for GET requests
app.use('/api', apiGetRoutes);

// Get the port number from .env or default to 8080
const PORT = process.env.PORT || 8080;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
