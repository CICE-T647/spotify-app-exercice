const express = require("express");
const router = express.Router();
const passport = require("passport");

const { loginController } = require("../../controllers/auth");
const tokenGenerator = require("../../lib/tokenGenerator");

router.get("/", (req, res) => {
  res.render("auth/login");
});

// 3. Definimos la ruta login para devolver el token al usuario
router.post("/", loginController);

router.get("/spotify", (req, res) => {
  res.send("auth/login spotify pendiente de oauth");
});

router.get("/google", (req, res) => {
  res.send("auth/login google pendiente de oauth");
});

router.get(
  "/gitlab",
  passport.authenticate(
    "gitlab",
    {
      scope: ["api"]
    },
    { session: false }
  )
);
router.get(
  "/gitlab/callback",
  passport.authenticate("gitlab", { failureRedirect: "/login" }),
  (req, res) => {
    if (req.user) {
      const token = tokenGenerator(req.user._id, req.user.username);

      return res.json({ title: "GitLab Signin", token });
    }

    res.send("algo ha ido mal");
  }
);

module.exports = router;
