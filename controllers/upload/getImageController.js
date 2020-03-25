const path = require("path");

const User = require("../../models/User");

module.exports = async (req, res) => {
  if (!req.user) res.status(401).json({ message: "No hay usuario" });
  const user = req.user;

  try {
    // Recogemos el usuario
    const userDB = await User.findById(user._id);

    if (!userDB) res.status(404).json({ message: "user not found" });

    let pathImage;
    if (userDB && userDB.img)
      pathImage = path.resolve(__dirname, `../../uploads/users/${userDB.img}`);
    else
      pathImage = path.resolve(
        __dirname,
        `../../assets/users/default-profile.png`
      );
    // Construimos el path de la imagen

    // Comprobamos si la imagen existe y, si no existe, devolvemos una imagen por defecto.

    // Enviamos la imagen
    res.sendFile(pathImage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
