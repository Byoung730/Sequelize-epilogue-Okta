const db = require("../db"); //this is required
const Blogs = require("../db/models/blogs");
const People = require("../db/models/people");

const router = require("express").Router();

router.get("/", function(req, res, next) {
  Blogs.findAll({
    include: [People]
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

router.get("/:blog_id", function(req, res, next) {
  Blogs.findOne({
    where: { id: req.params.id },
    include: [People]
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

module.exports = router;
