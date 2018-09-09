const db = require("../db"); //this is required
const Credits = require("../db/models/credits");
const People = require("../db/models/people");

const router = require("express").Router();

router.get("/", function(req, res, next) {
  Credits
    .findAll
    //   {
    //   include: [People]
    // }
    ()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

router.get("/:id", function(req, res, next) {
  Credits.findOne({
    where: { id: req.params.id }
    // ,
    // include: [People]
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

module.exports = router;
