const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }, 
    estado: {
        type: Boolean,
        default: true,
        required:  true
        },
    user: {
        type: Schea.Types.ObjectId, 
        ref: User,
        required: true
        }
    });
module.exports = model( 'category', CategorySchema );
