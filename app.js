const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("passport");
const expressStatusMonitor = require("express-status-monitor");
const Sequelize = require("sequelize");
const cookieParser = require('cookie-parser');

//require('./passport');

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
const { Pool, Client } = require("pg");
const client = new Client();
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
app.use(cookieParser());
app.use(passport.initialize());
require('./config/passport-config')(passport);

/*
Controllers/route handlers.
*/
const start = {};
start.routing = require("./controllers/start");
const users = {};
users.routing = require("./controllers/users");
const notes = {};
notes.routing = require("./controllers/notes");
/*
Routing:
*/
//app.use("/", start.routing);
app.use("/api/users", users.routing);
app.use("/api/notes", passport.authenticate('jwt', {session: false}), notes.routing);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log(err)
  res.status(err.status || 500);
  if(err.message){
    res.json(err.message);
  }else if(err.errors.message){
    res.json(err.errors.message);
  }else{
    res.json(err);
  }
});

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
