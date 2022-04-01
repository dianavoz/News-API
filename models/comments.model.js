const db = require("../db/connection");
const { fetchUsers } = require("./users.model");
const { fetchArticleById } = require("./articles.model");

exports.fetchCommentsByArticle = async (article_id) => {
  const comments = await db.query(
    `SELECT comment_id,
      comments.votes,
      comments.created_at,
      users.name AS author,
      comments.body
      FROM comments
      JOIN articles ON comments.article_id = articles.article_id
      JOIN users ON articles.author = users.username
      WHERE articles.article_id = $1;`,
    [article_id]
  );

  return comments.rows;
};

exports.sendComment = async (article_id, newComment) => {
  const { username, body } = newComment;

  await fetchUsers();
  await fetchArticleById(article_id);

  const results = await db.query(
    `
      INSERT INTO comments
          (author, body, article_id)
      VALUES
          ($1, $2, $3)
      RETURNING *;`,
    [username, body, article_id]
  );

  return results.rows[0];
};
