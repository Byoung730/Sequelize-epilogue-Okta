const db = require("../db"); //this is required
const People = require("../db/models/people");

const router = require("express").Router();

router.get("/", function(req, res, next) {
  People.findAll()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

router.get("/:id", function(req, res, next) {
  People.findOne({
    where: { id: req.params.id }
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

module.exports = router;
