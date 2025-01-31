// Importing necessary modules
const express = require('express'); // Import Express.js framework
const cors = require('cors'); // Import CORS middleware for handling cross-origin requests
const dotenv = require('dotenv'); // Import dotenv for loading environment variables from a .env file
dotenv.config(); // Load environment variables from .env file into process.env
const cookieParser = require('cookie-parser');
const dbConnect = require('./Config/db');
const router = require('./Routes/BlogRouter');

const app = express(); // Initialize an Express application

// Middleware to parse incoming JSON requests
app.use(express.json()); // Allows the app to parse JSON data in the request body

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors({
  origin:true,  // Ensure this matches the frontend URL
  credentials: true  // This must be true to allow cookies to be sent
})); // This middleware allows handling requests from different origins

// Router define
app.use('/api/v1',router);

// Cookies middleware
app.use(cookieParser());

// Define a home page route
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!'); // Send a simple welcome message
});

// Define the port on which the server will run
const PORT = process.env.PORT || 8000;

// Start the server only after the database connection is established
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log a message when the server starts
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
});
