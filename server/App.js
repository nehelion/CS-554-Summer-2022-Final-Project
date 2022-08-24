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

// Firebase Token Verification from Backend
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(require('../firebase-private-key.json')),
  projectId: 'cs554-6d42e'
});
async function decodeIDToken(req, res, next) {
    if(req.headers && req.headers.user) {
      const idToken = req.headers.user;
      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req['currentUser'] = decodedToken.name;
      } catch (err) {
        console.log(err);
      }
    } else {
      return res.status(403).json("Unauthorized Error");
    }
  next();
}

// For all routes except the image download, token in the header is necessary for authentication
app.use(!'/download/', decodeIDToken);

// Apply Routes
configRoutes(app);

// Start the App
app.listen(3001, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3001');
});