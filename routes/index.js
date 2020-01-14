const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn")


router.get("/", isLoggedIn, (req, res) => {
  const user = req.user
  res.render("index", {user}); 
});


module.exports = router;
