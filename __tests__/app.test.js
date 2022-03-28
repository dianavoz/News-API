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
