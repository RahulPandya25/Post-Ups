var Post = require("../model/post.js");
var File = require("../model/file.js");
var Chunk = require("../model/chunks.js");
var auditPost = require("../aggregation/auditPost.json");
var auditFile = require("../aggregation/auditFile.json");
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

fileService.getFilesForPosts = async (posts) => {
  var files = [];

  for await (post of posts) {
    var file = await fileService.getChunkByPostId(post._id);
    files.push(file);
  }

  return files;
};

module.exports = fileService;
