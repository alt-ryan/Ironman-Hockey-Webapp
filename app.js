const express = require("express");
const app = express();
const request = require("request");

app.set("view engine", "ejs");

var data = [];

app.get("/", (req, res) => {
    let url = "https://statsapi.web.nhl.com/api/v1/people/8471735/stats?stats=careerRegularSeason";

    request(url, (err, response, body) => {
		if(!err && response.statusCode == 200) {
            var yandle = JSON.parse(body);
            data.push(yandle.stats[0].splits[0].stat.games);
			//res.render("home", {data: data});
        }
        else {
            res.render("errorPage");
        }
    });

    url = "https://records.nhl.com/site/api/games-played-streak-skaters?sort=streak&dir=DESC";

    request(url, (err, response, body) => {
		if(!err && response.statusCode == 200) {
            var recordList = JSON.parse(body);
            data.push(recordList.data);
			res.render("home", {data: data});
        }
        else {
            res.render("errorPage");
        }
    });
})

app.listen(3000,() => {
	console.log("Listening on port 3000");
});