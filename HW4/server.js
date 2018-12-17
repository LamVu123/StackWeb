const express = require("express");
const app = express();

app.get("/",(request, respone) => {
    //respone.send("ABCXYZ");       // không request và respone > 1 lần trong cùng 1 port
    respone.sendFile(__dirname + "/view/index.html")
});

app.use(express.static(__dirname + '/view'));
// app.get("/",(request, respone) => {
//     var cssFile = fs.readFileSync("./style.css", {encoding: "utf-8"});
//     respone.write(cssFile);
// });
//request Get localhost port 6969
// app.get("/",(request, respone) => {
//     //respone.send("ABCXYZ");       // không request và respone > 1 lần trong cùng 1 port
//     respone.send(JSON.stringify({
//         a:5,
//         b:6
//     }));
// })

app.listen(6969, (err) => {
    if (err) console.log(err);
    else console.log("OK");
})

