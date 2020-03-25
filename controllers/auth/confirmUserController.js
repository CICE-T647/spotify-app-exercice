const User = require("../../models/User");

module.exports = async (req, res) => {
  const { confirmationcode } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { confirmationCode: confirmationcode },
      { status: "Active" }
    );

    if (!user) return res.send(`<h1>Opps! Hubo un error. Intentelo más tarde`);

    return res.json({ message: "Usuario Confirmado", data: user.name });
  } catch (error) {
    console.log(error);
    res.send(`<h1>Opps! Hubo un error. `);
  }
};
