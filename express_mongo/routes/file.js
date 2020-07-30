var express = require("express");
var router = express.Router();
var path = require("path");
const { send } = require("process");
const multer = require("multer");
const crypto = require("crypto");
const gridFsStorage = require("multer-gridfs-storage");
const grid = require("gridfs-stream");
var mongoose = require("mongoose");
var Post = require("../model/post.js");
const mongoURI =
  "mongodb+srv://Mongo:mongoMan@cluster0.3wgsb.mongodb.net/post?retryWrites=true&w=majority";
// Create mongo DB connection
const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once("open", () => {
  // Initialize stream
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// ********************* //
// base api call: '/file' //
// ********************* //

router.post("/uploadFile/:id", (req, res) => {
  // Create storage engine
  const storage = new gridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = req.params.id + path.extname(file.originalname);
          const fileInfo = {
            metadata: {
              postId: req.params.id,
            },
            filename: filename,
            bucketName: "uploads",
          };
          resolve(fileInfo);
        });
      });
    },
  });
  const upload = multer({ storage }).any();

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      Post.deleteOne({ _id: req.params.postId }, function (err, results) {
        if (err) {
          return res.send("Error occured to delete the post");
        }
        return res.send(
          "Error while uploading a file. Post deleted successfully."
        );
      });
    } else {
      req.files.forEach(function (fileDetails) {
        Post.updateOne(
          { _id: fileDetails.metadata.postId },
          { $set: { mediaContent: fileDetails.id } }
        ).then(() => {
          res.send(fileDetails);
        });
      });
    }
  });
});

module.exports = router;
