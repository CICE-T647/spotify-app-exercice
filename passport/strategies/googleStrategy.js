const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT,
    prompt: 'consent',
    accessType: 'offline'
  }, (accessToken, refreshToken, profile, cb) => {
    console.log("PROFILE ", profile, "TOKEN ", accessToken)
  })
  