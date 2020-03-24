const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("auth/signup");
});

router.post("/", async (req, res) => {
  const { name, lastname, username, email, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(409)
        .render(signup, { message: "El usuario ya existe" });
  } catch (error) {
    res.status(500).json({ message: "Hubo un error buscando usuario signup" });
  }

  try {
    const hashPass = bcrypt.hashSync(password, 10);

    const user = new User({
      name,
      lastname,
      username,
      email,
      password: hashPass
    });

    await user.save();

    res.json({ user });
    //res.redirect("/login");
  } catch (error) {
    res.status(500).render(signup, { message: "Hubo un error guardando usuario signup" });
  }
});

module.exports = router;
