var mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    Title: String,
    Category: String,
    Tags: Array,
    Likes: Number,
    Comments: Array,
    Date: { type: Date, default: Date.now },
  },
  { collection: "post", timestamp: true }
);

module.exports = mongoose.model("post", postSchema);
