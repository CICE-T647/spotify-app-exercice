const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false
  },
  async (email, password, next) => {
    console.log(
      `Estrategia local. Información recibida: email ${email}, password${password}`
    );
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
