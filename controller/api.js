var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("api called!!");
});

router.get("/1", function (req, res, next) {
  res.send("api 1 called!!");
});

router.get("/2", function (req, res, next) {
  res.send("api 2 called!!");
});

router.get("/3", function (req, res, next) {
  res.send("api 3 called!!");
});

module.exports = router;
