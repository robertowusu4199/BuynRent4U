const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;


module.export = (passport) => {
  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:7000/google/callback"
    },
    
    function (accessToken, refreshToken, profile, done) {
      return done(err, profile)
    }
  ));


  passport.serailizeguser(function (user, done) {
    done(null, user)
  })

  passport.deserializeguser(function (user, done) {
    done(null, user)
  })
  
}

