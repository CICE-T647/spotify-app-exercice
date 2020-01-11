var express = require("express");
var router = express.Router();
const passport = require("passport");
module.exports = isAutenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    console.log(`Autenticación de estrategia jwt. Información recibida: error: ${error}, user: ${user}, info: ${info}`)
    if (error) return res.json({message: "Hubo un error"});
    if (!user) return res.json({message: "No autorizado"});
    req.user = user;
    next();
  })(req, res, next);
};
module.exports = isAutenticatedSignup = (req, res, next) => {
    // definimos el método de autenticación como jwt, la sesión a false y el callback para gestionar la información de la estrategia jwt
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
      req.user = user;
      next();
      //Ejecutamos la función con req, res, next como parametros
    })(req, res, next);
};