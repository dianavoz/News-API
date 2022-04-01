const {
  fetchCommentsByArticle,
  sendComment,
} = require("../models/comments.model");

const { fetchArticleById } = require("../models/articles.model");

exports.getCommentsByArticle = async (req, res, next) => {
  try {
    const { article_id } = req.params;

    const result = await Promise.all([
      await fetchArticleById(article_id),
      await fetchCommentsByArticle(article_id),
    ]);

    res.status(200).send({ comments: result[1] });
  } catch (err) {
    next(err);
  }
};
exports.postComment = async (req, res, next) => {
  try {
    const { article_id } = req.params;

    const comment = await sendComment(article_id, req.body);

    res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
};
