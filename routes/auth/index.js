var express = require("express");
var router = express.Router();

router.use("/signup", require("./signup"))
router.use("/login", require("./login"))
router.use("/google", require("./google"))

module.exports = router;
