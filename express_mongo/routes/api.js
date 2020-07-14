var express = require("express");
var router = express.Router();
var postService = require("../services/postService.js");

// ********************* //
// base api call: '/api' //
// ********************* //

router.get("/getPost/:id", function (req, res) {
  return postService.getPostById(req.params.id).then((data) => {
    res.json(data);
  });
});

router.post("/submitPost", function (req, res) {
  return postService.submitPost(req.body).then((data) => {
    res.json(data);
  });
});

// **** Syntax ****
// {
//   "postId": <Post Id>
//   "comment": "<Your comment>"
// }
// ****************
router.post("/submitComment", function (req, res) {
  return postService.submitCommentOnPost(req.body).then((data) => {
    res.json(data);
  });
});

// **** Syntax ****
// {
//   "category": "<Your category>"
//   "sort": "<Your sorting query>"
//   "tag": "<Your tag>"
// }
// Tags must be in lowercase
// ****************
router.post("/getFeed", function (req, res) {
  return postService.getFeed(req.body).then((data) => {
    res.json(data);
  });
});

router.post("/updateLikes/:id", function (req, res) {
  return postService.incrementLikeOnPost(req.params.id).then((data) => {
    res.json(data);
  });
});

module.exports = router;
