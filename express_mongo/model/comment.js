var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "post" },
    comment: String,
    datePosted: { type: Date, default: Date.now },
  },
  { collection: "comment", timestamp: true }
);

module.exports = mongoose.model("comment", commentSchema);
