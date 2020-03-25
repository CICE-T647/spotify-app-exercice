const express = require("express");
const router = express.Router();

const { isAutenticated, isUserActive } = require("../../middlewares");
const { getImageController } = require("../../controllers/upload");

router.get("/", [isAutenticated, isUserActive], getImageController);

module.exports = router;
