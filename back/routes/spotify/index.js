var express = require("express");
var router = express.Router();

router.use("/", require("./spotify"));

module.exports = router;
