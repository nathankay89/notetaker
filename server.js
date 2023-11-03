// Import necessary modules
const express = require('express');
const apiRoutes = require('./api'); // Import the apiRoutes module
const path = require('path');
const bodyParser = require('body-parser');// Import the bodyParser module
// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;
// Serve static files from the 'public' directory
app.use(express.static('public'));
// Use bodyParser to parse incoming JSON data
app.use(bodyParser.json()); // Use bodyParser to parse JSON data
// Use the apiRoutes module for routes starting with '/api'
app.use('/api', apiRoutes);
// Route to serve the 'notes.html' page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
// Default route that serves the 'index.html' page for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});