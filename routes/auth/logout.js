var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "logout" });
});

module.exports = router;
