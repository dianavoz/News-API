const express = require("express");

const app = express();
const apiRouter = require("./routers/api.router");
const errorHandlers = require("./errors/handlers.js");

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

app.use(errorHandlers.handleCustomErrors);
app.use(errorHandlers.handlePsqlErrors);
app.use(errorHandlers.handleServerErrors);

module.exports = app;
