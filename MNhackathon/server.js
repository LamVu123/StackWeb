const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/gameHKT", { useNewUrlParser: true }, (err) => {
	if (err) console.log("Error DB connection!!!");
	else console.log("Connect DB success!!!");
});

const gameModel = require("./models/gameModel.js");
app.use(bodyParser.urlencoded({ extended: false }));


//load to home page - add new game (Screen 1)
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/view/CreateScreen.html");
});
//load new score
app.post("/api/gameCreated/score/:gameId", (req, res) => {
	const gameId = req.params.gameId;
	arrItem = req.body.id.split("r");
	newScore = req.body.score;
	gameModel.findById(gameId, function (err, gameCreated) {
		if (err) console.log(err);
		else {
			
			switch(arrItem[0]){
				case "1":
				{
					var arrScore;
					arrScore = gameCreated.player1.score;
					arrScore[arrItem[1]-1] = parseInt(newScore);
					gameModel.findByIdAndUpdate(gameId, { player1  : { name: gameCreated.player1.name, score: arrScore } }, function (err, game) {
						if (err) console.log(err);
					});
					break;
				}
				case "2":
				{
					var arrScore;
					arrScore = gameCreated.player2.score;
					arrScore[arrItem[1]-1] = parseInt(newScore);
					gameModel.findByIdAndUpdate(gameId, { player2  : { name: gameCreated.player2.name, score: arrScore } }, function (err, game) {
						if (err) console.log(err);
					});
					break;
				}
				case "3":
				{
					var arrScore;
					arrScore = gameCreated.player3.score;
					arrScore[arrItem[1]-1] = parseInt(newScore);
					gameModel.findByIdAndUpdate(gameId, { player3  : { name: gameCreated.player3.name, score: arrScore } }, function (err, game) {
						if (err) console.log(err);
					});
					break;
				}
				case "4":
				{
					var arrScore;
					arrScore = gameCreated.player4.score;
					arrScore[arrItem[1]-1] = parseInt(newScore);
					gameModel.findByIdAndUpdate(gameId, { player4  : { name: gameCreated.player4.name, score: arrScore } }, function (err, game) {
						if (err) console.log(err);
					});
					break;
				}
				default: break;
			}
			res.send({ gameCreated: gameCreated });
		}
	});
});

// get data from form and save to DB 
app.post("/addgame", (req, res) => {
	gameModel.create(
		{
			player1: { name: req.body.player1, score: [] },
			player2: { name: req.body.player2, score: [] },
			player3: { name: req.body.player3, score: [] },
			player4: { name: req.body.player4, score: [] },
		},
		(err, gameCreated) => {
			if (err) {
				console.log(err);
			}
			res.redirect("/game/" + gameCreated._id);
		}
	);
});

//load ScreenPlay (Screen 2) by ID of object contain player's info
app.get("/game/:id", (req, res) => {
	res.sendFile(__dirname + "/view/PlayScreen.html");
});
app.get("/api/gameCreated/:id", (req, res) => {
	//event.preventDefault();
	const gameId = req.params.id;
	gameModel.findById(gameId, function (err, gameCreated) {
		if (err) console.log(err);
		else {
			res.send({ gameCreated: gameCreated });
		}
	});
});


app.use("/css", express.static(__dirname + "/view/css"));
app.use("/js", express.static(__dirname + "/view/js"));
app.listen(8080, (err) => {
	if (err) console.log(err)
	else console.log("Server start success!");
});

