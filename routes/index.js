const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn")


router.get("/",  (req, res) => {
  const user = req.session.currentUser 
  res.render("index", {user}); 
});




module.exports = router;
