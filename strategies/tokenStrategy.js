const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = new JwtStrategy(opts, async (tokenPayload, next) => {
  console.log(`Estrategia jwt. Información recibida: token ${tokenPayload}`);

  // El callback de verificación, en este caso, recibe el token en formato json.
  try {
    // Buscamos el usuario por id accediendo al atributo sub del token que hemos definido en el login
    const user = await User.findOne({ _id: tokenPayload.sub });

    // si el usuario no existe enviamos como tercer parametro (info) el mensaje de error,
    // el usuario (segundo parametro) a false
    // y el error (primer parametro) a null
    if (!user) next(null, false, { message: "invalid token" });

    // si el usuario existe, enviamos el primer parametro a null y el segundo con el usuario
    next(null, user);
  } catch (error) {
    //En caso de error enviamos el error como primer parametro
    next(error);
  }
});
