var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')
var passport = require('passport');
var jqueryRouter = require('./routes/jqueryRouter')
var FacebookStrategy = require('passport-facebook').Strategy
var session = require('express-session')
var fs = require("fs");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize(undefined))

app.use(passport.session(undefined))
passport.serializeUser(function (user, done) {
    done(null, user)
});


passport.deserializeUser(function(user, done){
    done(null, user)
});


passport.use(new FacebookStrategy({
      clientID: '4853844251407830',
      clientSecret: '92e10a2654bf5a63e30dd8a243472ce8',
      callbackURL: "https://35cb-27-76-138-110.ap.ngrok.io/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email', 'gender']
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

app.get('/auth/facebook',
    passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter)
app.use('/jquery', jqueryRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
