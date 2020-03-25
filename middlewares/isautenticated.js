const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    console.log(
      `Autenticación de estrategia jwt -middleware-. Información recibida: error: ${error}, user: ${user}, info: ${info}`
    );

    if (error)
      return res
        .status(500)
        .json({ message: "Hubo un error autenticacion middleware" });

    if (!user)
      return res.status(401).json({ message: "No autorizado middleware" });

    req.user = user;

    next();
  })(req, res, next);
};
