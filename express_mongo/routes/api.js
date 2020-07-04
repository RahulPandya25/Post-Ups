var express = require("express");
var router = express.Router();
var postService = require("../services/postService.js");

// ********************* //
// base api call: '/api' //
// ********************* //

router.get("/getFeed", function (req, res) {
  return postService.getFeed().then((data) => {
    res.json(data);
  });
});

module.exports = router;
