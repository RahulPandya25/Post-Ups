var express = require("express");
var router = express.Router();
var postService = require("../services/postService.js");
var jsonData = require("./temp.json");

// ********************* //
// base api call: '/api' //
// ********************* //

router.get("/getFeed", function (req, res) {
  return postService.getFeed().then((data) => {
    res.json(data);
  });
});

router.post("/post", function (req, res) {
  return postService.submitPost(jsonData).then((data) => {
    res.json(data);
  });
});

module.exports = router;
