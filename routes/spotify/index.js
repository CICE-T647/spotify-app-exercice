const Express = require("express");
const router = Express.Router();

router.use("/releases", require("./releases"));
router.use("/album", require("./album"));
router.use("/song", require("./song"));

module.exports = router;