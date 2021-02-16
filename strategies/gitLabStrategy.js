const GitLabStrategy = require("passport-gitlab2").Strategy;
const User = require("../models/User");

module.exports = new GitLabStrategy(
  {
    clientID: process.env.GITLAB_APP_ID,
    clientSecret: process.env.GITLAB_APP_SECRET,
    callbackURL: process.env.GITLAB_CALLBACK
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log("profile from Gitlab Oauth-> ", profile);
    User.findOne({ platform: "gitlab", socialId: profile.id }, (err, user) => {
      if (user) {
        return cb(null, user);
      }
      const newUser = User({
        name: profile._json.name,
        lastname: profile._json.name,
        username: profile._json.username,
        email: profile._json.email,
        img: profile._json.avatar_url,
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
