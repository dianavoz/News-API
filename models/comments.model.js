const db = require('../db/connection');

exports.fetchCommentsByArticle = async (article_id) => {
  const comments = await db.query(
    `SELECT comment_id,
      comments.votes,
      comments.created_at,
      users.username AS author,
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
    return Promise.reject({ status: 400, msg: 'Please enter the comment' });
  }

  if (!username) {
    return Promise.reject({
      status: 400,
      msg: 'Please provide a valid username',
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

exports.removeComment = async (comment_id) => {
  const sql = `DELETE FROM comments
  WHERE comment_id = $1 RETURNING *`;

  const results = await db.query(sql, [comment_id]);
  if (results.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `Comment ${comment_id} does not exist!`,
    });
  }

  return results.rows;
};
