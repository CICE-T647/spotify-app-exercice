const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is a required field."]
  },
  lastname: {
    type: String,
    required: [true, "Last Name is a required field."]
  },
  email: {
    type: String,
    required: [true, "Email is a required field."],
    unique: [true, "Email is already in use."]
  },
  username: {
    type: String,
    required: [true, "Username is a required field"],
    unique: [true, "Username is already in use."]
  },
  password: {
    type: Object,
    required: [true, "Password is required."]
  }
}, { 
    timeStamps: true,
    createdAt: true 
    });

userSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único " });

module.exports = mongoose.model("User", userSchema);