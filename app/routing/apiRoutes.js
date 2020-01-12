var path = require("path");

// require list of friend entries
var friends = require("../data/friends.js");

// exports api route
module.exports = function(app) {

    // return friends found in friends.js as json
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    // add new friend entry
    app.post("/api/friends", function(req, res) {
        
        // receive user details (name, photo, survey numbers)
        var userInput = req.body;
        var userResponses = userInput.surveyNums;

        // friend match
        var matchName = "";
        var matchPhoto = "";
        var totalDifference = 50; // make initial value big for comparison

        // look through all existing friends
        for (var i = 0; i < friends.length; i++) {

            // look through differences for each question
            var difference = 0;
            for (var j = 0; j < userResponses.length; j++) {
                difference += Math.abs(friends[i].surveyNums[j] - userResponses[j]);
            }
            // if lowest difference, save friend match
            if (difference < totalDifference) {
                totalDifference = difference;
                matchName = friends[i].name;
                matchPhoto = friends[i].photo;
            }
        }
        // adds new user
        friends.push(userInput);

        // send right response
        res.json({ status: "OK", matchName: matchName, matchPhoto: matchPhoto });
    });
};