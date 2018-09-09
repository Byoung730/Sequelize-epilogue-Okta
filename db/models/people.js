"use strict";

const Sequelize = require("sequelize");
const db = require("../index.js");

// category: Sequelize.ARRAY(Sequelize.STRING),

const People = db.define("people", {
  person_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  staff: {
    type: Sequelize.BOOLEAN
  },
  photos: {
    type: Sequelize.BLOB
  },
  gender: {
    type: Sequelize.STRING
  },
  date_joined: {
    type: Sequelize.DATEONLY
  },
  date_baptized: {
    type: Sequelize.DATEONLY
  },
  birthdate: {
    type: Sequelize.DATEONLY
  },
  date_deceased: {
    type: Sequelize.DATEONLY
  },
  marital_status: {
    type: Sequelize.ENUM(
      "single",
      "engaged",
      "married",
      "divorced",
      "widow/widower",
      "separated"
    )
  },
  number_private: {
    type: Sequelize.BOOLEAN
  },
  allow_texts: {
    type: Sequelize.BOOLEAN
  },
  allow_email: {
    type: Sequelize.BOOLEAN
  },
  created_at: {
    type: Sequelize.DATEONLY
  },
  updated_at: {
    type: Sequelize.DATEONLY
  }
});

module.exports = People;
