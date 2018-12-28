const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

// register for bodyParser. Using: request.body.[...]
app.use(bodyParser.urlencoded({ extended: false }));

// load to homepage
// app.get("/", (request, respone) => {
//     const question =JSON.parse(fs.readFileSync("./question.json",{encoding: "utf-8"}));
//     if (question.length == 0) respone.send("Chưa có câu hỏi nào");
//     else{
//         const randomQues = question[Math.floor(Math.random()*question.length)];
//         respone.send(`<h1> ${randomQues.content} </h1>
//         <form action="/vote${randomQues.id}" method="POST">
//         <button name="btnVote" value = "1">Đúng</button>
//         <button name="btnVote" value = "0">Sai</button>
//         </form>`);
//     }

// });

app.get("/", (request, respone) => {
    // const question =JSON.parse(fs.readFileSync("./question.json",{encoding: "utf-8"}));
    // if (question.length == 0) respone.send("Chưa có câu hỏi nào");
    // else{
        //const randomQues = question[Math.floor(Math.random()*question.length)];
        // respone.send(`<h1> ${randomQues.content} </h1>
        // <a href= "/vote/${randomQues.id}/yes"><button>Đúng</button></a>
        // <a href= "/vote/${randomQues.id}/no"><button>Sai</button></a>
        // `);
        respone.sendFile(__dirname + "/view/answer.html")
    //}

});
app.get("/question/:questionId", (req, res) => {
    const questionId = req.params.questionId;
    const question = JSON.parse(fs.readFileSync("./question.json", {encoding: "utf-8"}));
    res.send(question[questionId])
})


app.get("/api/random", (req, res) => {
    const question = JSON.parse(fs.readFileSync("./question.json", {encoding: "utf-8"}));
    const randomQuestion = question[Math.floor(Math.random()*question.length)];
    res.send({ question: randomQuestion });
});

app.get("/vote/:questionId/:vote", (req, res) => {
    const questions =JSON.parse(fs.readFileSync("./question.json",{encoding: "utf-8"}));
    const vote = req.params.vote;
    const questionId = req.params.questionId;
    questions.forEach((ques, index) => {
        if (ques.id == questionId) {
            if(vote == "yes")
            questions[index].yes++;
            else 
            questions[index].no++;
        }
    });
    fs.writeFileSync("./question.json",JSON.stringify(questions));
    res.redirect("/");
});



// app.post("/vote:idQues",(req,res)=>{
//     let idQues = req.params.idQues;     //get question id
       
//     const questions = JSON.parse(fs.readFileSync("./question.json",{encoding:"utf-8"})); 
//     questions.forEach((ques) => {
//         let vote = req.body.btnVote; 

//         if(ques.id == idQues){
//             vote == "1" ? ques.yes++ : ques.no++;
//         }
//     });
//     fs.writeFileSync("./question.json",JSON.stringify(questions));
//     res.redirect("/");
// });

//load to page/ask
app.get("/ask", (request, respone) => {
    respone.sendFile(__dirname + "/view/ask.html");
});

// set data to form
app.post("/addquestion", (req, res) => {
    const question =JSON.parse(fs.readFileSync("./question.json",{encoding: "utf-8"}));
    //console.log(question);
    const newQuestion = {
        content: req.body.questionContent,
        yes: 0,
        no: 0,
        id: question.length
    };
    question.push(newQuestion);
    //console.log(question);
    fs.writeFileSync("./question.json", JSON.stringify(question));
    res.redirect("/");
});


//set static public area
app.use(express.static(__dirname + '/view'));

app.listen(6969, (err) => {
    if (err) console.log(err);
    else console.log("OK");
})

