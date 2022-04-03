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

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticle);
articlesRouter.get("/:article_id/comments", getCommentsByArticle);
articlesRouter.post("/:article_id/comments", postComment);

module.exports = articlesRouter;
