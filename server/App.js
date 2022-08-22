const morgan = require('morgan');
const express = require('express');
const cors = require('cors')
const configRoutes = require('./routes');
const app = express();
const static = express.static(__dirname + '/images');

// CORS
app.use(cors());

// URL Parser and Encoder for Path and Query Parameters Decoding
app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('dev'));
app.use('/images', static);

// Apply Routes
configRoutes(app);

// Start the App
app.listen(3001, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3001');
});