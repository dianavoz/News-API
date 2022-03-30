const db = require("../db/connection");

exports.fetchArticleById = async (article_id) => {
  const article = await db.query(
    "SELECT * FROM articles WHERE article_id = $1;",
    [article_id]
  );

  if (article.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id: ${article_id}`,
    });
  }
  return article.rows[0];
};

exports.updateArticle = async (article_id, newVotes) => {
  const { inc_votes } = newVotes;
  const article = await db.query(
    "UPDATE articles SET votes=votes+$2 WHERE article_id=$1 RETURNING*;",
    [article_id, inc_votes]
  );

  if (article.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id: ${article_id}`,
    });
  }
  return article.rows[0];
};
