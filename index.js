const express = require("express");
const app = express();
const server = require("http").Server(app);
const PORT = process.env.PORT || 3000;

const path = require("path");
const PUBLIC = "public/";

app.use(express.static(PUBLIC));

// listen
server.listen(PORT, () => {
  console.log(`Server Started and Running on PORT: ${PORT}`);
});

// get req
app.get("/", indexFun);
app.get("/test", testFun);

function indexFun(req, res) {
  var options = { root: path.join(__dirname, PUBLIC) };
  res.sendFile("index.html", options);
}
function testFun(req, res) {
  var options = { root: path.join(__dirname, PUBLIC) };
  res.sendFile("test.html", options);
}
