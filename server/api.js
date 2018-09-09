const api = (module.exports = require("express").Router());
const people = require("./people");
const blogs = require("./blogs");
const debits = require("./debits");
const credits = require("./credits");

api
  .get("/express-test", (req, res) => res.send({ express: "working!" })) //demo route to prove api is working
  .use("/people", people)
  .use("/blogs", blogs)
  .use("/debits", debits)
  .use("/credits", credits);
// No routes matched? 404.
api.use((req, res) => res.status(404).end());
