const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")


module.export = (passport) => {
  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:7000/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
      //console.log("Trying to access google account", profile)
      
      
      
      
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  ));
}

