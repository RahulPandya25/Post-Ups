// ************** //
// Express Server //
// ************** //

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var sample = require("./routes/sample.js");
var app = express();

const ANGULAR_BUNDLE = "dist/Post-Ups";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));

//Put your angular dist folder here
app.use(express.static(path.join(__dirname, ANGULAR_BUNDLE)));
app.use("/", express.static(path.join(__dirname, ANGULAR_BUNDLE)));
app.use("/sample", sample);

// get req
app.get("/test", testFun);

function testFun(req, res) {
  res.send("testinggg");
}

module.exports = app;
