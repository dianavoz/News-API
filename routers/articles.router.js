const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticle,
  getArticles,
} = require("../controllers/articles.controller");

const {
  getCommentsByArticle,
  postComment,
} = require("../controllers/comments.controller");

articlesRouter
  .get("/", getArticles)
  .get("/:article_id", getArticleById)
  .patch("/:article_id", patchArticle)
  .get("/:article_id/comments", getCommentsByArticle)
  .post("/:article_id/comments", postComment);

module.exports = articlesRouter;
