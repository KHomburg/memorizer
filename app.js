const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const expressStatusMonitor = require('express-status-monitor');



dotenv.config({ path: '.env.example' });


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


/*
Express Config:
*/
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressStatusMonitor());
app.use(logger('dev'));
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
app.use('/', express.static(path.join(__dirname, 'public')));


/*
Controllers (route handlers).
*/
const start ={};  
start.routing = require('./controllers/start');
/*
Routing:
*/
app.use('/', start.routing);


/*
Start Express server.
*/
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;