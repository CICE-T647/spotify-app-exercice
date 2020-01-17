const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;

const songSchema = new Schema({
  
  id: {
    type:String,
    required: [true, "Id is a required field."]

  },
  name: {
    type: String,
    required: [true, "Name is a required field."]
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
  
});

songSchema.plugin(uniqueValidator, { message: "{PATH} must be unique. " });

module.exports = mongoose.model("Song", songSchema);