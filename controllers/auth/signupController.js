const User = require("../../models/User");
const bcrypt = require("bcrypt");

const uuid = require("uuid/v1");
const nodemailer = require("nodemailer");
const emailConfirmationTemplate = require("./emailConfirmationTemplate");

module.exports = async (req, res) => {
  const { name, lastname, username, email, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) return res.status(409).json({ message: "El usuario ya existe" });
  } catch (error) {
    res.status(500).json({ message: "Hubo un error buscando usuario signup" });
  }

  try {
    const hashPass = bcrypt.hashSync(password, 10);

    const confirmationCode = uuid();
    console.log("Confirmation code ->", confirmationCode);

    const user = new User({
      name,
      lastname,
      username,
      email,
      confirmationCode,
      password: hashPass
    });

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER
      }
    });

    const response = await transporter.sendMail({
      from: process.env.USER_NODEMAILER,
      to: email,
      subject: "Confirmación de email",
      text:
        "Copie y pegue la siguiente url para confirmar: http://localhost:3000/users/codeconfirmation/${confirmationCode}",
      html: emailConfirmationTemplate({ name, confirmationCode })
    });

    res.json({ user, response });
    //res.redirect("/login");
  } catch (error) {
    res.status(500).json({ message: "Hubo un error guardando usuario signup" });
  }
};
