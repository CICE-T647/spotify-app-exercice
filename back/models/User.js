const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  },
  name: {
    type: String,
    require: [true, { message: "name is required" }]
  },
  img: {
    type: String
  },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending"
  },
  confirmationCode: {
    type: String
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
