var mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    tags: Array,
    likes: Number,
    dislikes: Number,
    isCommentEnabled: Boolean,
    comments: Array,
    datePosted: { type: Date, default: Date.now },
  },
  { collection: "post", timestamp: true }
);

module.exports = mongoose.model("post", postSchema);
