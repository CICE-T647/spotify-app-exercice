const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn")


router.get("/", isAutenticated, (req, res) => {
  res.render("index"); 
});




module.exports = router;
