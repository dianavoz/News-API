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
  test("404: responds with a message path not found", () => {
    return request(app)
      .patch("/api/notFound")
      .expect(404)
      .then((res) => {
        expect(res.body).toMatchObject({ message: "Path not found" });
      });
  });
});
describe("GET /api/articles/:article_id", () => {
  test("200: responds with an article object", () => {
    const article = 1;
    return request(app)
      .get(`/api/articles/${article}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Object);
        expect(body.articles).toMatchObject({
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
  test("404 article not found", () => {
    return request(app)
      .get(`/api/articles/999999`)
      .expect(404)
      .then((result) => {
        expect(result.body).toMatchObject({ msg: "Not Found!" });
      });
  });
});
