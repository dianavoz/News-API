const express = require("express");

const app = express();
app.use(express.json());
const errorHandlers = require("./errors/handlers.js");

const {
  getTopics,
  getArticleById,
} = require("./controllers/topics.controllers");

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

app.use(errorHandlers.handleCustomErrors);
app.use(errorHandlers.handlePsqlErrors);
app.use(errorHandlers.handleServerErrors);

module.exports = app;
