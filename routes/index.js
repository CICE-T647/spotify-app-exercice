const express = require("express");
const router = express.Router();
const { isAutenticated } = require("../middlewares");

const home = require("./home");
const album = require("./album");
const email = require("./email/sendmail");
const { signup, login, logout } = require("./auth");

router.get("/", isAutenticated, (req, res, next) => {
  // en caso de entrar a la función, quiere decir que el usuario esta autorizado
  res.json({ message: "Index autorizado" });
});


router.use("/signup", signup);
router.use("/login", login);
router.use("/logout", logout);
router.use("/home", home);
router.use("/album", album);
router.use("/email", email);


module.exports = router;
