const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio "],
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"]
    }, 
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true
    }, 
    password: {
        type: String,
        required: [true, "La password es obligatoria"]
    }
})

userSchema.plugin(uniqueValidator, {message: "{PATH} debe ser único"});

module.exports = mongoose.model("User", userSchema)