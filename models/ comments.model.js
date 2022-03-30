const db = require("../db/connection");

exports.fetchCommentsByArticle = async (article_id) => {
  const comments = await db.query(
    `SELECT * FROM comments WHERE article_id=$1;`,
    [article_id]
  );

  return comments.rows;
};
