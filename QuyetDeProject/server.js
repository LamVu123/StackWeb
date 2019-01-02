const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/quyetde-17", { useNewUrlParser: true }, (err) => {
	if (err) console.log("Error DB connection!!!");
	else console.log("Connect DB success!!!");
});

const questionModel = require("./models/questionModel");


app.use(bodyParser.urlencoded({ extended: false }));

// request GET => http://localhost:6969/
app.get("/", (req, res) => {
	// Lay ra cau hoi random
	// const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8" }));
	// if(questions.length == 0) res.send("Chưa có câu hỏi nào!!!")
	// else {
	// 	const randomQuestion = questions[Math.floor(Math.random()*questions.length)];
	// 	// res.send(
	// 	// 	`<h1> ${randomQuestion.content} </h1>
	// 	// 	<a href="/vote/${randomQuestion.id}/yes"><button>Đúng/Có/Phải</button></a>
	// 	// 	<a href="/vote/${randomQuestion.id}/no"><button>Sai/Không/Trái</button></a>`
	// 	// );
	// 	res.sendFile(__dirname + "/view/answer.html");
	// }
	// "abc" + variable + "xyz" == `abc${variable}xyz`
	res.sendFile(__dirname + "/view/answer.html");
});

app.get("/api/random", (req, res) => {
	// const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8" }));
	// const randomQuestion = questions[Math.floor(Math.random()*questions.length)];
	// res.send({ question: randomQuestion }); // data = { question: randomQuestion }

	//MongoDB
	questionModel.find({}, function (err, data) {
		if (err) console.log(err);
		else {
			const randomQuestion = data[Math.floor(Math.random() * data.length)];
			res.send({ question: randomQuestion });
		}
	})
});

app.get("/api/question/:questionId", (req, res) => {
	const questionId = req.params.questionId;
	let questionFound;
	//let questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8" }));
	// questions.forEach(question => {
	// 	if (question.id == questionId) {
	// 		questionFound = question;
	// 	}
	// });
	questionModel.findById(questionId, function (err, data) {
		if (err) console.log(err);
		else {
			res.send({ question: data });
		}
	});
});

// /vote/questionId/yes-no
app.get("/vote/:questionId/:vote", (req, res) => {
	// param
	const questionId = req.params.questionId;
	const vote = req.params.vote; // yes || no
	//let questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8" }));
	questionModel.findById(questionId, function (err, question) {
			if (question.id == questionId) {
				vote == 'yes'?
				question.set({ yes: question.yes += 1 }):question.set({ no: question.no += 1 })
				question.save();
			} else console.log(err);
	});

	//fs.writeFileSync("./questions.json", JSON.stringify(questions));
	res.redirect("/");
});

//result page
app.get("/vote/:questionId", (req, res) => {
	// param
	// const questionId = req.params.questionId;
	// questionModel.findById(questionId, function (err, question) {
	// 		if (question.id == questionId) {
	// 			vote == 'yes'?
	// 			question.set({ yes: question.yes += 1 }):question.set({ no: question.no += 1 })
	// 			question.save();
	// 		} else console.log(err);
	// });

	//fs.writeFileSync("./questions.json", JSON.stringify(questions));
	res.redirect("/");
});
// /question/:questionId
app.get("/question/:questionId", (req, res) => {
	res.sendFile(__dirname + "/view/question.html");
});

// app.get("/vote/:questionId/no", (req, res) => {
// 	console.log(req.params.questionId);
// });

app.get("/ask", (req, res) => {
	res.sendFile(__dirname + "/view/ask.html");
});

app.post("/addquestion", (req, res) => {
	//const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8" }));
	//console.log(questions);
	const newQuestion = {
		content: req.body.questionContent
		// yes: 0,
		// no: 0,
		// id: questions.length
	};
	// questions.push(newQuestion);
	// console.log(questions);
	// fs.writeFileSync("./questions.json", JSON.stringify(questions));
	// res.redirect("/");
	questionModel.create(
		{
			//content:req.body.questionContent
			content: newQuestion.content
		},
		(err, questionCreated) => {
			if (err) console.log(err);
			else res.redirect("/");
		}
	)
});

// app.get("/about/ads", (req, res) => {
// 	// Show ra trang CV
// 	res.sendFile(__dirname + "/resource/index.html");
// });

// app.get("/style.css", (req, res) => {
// 	res.sendFile(__dirname + "/resource/style.css");
// });

// http://localhost:6969/about/....

app.use("/about", express.static("resource"));
app.use("/public", express.static("public"));

app.listen(6969, (err) => {
	if (err) console.log(err)
	else console.log("Server start success!");
});