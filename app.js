const express = require("express");

const app = express();
app.use(express.json());

const { getTopics } = require("./controllers/topics.controllers");

app.get("/api/topics", getTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Error!!" });
});

module.exports = app;
