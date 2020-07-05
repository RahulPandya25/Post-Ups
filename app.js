// ************** //
// Express Server //
// ************** //

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var api = require("./express_mongo/routes/api.js");
var app = express();

var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
mongoose
  .connect(
    "mongodb+srv://Mongo:mongoMan@cluster0.3wgsb.mongodb.net/post?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      promiseLibrary: require("bluebird"),
    }
  )
  .then(() => console.log("DB connection succesful"))
  .catch((err) => console.error(err));

const ANGULAR_BUNDLE = "dist/Post-Ups";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));

//make angular dist folder available for public
app.use(express.static(path.join(__dirname, ANGULAR_BUNDLE)));

// all the api requests
app.use("/api", api);

// all the other request should be redirected to angular app
// app.use("*", express.static(path.join(__dirname, ANGULAR_BUNDLE)));

module.exports = app;
