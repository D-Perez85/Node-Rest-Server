const { Schema, model} = require("mongoose");

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    correo: {
        type: String,
        required: [true, "El Email es obligatorio"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "El Password es obligatorio"],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});
module.exports = model('User', UserSchema); 