const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
const app = module.exports =  express()

app.use(session(
  { secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),//warning in node if this option is not included
    resave: true,
    saveUninitialized: true
  }
));

app.get('/dbmodel',(req,res)=>{
  if(!req.session.authenticated){
    res.end("You are NOT Logged in and NOT authorized to use app")
  }
  else if (process.env.AUTHORIZED_USERS.includes(req.session.authenticated)){
    res.sendFile(path.resolve(__dirname, 'sensitive', 'db.json'))
  }
  else{
    res.end("You are Logged in but not authorized!")
  }

})

const db = require('./models/db')//establishes db connection

require('./authserver')//add authentication
//server primary route
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res){
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});
