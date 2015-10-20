var express = require('express'),
    auth = express.Router(),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    User = require('./models').User;

// use passport
auth.use(passport.initialize());
auth.use(passport.session());

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.use(new TwitterStrategy({
    consumerKey: "FEy8j8pZYtNBbDA4d5gvc6X9a", // TWITTER_CONSUMER_KEY
    consumerSecret: "GsIzVmq2Y0zADpc50qkObJtLly0EZpAFXk4jnMLbzZSQz2CPRb", //TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(twitter_client_token, twitter_client_secret, profile, done) {
    console.log("**************************")
    console.log("TWITTER_CLIENT_TOKEN", twitter_client_token)
    console.log("TWITTER_CLIENT_SECRET", twitter_client_secret)
    console.log(profile)
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


/**********
 * Routes *
 **********/

auth.get('/auth/twitter',
  passport.authenticate('twitter'));

auth.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = auth;
