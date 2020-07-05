const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
const uri =
  "mongodb+srv://Mongo:mongoMan@cluster0.3wgsb.mongodb.net/post?retryWrites=true&w=majority";
Mongoose.Promise = global.Promise;
Mongoose.set("useCreateIndex", true);
const postCollection = {};

const newPostSchema = Schema(
  {
    Title: String,
    Category: String,
    Tags: Array,
    Likes: String,
    Comments: Array,
    Date: { type: Date, default: Date.now },
  },
  { collection: "post", timestamp: true }
);

postCollection.getFeed = () => {
  return Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((database) => {
      return database.model("post", newPostSchema);
    })
    .catch((error) => {
      let err = new Error("Could not connect to Database");
      err.status = 500;
      throw err;
    });
};

postCollection.submitPost = (postData) => {
  newPostSchema.create(postData, function (err, post) {
    return post;
  });
};

module.exports = postCollection;
