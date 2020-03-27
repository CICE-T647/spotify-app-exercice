const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log("profile from Google Oauth-> ", profile);
    User.findOne({ platform: "Google", socialId: profile.id }, (err, user) => {
      if (user) {
        return cb(null, user);
      }
      const newUser = User({
        name: profile._json.given_name,
        lastname: profile._json.family_name,
        username: profile.displayName,
        email: profile._json.email,
        platform: "Google",
        socialId: profile.id,
        status: "Active",
        img: profile._json.picture
      });

      newUser.save((err, userSaved) => {
        if (err) {
          return cb(err, false);
        }

        return cb(null, userSaved);
      });
    });
  }
);
