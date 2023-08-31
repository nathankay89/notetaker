const express = require('express');
const path = require('path');
const fs = require('fs');
const { clog } = require('./middleware/clog');
const api = require('./routes/api.js'); 

const PORT = process.env.PORT || 3000;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname,'/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });