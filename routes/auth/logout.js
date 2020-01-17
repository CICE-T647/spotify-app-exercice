const Express = require("express");
const router = Express.Router();

router.get("/", async (req, res) => {
    res.redirect("/")
})


module.exports = router