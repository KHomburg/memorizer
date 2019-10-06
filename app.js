const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("passport");
const expressStatusMonitor = require("express-status-monitor");
const Sequelize = require("sequelize");

const { Pool, Client } = require("pg");
const client = new Client();

dotenv.config({ path: ".env" });

/*
Configs:
*/

/*
Create Express server.
*/
const app = express();

/*
Database configuration
*/
const db = require("./models/index")

db.sequelize.authenticate()
  .then(() => {console.log("Success!")})
  .catch(err => {console.log(err)});

  

/*
Express Config:
*/
app.set("host", process.env.HOST || "0.0.0.0");
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressStatusMonitor());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(session({
//  resave: true,
//  saveUninitialized: true,
//  secret: process.env.SESSION_SECRET,
//  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
//  store: //TODO: define store
//}));
app.use(passport.initialize());
app.use(passport.session());

/*
Assets:
*/
app.use("/", express.static(path.join(__dirname, "public")));

/*
Controllers (route handlers).
*/
const start = {};
start.routing = require("./controllers/start");
const users = {};
users.routing = require("./controllers/users");
/*
Routing:
*/
app.use("/", start.routing);
app.use("/users", users.routing);



/*
Start Express server.
*/
db.sequelize.sync().then(x => {
  app.listen(app.get("port"), () => {
    console.log(
      "%s App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });
})


module.exports = app;
