const jwt = require("jsonwebtoken");

module.exports = (userId, userName) => {
  // Procedemos a definir el payload del token.
  // en el podemos introducir la información establecer para la comunicación implicita entre el cliente y el servidor
  const payload = {
    // Declaramos la id de usuario, para poder acceder a ella más tarde(En el punto 4)
    sub: userId,
    // Definimos el tiempo de expiración
    // !NOTA: Transformamos la variable de entorno a número para poder operar con date.now
    exp: Date.now() + parseInt(process.env.JWT_EXPIRES),

    //Enviamos información útil adicional
    username: userName
  };

  // Haciendo uso de la librería jsonwentoken generamos el token:
  // como primer parametro recibe el payload en formato string (por lo que hay que "stringifycarlo")
  // como segundo parámetro, recibe el SECRET también en formato de string. Lo recogemos del archivo .env
  const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);

  return token;
};
