const { Schema, model } = require('mongoose');

const PrestamoSchema = Schema({
    
    video_Id: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    fechaInicio: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    fechaFin: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    
});


module.exports = model( 'Prestamo', PrestamoSchema );