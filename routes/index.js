const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")


// para renderizar la vista:
router.get("/", (req, res) => {

    const usuario = req.session.currentUser

    res.render("inicio" , {usuario: usuario});
});

module.exports = router;