const db = require("../db/connection");

exports.fetchArticleById = async (article_id) => {
  const sql = `
    SELECT articles.*,
    COUNT(comments.body)::int AS comment_count 
    FROM articles 
   
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`;

  const article = await db.query(sql, [article_id]);

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

exports.fetchArticles = async (
  sort_by = "created_at",
  order = "DESC",
  topic
) => {
  sort_by = sort_by.toLowerCase();
  order = order.toUpperCase();

  const validColumns = [
    "title",
    "article_id",
    "topic",
    "votes",
    "created_at",
    "comment_count",
  ];
  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by" });
  }

  if (!["DESC", "ASC"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order" });
  }

  let queryValues = [];

  let queryStr = `
  SELECT name AS author,
   COUNT(comments.body)::int AS comment_count,
   articles.title,
   articles.article_id,
   articles.topic,articles.created_at,
   articles.votes
   FROM articles
   JOIN users ON articles.author=users.username
   JOIN comments ON articles.article_id=comments.article_id
   `;

  if (topic) {
    queryStr += `WHERE articles.topic=$1`;
    queryValues.push(topic);
  }

  queryStr += `GROUP BY articles.article_id,name
   ORDER BY ${sort_by} ${order};`;

  const articles = await db.query(queryStr, queryValues);

  if (articles.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Topic doesn't exist" });
  }

  return articles.rows;
};
