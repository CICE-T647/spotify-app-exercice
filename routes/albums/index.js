const express = require("express");
const router = express.Router();




router.use("/details", require("./getdetails"));

module.exports = router;