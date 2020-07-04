var postDB = require("../model/post.js");

postService = {};

postService.getFeed = () => {
  return postDB.getFeed().then((data) => {
    return data;
  });
};

module.exports = postService;
