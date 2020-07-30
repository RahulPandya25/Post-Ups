var Post = require("../model/post.js");
var Comment = require("../model/comment.js");
var File = require("../model/file.js");
const { isNullOrUndefined } = require("util");

postService = {};

postService.submitPost = (data) => {
  return Post.create(data);
};

postService.getPostById = async (postId, updateViewCount) => {
  if (updateViewCount == "true")
    await Post.findOneAndUpdate({ _id: postId }, { $inc: { views: 1 } });
  return Post.findById(postId).populate("comments").populate("mediaContent");
};

postService.submitCommentOnPost = async (data) => {
  var commentObj = await Comment.create(data);
  await Post.updateOne(
    { _id: data.postId },
    { $push: { comments: commentObj._id } }
  );
  return Post.findById(data.postId).populate("comments");
};

postService.getFeed = (data) => {
  console.log(data);
  if (isNullOrUndefined(data.tag) && !isNullOrUndefined(data.category)) {
    var query = { category: data.category };
  } else if (!isNullOrUndefined(data.tag) && isNullOrUndefined(data.category)) {
    var query = { tags: data.tag };
  } else if (
    !isNullOrUndefined(data.tag) &&
    !isNullOrUndefined(data.category)
  ) {
    var query = { tags: data.tag, category: data.category };
  }

  return Post.find(query).sort(data.sort).populate("mediaContent");
};

postService.incrementLikeOnPost = async (postId) => {
  await Post.findOneAndUpdate({ _id: postId }, { $inc: { likes: 1 } });
  return Post.findById(postId).populate("comments");
};

module.exports = postService;
