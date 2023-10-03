const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());   // parse request body. Will call next() in it

app.use('/uploads/images', express.static(path.join('uploads', 'images')));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

// routes starting with /api/places, not exact match
app.use('/api/places', placesRoutes); 
app.use('/api/users', usersRoutes);

// // combine frontend server and backend server at one host
// app.use(express.static(path.join('public')));

// app.use((req, res, next) => {
//    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

// for separate frontend and backend servers. unknown routes
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  // if there was a file uploaded, multer will add the file attribute to the req object
  if (req.file) {
    // if there was a file uploaded but an error occurs, delete the file
    fs.unlink(req.file.path, err => { // the second arg is called when the deletion is done
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e0ttq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
