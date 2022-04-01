const db = require("../db/connection");
// const { fetchUsers } = require("./users.model");
// const { fetchArticleById } = require("./articles.model");

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

exports.sendComment = async (article_id, username, body) => {
  if (!body) {
    return Promise.reject({ status: 400, msg: "Please enter the comment" });
  }

  if (!username) {
    return Promise.reject({
      status: 400,
      msg: "Please provide a valid username",
    });
  }

  const results = await db.query(
    `
      INSERT INTO comments
          (article_id,author, body)
      VALUES
          ($1, $2, $3)
      RETURNING *;`,
    [article_id, username, body]
  );

  return results.rows[0];
};
