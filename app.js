var express = require("express");
var cbtController = require("./Controllers/cbtController");
var examController = require("./Controllers/examController");

var app = express();
var app2 = express();

//ejs view engine
app.set("view engine", "ejs");
app2.set("view engine", "ejs");

//for static files
app.use(express.static("./public"));
app2.use(express.static("./public"));

const PORT = process.env.PORT || 5000;
const PORT2 = process.env.PORT || 3300;

app.listen(PORT, "10.10.10.105"); //Use the ipv4 of your own system on the lan
app2.listen(PORT2, "10.10.10.105"); //Use the ipv4 of your own system on the lan

console.log("App Listening on port 5000");
console.log("App2 Listening on port 3300");

examController(app2);
cbtController(app);

//Lecturer server running on ipv4:5000/lecturer
//Students server running on ipv4:3300/students
