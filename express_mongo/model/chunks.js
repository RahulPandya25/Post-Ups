const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var GridfsSchema = new mongoose.Schema(
  {
    files_id: { type: Schema.Types.ObjectId, ref: "uploads.files" },
    n: { type: Number },
    data: { type: Buffer },
  },
  { strict: false }
);

module.exports = mongoose.model("uploads.chunks", GridfsSchema);
