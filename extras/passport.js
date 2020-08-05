const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('userSchema');
require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use( new GoogleStrategy({
      callbackURL: '/users/auth/google/callback',
	  
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const exists = await User.findOne({
          googleId: profile.id 
		});
        if (exists) {
          return done(null, exists);
        }
        const user = await new User({ Id: profile.id, Name: profile.displayName}).save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);