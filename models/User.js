const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: [true, { message: "name is required" }]
  },
  lastname: {
    type: String,
    require: [true, { message: "lastname is required" }]
  },
  username: {
    type: String,
    require: [true, { message: "User is required" }]
  },
  email: {
    type: String,
    require: [true, { message: "email is required" }]
  },
  password: {
    type: String,
    require: [true, { message: "password is required" }]
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
