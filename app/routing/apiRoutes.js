var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/home", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        friends.push(req.body.surveyNums);
        res.json(true);
    });
}