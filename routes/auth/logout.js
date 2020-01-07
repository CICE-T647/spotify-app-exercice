const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require("../../models/User");

router.get("/", async (req, res) => {

  // destruimos la sesión:

  req.session.destroy();
  res.redirect("/");
 // res.status(200).json({message: "has salido de la aplicación"});    

})


module.exports = router;