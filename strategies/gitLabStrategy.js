const GitLabStrategy = require("passport-gitlab2").Strategy;
const User = require("../models/User");

module.exports = new GitLabStrategy(
  {
    clientID: process.env.GITLAB_APP_ID,
    clientSecret: process.env.GITLAB_APP_SECRET,
    callbackURL: process.env.GITLAB_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ platform: "gitlab", socialId: profile.id }, (err, user) => {
      if (user) {
        return cb(null, user);
      }
      const newUser = User({
        name: profile.displayName,
        lastname: profile.displayName,
        username: profile.displayName,
        email: profile.email,
        platform: "gitlab",
        socialId: profile.id,
        status: "Active"
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
