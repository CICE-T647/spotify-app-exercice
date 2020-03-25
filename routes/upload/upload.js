const express = require("express");
const router = express.Router();

const { isAutenticated, isUserActive } = require("../../middlewares");
const { uploadController } = require("../../controllers/upload");

router.post("/", [isAutenticated, isUserActive], uploadController);

module.exports = router;
