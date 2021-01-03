const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


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

passport.use(new GoogleStrategy({
    clientID: "207348781871-7u8nfg5oq0se1bpd9poru5gueu81q6g6.apps.googleusercontent.com",
    clientSecret: "ocVvP5IVmCJj4WP2pfx2CHO9",
    callbackURL: "/user/login/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    
    const user = await userModel.findGoogleUser(profile.id);
    if(user)
       return done(null, user);
    else
    {
      const insertResult = await userModel.addGoogleUser(profile.id, profile.displayName, profile.emails[0].value, profile.photos[0].value);
      const newuser = await userModel.findUser(insertResult.insertedId);
      return done(null, newuser);
    }
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