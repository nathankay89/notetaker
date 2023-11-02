const express = require('express');
const path = require('path');
const api = require('./api'); 
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware 
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

// GET Route for feedback page
app.get('/info', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/info.html'))
);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });