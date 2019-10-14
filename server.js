// Variable used to grab from NPM dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");


// Port to be either the host's port or 3000
var PORT = process.env.PORT || 3000;

// Initialize NPM Express
var app = express();

// Sets up Express router
var router = express.Router();

// Directs the public folder as a static directory
app.use(express.static(_dirname + "/public"));

// Connect handlebars to our express application
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use NPM body-parser in the app
app.use(bodyParser.urlencoded({
    extended: false
}));

// All requests go through the router middleware
app.use(router);

// If app is deployed, use the deployed database. Otherwise use the local database called mongoHeadlines
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the mongo DB
mongoose.connect(MONGODB_URI);

// Listen on port
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
})