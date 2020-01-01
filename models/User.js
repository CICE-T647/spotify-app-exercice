const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

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
    unique: [true, "Email is already in use."],
    validate: [validateEmail, 'Please fill a valid email address']
    //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  username: {
    type: String,
    required: [true, "Username is a required field"],
    unique: [true, "Username is already in use."]
  },
  password: {
    type: String,
    required: [true, "Password is required."]
  }
}, { 
    timeStamps: true,
    createdAt: true 
    });

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique. " });

module.exports = mongoose.model("User", userSchema);