var express = require("express");
var router = express.Router();

const controller = require("../../controllers/spotify");

router.get("/latest", controller.getLatest)
router.get("/songs/:id", controller.getSongs)
router.get("/albums/:search", controller.searchAlbums)

module.exports = router;