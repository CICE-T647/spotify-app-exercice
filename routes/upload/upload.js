const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../../models/User");
const { isAutenticated, isUserActive } = require("../../middlewares");
const fs = require("fs");

router.post("/", [isAutenticated, isUserActive], async (req, res) => {
  if (!req.files)
    return res.status(400).json({ message: "No se ha enviado ningún archivo" });

  const user = req.user;

  const { imageFile } = req.files;

  const validExtensions = ["png", "jpg", "svg", "jpeg"];

  const splitedImageFileName = imageFile.name.split(".");

  const extensionImage = splitedImageFileName[splitedImageFileName.length - 1];

  if (!validExtensions.includes(extensionImage)) {
    return res
      .status(422)
      .json({ message: "La extensión del archivo no es válida" });
  }

  splitedImageFileName.pop();

  const fileNameWithId = `${splitedImageFileName}-${new Date().getMilliseconds()}.${extensionImage}`;

  const pathImage = path.resolve(
    __dirname,
    `../../uploads/users/${fileNameWithId}`
  );

  try {
    await imageFile.mv(pathImage);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }

  try {
    const userDB = await User.findByIdAndUpdate(user._id, {
      img: fileNameWithId
    });

    const oldImagePath = path.resolve(
      __dirname,
      `../../uploads/users/${userDB.img}`
    );

    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);

    res.json({
      message: `imagen guardada correctamente en el usuario ${user.name}`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

module.exports = router;
