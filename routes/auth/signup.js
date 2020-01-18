var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("auth/signup");
});

router.post("/", (req, res) => {
  const { name, lastname, username, email, password } = req.body;
  res.json({ name, lastname, username, email, password });
});

module.exports = router;
