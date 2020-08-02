var Post = require("../model/post.js");
var Comment = require("../model/comment.js");
var File = require("../model/file.js");
var Chunk = require("../model/chunks.js");
var auditChunk = require("../aggregation/auditChunks.json");
var auditFile = require("../aggregation/auditFile.json");
var unwind = require("../aggregation/unwind.json");
const { isNullOrUndefined } = require("util");
var defaults = require("../../src/assets/defaults.json");
var fileService = require("../services/fileService.js");
const Mongoose = require("mongoose");

postService = {};

postService.submitPost = (data) => {
  return Post.create(data);
};

postService.getPostById = async (postId, updateViewCount) => {
  if (updateViewCount == "true")
    await Post.findOneAndUpdate({ _id: postId }, { $inc: { views: 1 } });

  var post = await Post.aggregate([
    { $match: { _id: Mongoose.Types.ObjectId(postId) } },
    auditFile, unwind, auditChunk,
  ]);

  await Post.populate(post[0], { path: "comments" });

  return post[0];
};

postService.submitCommentOnPost = async (data) => {
  var post = await Post.findOne({ _id: data.postId });
  if (post.isCommentEnabled == true) {
    var commentObj = await Comment.create(data);
    await Post.updateOne(
      { _id: data.postId },
      { $push: { comments: commentObj._id } }
    );
    return Post.findById(data.postId).populate("comments");
  } else {
    return "Comments are disabled for this post";
  }
};

postService.getFeed = async (data) => {
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
  var posts = await Post.aggregate([
    auditFile, unwind, auditChunk,
    { $sort: data.sort },
  ]);

  // var posts = await Post.find(query).sort(data.sort);

  return posts;
};

postService.incrementLikeOnPost = async (postId) => {
  await Post.findOneAndUpdate({ _id: postId }, { $inc: { likes: 1 } });
  return Post.findById(postId).populate("comments");
};

module.exports = postService;
