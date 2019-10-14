// Variable used to grab from NPM dependencies
var express = require("express");
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

// Listen on port
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
})