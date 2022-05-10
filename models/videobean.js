const { Schema, model } = require('mongoose');

const VideoBeanSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        required: [true, 'El nombre es obligatorio']
    }
});


module.exports = model( 'VideBean', VideoBeanSchema );
