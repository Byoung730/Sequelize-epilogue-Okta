require("dotenv").config({ path: ".env.local" });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const epilogue = require("epilogue");
const OktaJwtVerifier = require("@okta/jwt-verifier");
const moment = require("moment");

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`
});

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"], // PEOPLE?
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "contentType",
    "Content-Type",
    "Accept",
    "Authorization"
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// if ( process.env.NODE_ENV !== 'production' ) {
const app = express();
const middleware = cors({
  origin: (origin, callback) => {
    callback(null, true);
  }
});
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Credentials", true);
  return middleware(req, res, next);
});
// localUser = process.env.USER;
// }

// app.use(cors(corsOptions));
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

// var model = sequelize.define("model", {
//   syncedAt: { type: Sequelize.DATE }
// });

// sequelize
//   .sync({ force: true })
//   // .then(function () {
//   //     return model.create({});
//   // })
//   // .then(function () {
//   //     return model.find({});
//   // })
//   .then(function(instance) {
//     return instance.updateAttributes({ syncedAt: sequelize.fn("NOW") });
//   })
//   .then(function() {
//     process.exit(0);
//   })
//   .catch(function(err) {
//     console.log("Caught error! " + err);
//   });

const unixTime = moment(moment().unix() * 1000).format();

const People = database.define("people", {
  email: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  id: {
    type: Sequelize.INTEGER,
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
  birthdate: {
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

database
  .sync({ force: true })
  .then(instance => {
    return instance.updateAttributes({ syncedAt: sequelize.fn("NOW") });
  })
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.log("Caught error! " + err);
  })
  .then(() => {
    app.listen(3001, () => {
      console.log("Your Server is up and running");
    });
  });
