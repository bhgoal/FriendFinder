var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var newuser = req.body;

        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newuser.routeName = newuser.name.replace(/\s+/g, "").toLowerCase();

        console.log(newuser);

        friends.push(newuser);

        res.json(newuser);
    })
}