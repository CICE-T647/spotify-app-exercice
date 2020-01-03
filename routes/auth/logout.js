const Express = require("express");
const router = Express.Router();

router.get("/", async (req, res) => {
    req.session.destroy()
    res.redirect("/")
})


module.exports = router