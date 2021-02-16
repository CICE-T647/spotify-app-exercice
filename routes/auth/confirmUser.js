const express = require("express");
const router = express.Router();

const { confirmUserController } = require("../../controllers/auth");

router.get("/:confirmationcode", confirmUserController);

module.exports = router;
