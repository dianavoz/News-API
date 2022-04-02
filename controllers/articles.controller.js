const {
  fetchArticleById,
  updateArticle,
  fetchArticles,
} = require("../models/articles.model");

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const article = await fetchArticleById(article_id);

    res.status(200).send({ article: article });
  } catch (err) {
    next(err);
  }
};

exports.patchArticle = async (req, res, next) => {
  try {
    const { article_id } = req.params;

    const article = await updateArticle(article_id, req.body);

    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const { sort_by, order, topic } = req.query;

    const articles = await fetchArticles(sort_by, order, topic);

    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};
