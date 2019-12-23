const Express = require("express");
const router = Express.Router();

router.use("/releases", require("./releases"));
//router.use("/login", require("./login"));
//router.use("/logout", require("./logout"));

module.exports = router;