"use strict"//uses twitter to authenticate via passport see also /Authentication_Config/ folder
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//authentication additional requirements
const mongoose = require('mongoose');
const passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = require('./app');
// configuration  for authentication===============================================================

require('./Authentication_Config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(logger('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms


// required for passport
app.use(session(
  { secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),//warning in node if this option is not included
    resave: true,
    saveUninitialized: true
  }
)); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// routes ======================================================================
require('./Authentication_Config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
//end authentication
