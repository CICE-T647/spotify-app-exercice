const express = require("express");
const router = express.Router();

router.use("/upload", require("./upload"));
router.use("/getImage", require("./getImage"));

module.exports = router;
