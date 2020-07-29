const mongoose = require("mongoose");
const { json } = require("body-parser");
var Schema = mongoose.Schema;
var GridfsSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    length: { type: Number, required: true },
    chunkSize: { type: Number, required: true },
    uploadDate: { type: Date, required: true },
    aliases: { type: String, required: false },
    metadata: { postId: { type: Schema.Types.ObjectId, ref: "post" } },
    md5: { type: String, required: true },
  },
  { strict: false }
);

module.exports = mongoose.model("uploads.files", GridfsSchema);
