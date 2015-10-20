var express = require('express'),
    auth = express.Router(),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy,
    // TwitterStrategy = require('passport-twitter').Strategy,
    User = require('./models').User;

// use passport
auth.use(passport.initialize());
auth.use(passport.session());

// configure passport
passport.use(new localStrategy(User.authenticate()));
// TODO: twitter strategy

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


/**********
 * Routes *
 **********/

// TODO: twitter oauth routes

module.exports = auth;
