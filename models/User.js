const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name es obligatorio"]
  },
  lastname: {
    type: String,
    required: [true, "Lastname es obligatorio"]
  },
  username: {
    type: String,
    required: [true, "Username es obligatorio"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Email es obligatorio"],
    unique: true
  },
  password: {
    type: Object,
    required: [true, "Password es obligatorio"]
  }
});

userSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único " });

module.exports = mongoose.model("User", userSchema);
