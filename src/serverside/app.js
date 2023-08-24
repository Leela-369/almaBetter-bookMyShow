const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const apiPostRoutes = require('./Routes/apiPostRouter'); 
const apiGetRoutes = require('./Routes/apiGetRouter');

require('dotenv').config();  // Load environment variables from .env

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN, // Use the ALLOWED_ORIGIN from .env
  optionsSuccessStatus: 200,
}));

mongoose.connect(process.env.MONGODB_URI, {  // Use the MONGODB_URI from .env
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', apiPostRoutes);
app.use('/api', apiGetRoutes);

const PORT = process.env.PORT || 8080;  // Use the PORT from .env or default to 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
