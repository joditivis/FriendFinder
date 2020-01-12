// require list of friend entries
var foundFriend = require("../data/friends.js");

// exports api route
module.exports = function(app) {

    // return friends found in friends.js as json
    app.get("/api/friends", function(req, res) {
        res.json(foundFriend);
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
        for (var i = 0; i < foundFriend.length; i++) {

            // look through differences for each question
            var difference = 0;
            for (var j = 0; j < userResponses.length; j++) {
                difference += Math.abs(foundFriend[i].surveyNums[j] - userResponses[j]);
            }
            // if lowest difference, save friend match
            if (difference < totalDifference) {
                totalDifference = difference;
                matchName = foundFriend[i].name;
                matchPhoto = foundFriend[i].photo;
            }
        }
        // adds new user
        foundFriend.push(userInput);

        // send right response
        res.json({ status: "OK", matchName: matchName, matchPhoto: matchPhoto });
    });
};