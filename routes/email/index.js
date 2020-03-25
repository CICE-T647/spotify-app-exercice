const express = require("express");
const router = express.Router();

const sendmail = require("./sendmail");

router.use("/sendmail", sendmail);

module.exports = router;
