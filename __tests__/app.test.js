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
    test("200: responds with an an array of topic objects with slug and description properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
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
});
describe("404, responds with an error when the path is not found", () => {
  test("404: responds with a message path not found", () => {
    return request(app)
      .get("/api/notFound")
      .expect(404)
      .then((res) => {
        expect(res.body).toMatchObject({ message: "Path not found" });
      });
  });
});

describe("Articles", () => {
  describe("GET /api/articles/:article_id", () => {
    test("200: responds with an article object", () => {
      const article = 1;
      return request(app)
        .get(`/api/articles/${article}`)
        .expect(200)
        .then(({ body }) => {
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
    });
    test("404, responds with an error when the article is not found", () => {
      return request(app)
        .get(`/api/articles/999999`)
        .expect(404)
        .then((result) => {
          expect(result.body).toMatchObject({
            msg: "No article found for article_id: 999999",
          });
        });
    });
    test("400, responds with an error message when passed a bad article id", () => {
      return request(app)
        .get(`/api/articles/notAnId`)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid input");
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    test("200, responds with the updated article", () => {
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
      return request(app)
        .patch("/api/articles/1")
        .send(articleUpdates)
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toMatchObject(expected);
        });
    });
    test("200: decrements the current article's vote property by the given number ", () => {
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
      return request(app)
        .patch("/api/articles/1")
        .send(articleUpdates)
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toMatchObject(expected);
        });
    });
    test("400: responds with a bad request error", () => {
      const articleUpdates = {
        inc_votes: "er3t",
      };

      return request(app)
        .patch("/api/articles/1")
        .send(articleUpdates)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Invalid input" });
        });
    });
  });
});
