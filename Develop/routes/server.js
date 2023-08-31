const express = require('express');
const path = require('path');
const fs = require('fs');
const { clog } = require('./middleware/clog');
const api = require('./routes/api.js'); 

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));