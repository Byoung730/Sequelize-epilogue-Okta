"use strict";

const People = require("./people");
const Blogs = require("./blogs");
const Debits = require("./debits");
const Credits = require("./credits");

People.hasMany(Blogs);
Blogs.belongsTo(People);
People.hasMany(Debits);
Debits.belongsTo(People);
People.hasMany(Credits);
Credits.belongsTo(People);

module.exports = { Debits, People, Blogs, Credits };
