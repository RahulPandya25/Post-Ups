var express = require("express");
var router = express.Router();
var path = require("path");
const { send } = require("process");
const multer = require("multer");
const crypto = require("crypto");
const gridFsStorage = require("multer-gridfs-storage");
const grid = require("gridfs-stream");
var mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://Mongo:mongoMan@cluster0.3wgsb.mongodb.net/post?retryWrites=true&w=majority";
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
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
      return res.end("Error uploading file.");
    } else {
      var jsonObj = req.files;
      req.files.forEach(function (f) {
        res.send(f);
      });
    }
  });
});

router.get("/getFiles", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }
    return res.json(files);
  });
});

router.get("/getFileByFileName/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);

    //   // Check if image
    //   if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
    //     // Read output to browser
    //   } else {
    //     res.status(404).json({
    //       err: "Not an image",
    //     });
    //   }
  });
});

router.get("/getFileByPostId/:postId", (req, res) => {
  gfs.files.findOne(
    { metadata: { postId: req.params.postId } },
    (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);

      //   // Check if image
      //   if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      //     // Read output to browser
      //   } else {
      //     res.status(404).json({
      //       err: "Not an image",
      //     });
      //   }
    }
  );
});

module.exports = router;
