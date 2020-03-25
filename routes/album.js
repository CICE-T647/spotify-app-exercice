const express = require("express");
const router = express.Router();

const { isAutenticated } = require("../middlewares");
const { albumController } = require("../controllers");

router.get("/:id", isAutenticated, albumController);

module.exports = router;
