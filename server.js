// Dependencies
var express = require("express");

// tells node that I am creating an "express" server
var app = express();

// sets an initial port
var PORT = process.env.PORT || 8080;

// sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
// points server to route files
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// LISTENER
// effectively starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});