var postCollection = require("../utilities/postCollection.js");

var postDb = {};

postDb.getFeed = () => {
  return postCollection.getFeed().then((model) => {
    return model.find({}, { _id: 0 }).then((data) => {
      return data;
    });
  });
};

postDb.submitPost = (postData) => {
  return postCollection.submitPost(postData).then((data) => {
    return data;
  });
};
module.exports = postDb;
