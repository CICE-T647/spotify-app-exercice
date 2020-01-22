const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
console.log("HERE")
  passport.authenticate("google", { scope: [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
  ] })(req, res);
};
