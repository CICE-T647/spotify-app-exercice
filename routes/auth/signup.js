const express = require("express");
const router = express.Router();

const { signupController } = require("../../controllers/auth");

router.get("/", (req, res) => {
  res.render("auth/signup");
});

router.post("/", signupController);

module.exports = router;
