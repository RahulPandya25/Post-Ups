var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const postSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    tags: Array,
    likes: Number,
    views: Number,
    dislikes: Number,
    isCommentEnabled: Boolean,
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    datePosted: { type: Date, default: Date.now },
  },
  { collection: "post", timestamp: true }
);

module.exports = mongoose.model("post", postSchema);
