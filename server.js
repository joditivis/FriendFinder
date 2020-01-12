// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// tells node that I am creating an "express" server
var app = express();

// sets an initial port
var PORT = process.env.PORT || 8080;


// path to access css files
app.use(express.static(path.join(__dirname, "./app/css")));

// middleware for parsing incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// ROUTER
// points server to route files
require(path.join(__dirname, "./app/routing/apiRoutes"))(app);
require(path.join(__dirname, "./app/routing/htmlRoutes"))(app);

// LISTENER
// effectively starts the server, listening on PORT
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});