const express = require("express");
const router = express.Router();

const { loginController } = require("../../controllers/auth");

router.get("/", (req, res) => {
  res.render("auth/login");
});

// 3. Definimos la ruta login para devolver el token al usuario
router.post("/", loginController);

router.get("/spotify", (req, res) => {
  res.send("auth/login spotify pendiente de oauth");
});

module.exports = router;
