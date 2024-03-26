"use strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, //Eliminará espacios en blanco al principio y al final del nombre
        validate: {
            validator: function (value) {
                const regex = /^[a-zA-Z\s]+$/;
                return regex.test(value);
            },
        }
    },
    surname: {
        type: String,
        required: false,
        trim: true,
        validate: {
            validator: function (value) {
                const regex = /^[a-zA-Z\s]+$/;
                return regex.test(value);
            },
        }
    },
    email: {
        type: String,
        required: true,
        unique: true, //Correo electrónico único
        trim: true,
        validate: {
            validator: function (value) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            },
        }
    },
    birthday: {
        type: Date,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        minlength: 6 //Longitud mínima para la contraseña
    },
    state: {
        type: String,
        required: false,
        default: 'online',
        enum: ['online', 'offline']
    },
    image: {
        type: String,
        required: false
    }
});

//Creamos el modelo
const User = mongoose.model("user", userSchema, "user");

module.exports = User;