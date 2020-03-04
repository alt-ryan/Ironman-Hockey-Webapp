const express = require("express");
const app = express();
const request = require("request");

app.set("view engine", "ejs");
app.use(express.static("public"));

var data = [];
var url = "";
var activeStreakLeader = "";
var activeStreakLeaderID = "";
var activeStreak = 0;
var streakRecord = 0;
var gamesToGo = 0;


// Home page
app.get("/", (req, res) => {

    // Current list of longest streaks (active and inactive)
    url = "https://records.nhl.com/site/api/games-played-streak-skaters?sort=streak&dir=DESC";

    request(url, (err, response, body) => {
		if(!err && response.statusCode == 200) {
            let recordList = JSON.parse(body);
            data.push(recordList.data.slice(0,10));
            streakRecord = recordList.data[0].streak;
            // Get the active streak leader
            recordList.data.some((player, index, _arr) => {
                if (player.activePlayer === true){
                    activeStreakLeader = player.firstName + " " + player.lastName;
                    activeStreak = player.streak;
                    activeStreakLeaderID = player.playerId;
                    gamesToGo = streakRecord - activeStreak;
                    // Update url to search for the current active streak leader
                    url = "https://statsapi.web.nhl.com/api/v1/people/" + activeStreakLeaderID + "/stats?stats=careerRegularSeason";
                    
                    return activeStreakLeader !== "";
                }
            });
        }
        else {
            res.render("errorPage");
        }

        //todo: refactor this for better asynchronous handling
        //      nesting requests isn't best practice. doing it for now for working build
        // Request to get info on active streak leader
        request(url, (err, response, body) => {
            if(!err && response.statusCode == 200) {
                let player = JSON.parse(body);
                data.push(player.stats[0].splits[0].stat.points);
                res.render("home", {
                    data: data, 
                    activeStreakLeader: activeStreakLeader,
                    activeStreak: activeStreak,
                    gamesToGo: gamesToGo
                });
            }
            else {
                res.render("errorPage");
            }
        });
    });
});

// Start the server
app.listen(3000,() => {
	console.log("Listening on port 3000");
});