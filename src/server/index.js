require("dotenv").config({ path: ".env.local" });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const epilogue = require("epilogue");
const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error("Authorization header is required");

    const accessToken = req.headers.authorization.trim().split(" ")[1];
    await oktaJwtVerifier.verifyAccessToken(accessToken);
    next();
  } catch (error) {
    next(error.message);
  }
});

const database = new Sequelize("church", "evrvj", "gangster", {
  dialect: "postgres",
  // storage: "./test.sqlite"
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const People = database.define("people", {
  id: {
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
  allow_texts: {
    type: Sequelize.BOOLEAN
  }
});

epilogue.initialize({ app: app, sequelize: database });

epilogue.resource({
  model: People,
  endpoints: ["/people", "/people/:id"]
});

const port = process.env.SERVER_PORT || 3001;

database.sync({ force: true }).then(() => {
  app.listen(3001, () => {
    console.log("Your Server is up and running");
  });
});
