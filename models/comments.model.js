const db = require("../db/connection");

exports.fetchCommentsByArticle = async (article_id) => {
  const comments = await db.query(
    `SELECT comment_id, comments.votes, comments.created_at, users.name AS author, comments.body
    FROM comments
    JOIN articles ON comments.article_id = articles.article_id
    JOIN users ON articles.author = users.username
    WHERE articles.article_id = $1;`,
    [article_id]
  );
  return comments.rows;
};
