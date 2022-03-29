const db = require("../db/connection");

exports.fetchArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${article_id}`,
        });
      }
      return article.rows[0];
    });
};

exports.updateArticle = (article_id, newVotes) => {
  const { inc_votes } = newVotes;
  return db
    .query(
      "UPDATE articles SET votes=votes+$2 WHERE article_id=$1 RETURNING*;",
      [article_id, inc_votes]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${article_id}`,
        });
      }
      return result.rows[0];
    });
};
