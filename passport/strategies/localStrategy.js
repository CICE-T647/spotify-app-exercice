
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs");

const User = require("../../models/User");
module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false
  },
  async (email, password, next) => {
    try {
      const user = await User.findOne({ email });

      if (!user) next(null, false, { message: "El usuario no existe" });

      if (!bcrypt.compareSync(password, user.password))
        next(null, false, { message: "la contraseña no es correcta" });

      next(null, user);
    } catch (error) {
      next(error);
    }
  }
);
