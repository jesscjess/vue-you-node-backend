const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

// Allow frontend to access backend
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Require Reviews routes
require('./app/routes/review.route.js')(app);

// Require Projects routes
require('./app/routes/project.route.js')(app);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())




mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to the backend"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port http://localhost:3000");
});