var Post = require("../model/post.js");

postService = {};

postService.getFeed = () => {
  return Post.find({}, { _id: 0 }).then((data) => {
    return data;
  });
};

postService.submitPost = (data) => {
  return Post.create(data);
};

module.exports = postService;
