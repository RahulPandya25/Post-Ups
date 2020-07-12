var Post = require("../model/post.js");
var Comment = require("../model/comment.js");
const { isNullOrUndefined } = require("util");

postService = {};

postService.getFeed = () => {
  return Post.find();
};

postService.submitPost = (data) => {
  return Post.create(data);
};

postService.getPostById = async (postId) => {
  await Post.findOneAndUpdate({ _id: postId }, { $inc: { views: 1 } });
  return Post.findById(postId).populate("comments");
};

postService.submitCommentOnPost = async (data) => {
  var commentObj = await Comment.create(data);
  await Post.updateOne(
    { _id: data.postId },
    { $push: { comments: commentObj._id } }
  );
  return Post.findById(data.postId).populate("comments");
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

postService.incrementLikeOnPost = (postId) => {
  Post.findOneAndUpdate({ _id: postId }, { $inc: { likes: 1 } });
  return Post.findById(postId).populate("comments");
};

module.exports = postService;
