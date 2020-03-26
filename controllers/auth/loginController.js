const passport = require("passport");

const tokenGenerator = require("../../lib/tokenGenerator");

module.exports = (req, res) => {
  // procedemos a autenticar la estrategia local
  passport.authenticate("local", { session: false }, (error, user, info) => {
    console.log(
      `Autenticación de estrategia local. Información recibida: error: ${error}, user: ${user}, info: ${info}`
    );

    // Si hay un error de servidor, envíamos un 500
    if (error) res.status(500).json({ message: "Hubo un error" });

    // Si hay info, el error será del cliente, por lo que lo devolvemos con un 400
    if (info) res.status(400).json({ message: info });

    const token = tokenGenerator(user._id, user.username);

    //Devolvemos el token al usuario
    res.status(200).json({ data: { token } });
    // Ejecutamos la función pasandole los parametros req y res
  })(req, res);
};
