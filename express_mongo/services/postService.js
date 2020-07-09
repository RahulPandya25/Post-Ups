var Post = require("../model/post.js");
const { isNullOrUndefined } = require("util");

postService = {};

postService.getFeed = () => {
  return Post.find();
};

postService.submitPost = (data) => {
  return Post.create(data);
};

postService.getPostById = (postId) => {
  return Post.findById(postId).then((data) => {
    return data;
  });
};

postService.submitCommentOnPost = (postId, data) => {
  return Post.findById(postId).then((post) => {
    post.comments.push({ comment: data.comment, datePosted: Date.now() });
    Post.findByIdAndUpdate(postId, post);
    return post;
  });
};

postService.filterThroughPosts = (data) => {
  if (
    (isNullOrUndefined(data.tag) ||
      (!isNullOrUndefined(data.tag) && data.tag === "")) &&
    !isNullOrUndefined(data.category)
  ) {
    var query = { category: data.category };
  } else if (
    !isNullOrUndefined(data.tag) &&
    (isNullOrUndefined(data.category) ||
      (!isNullOrUndefined(data.category) && data.category === ""))
  ) {
    var query = { tags: data.tag };
  } else if (
    !isNullOrUndefined(data.tag) &&
    !isNullOrUndefined(data.category)
  ) {
    var query = { tags: data.tag, category: data.category };
  }
  return Post.find(query);
};

module.exports = postService;
