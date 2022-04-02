const db = require("../db/connection");

const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const app = require("../app.js");
const request = require("supertest");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("Topics", () => {
  describe("GET /api/topics", () => {
    test("200: responds with an an array of topic objects with slug and description properties", async () => {
      const { body } = await request(app).get("/api/topics").expect(200);

      const { topics } = body;
      expect(topics).toBeInstanceOf(Array);
      expect(topics).toHaveLength(3);

      topics.forEach((topic) => {
        expect(topic).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String),
        });
      });
    });
  });
});

describe("404, responds with an error when the path is not found", () => {
  test("404: responds with a message path not found", async () => {
    const { body } = await request(app).get("/api/notFound").expect(404);
    expect(body).toMatchObject({ message: "Path not found" });
  });
});

describe("Articles", () => {
  describe("GET /api/articles/:article_id", () => {
    test("200: responds with an article object", async () => {
      const article = 1;

      const { body } = await request(app)
        .get(`/api/articles/${article}`)
        .expect(200);

      expect(body.article).toBeInstanceOf(Object);
      expect(body.article).toMatchObject({
        article_id: article,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 100,
      });
    });
    test("404, responds with an error when the article is not found", async () => {
      const { body } = await request(app)
        .get(`/api/articles/999999`)
        .expect(404);

      expect(body).toMatchObject({
        msg: "No article found for article_id: 999999",
      });
    });
    test("400, responds with an error message when passed a bad article id", async () => {
      const { body } = await request(app)
        .get(`/api/articles/notAnId`)
        .expect(400);

      expect(body.msg).toBe("Invalid input");
    });
  });
  describe("GET /api/articles/:article_id (comment count)", () => {
    test("200: responds with the number of comments for the given article", async () => {
      const { body } = await request(app).get("/api/articles/1").expect(200);
      expect(body.article).toEqual({
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        created_at: "2020-07-09T20:11:00.000Z",
        body: "I find this existence challenging",
        votes: 100,
        comment_count: 11,
      });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    test("200, responds with the updated article", async () => {
      const articleUpdates = {
        inc_votes: 1,
      };
      const expected = {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 101,
      };

      const { body } = await request(app)
        .patch("/api/articles/1")
        .send(articleUpdates)
        .expect(200);

      expect(body.article).toMatchObject(expected);
    });
    test("200: decrements the current article's vote property by the given number ", async () => {
      const articleUpdates = {
        inc_votes: -100,
      };
      const expected = {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 0,
      };
      const { body } = await request(app)
        .patch("/api/articles/1")
        .send(articleUpdates)
        .expect(200);

      expect(body.article).toMatchObject(expected);
    });
    test("400: responds with a bad request error", async () => {
      const articleUpdates = {
        inc_votes: "er3t",
      };

      const { body } = await request(app)
        .patch("/api/articles/1")
        .send(articleUpdates)
        .expect(400);
      expect(body).toEqual({ msg: "Invalid input" });
    });
  });
  describe("GET /api/articles", () => {
    test("200: responds with array of article objects", async () => {
      const { body } = await request(app).get("/api/articles").expect(200);
      const { articles } = body;
      const expected = {
        author: expect.any(String),
        title: expect.any(String),
        article_id: expect.any(Number),
        topic: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        comment_count: expect.any(Number),
      };
      expect(articles).toBeInstanceOf(Array);
      articles.forEach((article) => {
        expect(article).toMatchObject(expected);
      });
    });
    test("200: articles are ordered by date by default", async () => {
      const { body } = await request(app).get("/api/articles").expect(200);
      const { articles } = body;

      expect(articles).toBeSorted("created_at", { descending: true });
    });
    test("200: articles are ordered by a passed sort_by query", async () => {
      const { body } = await request(app)
        .get("/api/articles?sort_by=title")
        .expect(200);
      const { articles } = body;

      expect(articles).toBeSorted("title", { descending: true });
    });
    test("200: articles are ordered by DESC by default", async () => {
      const { body } = await request(app).get("/api/articles").expect(200);
      const { articles } = body;

      expect(articles).toBeSorted("title", { descending: true });
    });
    test("200: articles are ordered in the ascending order when passing asc", async () => {
      const { body } = await request(app)
        .get("/api/articles?order=asc")
        .expect(200);
      const { articles } = body;

      expect(articles).toBeSorted("title", { ascending: true });
    });
    test("200: articles are filtered by the topic value specified in the query", async () => {
      const { body } = await request(app)
        .get("/api/articles?order=desc&sort_by=title&topic=cats")
        .expect(200);
      const { articles } = body;

      expect(articles).toBeSortedBy("topic");
    });

    test("400: for an invalid sort_by", async () => {
      const { body } = await request(app)
        .get("/api/articles?sort_by=not_a_column")
        .expect(400);

      expect(body.msg).toBe("Invalid sort_by");
    });
    test("400: for an invalid order", async () => {
      const { body } = await request(app)
        .get("/api/articles?order=not_a_column")
        .expect(400);

      expect(body.msg).toBe("Invalid order");
    });
    test("404: responds with a error when the topic is not found ", async () => {
      const { body } = await request(app)
        .get("/api/articles?order=desc&sort_by=title&topic=noTopic")
        .expect(404);

      expect(body.msg).toBe("Topic doesn't exist");
    });
  });
});

describe("Users", () => {
  describe("GET /api/users", () => {
    test("200:responds with array of objects", async () => {
      const expected = {
        username: expect.any(String),
      };
      const { body } = await request(app).get("/api/users").expect(200);
      const { users } = body;
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBe(4);
      users.forEach((user) => {
        expect(user).toMatchObject(expected);
      });
    });
  });
});
describe("Comments", () => {
  describe("GET /api/articles/:article_id/comments ", () => {
    test("200: responds with an an array of comments for the given article_id", async () => {
      const { body } = await request(app)
        .get("/api/articles/5/comments")
        .expect(200);
      expect(body.comments).toBeInstanceOf(Array);
      body.comments.forEach((comment) => {
        expect(comment).toMatchObject({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
        });
      });
    });
    test("200: responds with an empty array if the article exists but has no comments", async () => {
      const { body } = await request(app)
        .get("/api/articles/7/comments")
        .expect(200);
      expect(body.comments).toEqual([]);
    });
    test("404, responds with an error when the article is not found", async () => {
      const { body } = await request(app)
        .get(`/api/articles/999999/comments`)
        .expect(404);

      expect(body).toMatchObject({
        msg: "No article found for article_id: 999999",
      });
    });
    test("400, responds with an error message when article_id is not an integer", async () => {
      const { body } = await request(app)
        .get("/api/articles/notAnId/comments")
        .expect(400);

      expect(body.msg).toBe("Invalid input");
    });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: posts a comment and returns the newly added comment", async () => {
    const newComment = {
      username: "butter_bridge",
      body: "The beautiful thing about treasure is that it exists.",
    };

    const { body } = await request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201);

    const expected = {
      comment_id: expect.any(Number),
      author: "butter_bridge",
      body: "The beautiful thing about treasure is that it exists.",
      article_id: 2,
      votes: 0,
      created_at: expect.any(String),
    };

    expect(body.comment).toMatchObject(expected);
  });

  test("400: returns an error with the a message", async () => {
    const { body } = await request(app)
      .post("/api/articles/2/comments")
      .send({ username: "butter_bridge", body: "" })
      .expect(400);

    expect(body.msg).toBe("Please enter the comment");
  });
  test("400, responds with an error message when article_id is not an integer", async () => {
    const newComment = {
      username: "butter_bridge",
      body: "The beautiful thing about treasure is that it exists.",
    };
    const { body } = await request(app)
      .post("/api/articles/notAnId/comments")
      .send(newComment)
      .expect(400);

    expect(body.msg).toBe("Invalid input");
  });
  test("404, responds with an error when the article is not found", async () => {
    const newComment = {
      username: "butter_bridge",
      body: "The beautiful thing about treasure is that it exists.",
    };
    const { body } = await request(app)
      .post("/api/articles/999999/comments")
      .send(newComment)
      .expect(404);

    expect(body).toEqual({
      msg: "No article found for article_id: 999999",
    });
  });
  describe("DELETE /api/comments/:comment_id", () => {
    test("204, responds with status 204 and no content", async () => {
      const { body } = await request(app).delete("/api/comments/1").expect(204);
      expect(body).toEqual({});
      const comments = await db.query("SELECT * FROM comments");
      expect(comments.rows.length).toBe(17);
    });
    test("400: responds with an error when the comment_id is invalid", async () => {
      const { body } = await request(app)
        .delete("/api/comments/ai94")
        .expect(400);

      expect(body.msg).toBe("Invalid input");
    });
    test("404: returns an error if the comment is not found", async () => {
      const { body } = await request(app)
        .delete("/api/comments/99")
        .expect(404);

      expect(body.msg).toBe("Comment 99 does not exist!");
    });
  });
});
