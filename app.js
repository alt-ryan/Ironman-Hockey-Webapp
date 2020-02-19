const express = require("express");
const app = express();
const request = require("request");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    let url = "https://statsapi.web.nhl.com/api/v1/people/8471735/stats?stats=careerRegularSeason";

    request(url, (err, response, body) => {
		if(!err && response.statusCode == 200) {
			var data = JSON.parse(body);
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