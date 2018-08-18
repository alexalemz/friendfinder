// var path = require("path");

var friendsData = require("../data/friends");

module.exports = function(app) {
    // A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function(req, res) {
        // TO BE DONE
        res.json(friendsData);
    });

    // A POST routes `/api/friends`. This will be used to handle incoming survey results. 
    // This route will also be used to handle the compatibility logic. 
    app.post("/api/friends", function(req, res) {
        // TO BE DONE
        console.log("userInfo");
        console.log(req.body);

        var userInfo = req.body;

        // Find the most compatible friend.
        function mostCompatible(userInfo) {
            // Loop through each user. 
            // Calculate a total difference between the new user and the current user.
            // Keep track of the lowest total difference and which user had the lowest difference.
            var lowestTotalDifference;
            var mostCompatibleFriend;
            for (friendInfo of friendsData) {
                // Get the absolute difference between each score. Add it to the totalDifference
                let totalDifference;
                for (let i=0; i < userInfo.scores.length; i++) {
                    // Get the absolute difference between the two user's current score.
                    let difference = Math.abs(userInfo.scores[i] - friendInfo.scores[i]);
                    // Add it to totalDifference
                    totalDifference += difference;
                }

                // Set/Update the lowestTotalDifference and mostCompatibleFriend
                if (!lowestTotalDifference || totalDifference < lowestTotalDifference) {
                    lowestTotalDifference = totalDifference;
                    mostCompatibleFriend = friendInfo;
                }
            }

            return mostCompatibleFriend;
        }

        var mostCompatibleFriend = mostCompatible(userInfo);
        res.json(mostCompatibleFriend);
        
        // Add the new user's info to friendsData[]
        friendsData.push(userInfo);
    });

}

