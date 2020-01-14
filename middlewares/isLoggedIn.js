var express = require("express");
var router = express.Router();
const passport = require("passport");
// const flash = require("flash"); 
module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    console.log(`Autenticación de estrategia jwt. Información recibida: error: ${error}, user: ${user}, info: ${info}`)
    if (error) return res.json({message: "Hubo un error"});
    // if (!user) return res.json({error:"Necesitas estar logueado"});
    req.user = user;
    next();
  })(req, res, next);
};
