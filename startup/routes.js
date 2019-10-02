const express = require("express");
const statuses = require("../routes/statuses");
const collaborators = require("../routes/collaborators");
const answers = require("../routes/answers");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/statuses", statuses);
  app.use("/api/collaborators", collaborators);
  app.use("/api/answers", answers);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
