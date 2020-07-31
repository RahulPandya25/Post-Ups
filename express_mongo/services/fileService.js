var Post = require("../model/post.js");
var File = require("../model/file.js");
var Chunk = require("../model/chunks.js");
const { isNullOrUndefined } = require("util");

fileService = {};

fileService.getChunkByPostId = async (postId) => {
  var file = await File.findOne({
    metadata: { postId: postId },
  });
  if (file != null) {
    var chunk = await Chunk.findOne({ files_id: file._id }).populate(
      "files_id"
    );
    return chunk;
  } else return null;
};

module.exports = fileService;
