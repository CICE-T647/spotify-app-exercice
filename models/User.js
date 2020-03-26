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
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending"
  },
  confirmationCode: {
    type: String
  },
  img: {
    type: String
  },
  password: {
    type: String,
    require: [true, { message: "password is required" }]
  },
  platform: { type: String, default: null },
  socialId: { type: String, default: null }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
