const db = require("../db"); //this is required
const Debits = require("../db/models/debits");
const People = require("../db/models/people");

const router = require("express").Router();

router.get("/", function(req, res, next) {
  Debits.findAll({
    include: [People]
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

router.get("/:transaction_id", function(req, res, next) {
  Debits.findOne({
    where: { transaction_id: req.params.id },
    include: [People]
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

module.exports = router;
