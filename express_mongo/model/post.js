var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const postSchema = new mongoose.Schema(
  {
    title: String,
    textContent: String,
    category: String,
    tags: Array,
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    isCommentEnabled: { type: Boolean, default: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    datePosted: { type: Date, default: Date.now },
  },
  { collection: "post", timestamp: true }
);

module.exports = mongoose.model("post", postSchema);
