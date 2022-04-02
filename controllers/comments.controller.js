const {
  fetchCommentsByArticle,
  sendComment,
  removeComment,
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
    const { username, body } = req.body;

    const result = await Promise.all([
      await fetchArticleById(article_id),
      await sendComment(article_id, username, body),
    ]);

    res.status(201).send({ comment: result[1] });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { comment_id } = req.params;

    await removeComment(comment_id);

    res.status(204).send({});
  } catch (err) {
    next(err);
  }
};
