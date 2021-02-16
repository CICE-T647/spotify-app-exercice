const express = require("express");
const router = express.Router();

const { isAutenticated, isUserActive } = require("../middlewares");
const { homeController } = require("../controllers");

router.get("/", [isAutenticated, isUserActive], homeController);

module.exports = router;
