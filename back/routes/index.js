var express = require("express");
var router = express.Router();
const { isAuthenticated } = require("../middlewares/authentication");
const { setToken } = require("../middlewares/getSpotify")

router.get("/", isAuthenticated, (req, res, next) => {
  res.json({ message: "Autorizado" });
});
router.use("/auth", require("./auth"));
router.use("/spotify", setToken, require("./spotify"));

module.exports = router;
