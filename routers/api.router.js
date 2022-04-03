const apiRouter = require("express").Router();

const articlesRouter = require("./articles.router");
const commentsRouter = require("./comments.router");
const usersRouter = require("./users.router");
const topicsRouter = require("./topics.router");
const endPoints = require("../endpoints.json");

apiRouter.get("/", (req, res) => res.json({ endPoints }));

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
