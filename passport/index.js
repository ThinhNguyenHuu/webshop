const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const userModel = require('../models/userModel');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    const {user, error} = await userModel.checkUser(username, password);
    
    if(user)
        return done(null, user);
    else
        return done(null, false,  {message: error} );
  }
));


passport.serializeUser(function(user, done) {
    done(null, user._id);
});

  
passport.deserializeUser(async function(id, done) {

    const user = await userModel.findUser(id);
    if(user)
        done(null, user);
});


module.exports = passport;