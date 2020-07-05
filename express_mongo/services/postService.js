var postDb = require("../model/post.js");

postService = {};

postService.getFeed = () => {
  return postDb.getFeed().then((data) => {
    return data;
  });
};

postService.submitPost = (data) => {
  return postDb.submitPost(data).then((data) => {
    return data;
  });
};

module.exports = postService;
