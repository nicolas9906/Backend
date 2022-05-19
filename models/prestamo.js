const { Schema, model } = require('mongoose');

const PrestamoSchema = Schema({
    
    video_Id: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    fechaInicio: {
        type: String,
        required: [true, 'Fecha de inicio obligatorio']
    },
    fechaFin: {
        type: String,
        required: [true, 'Fecha fin obligatorio']
    },
    
});

PrestamoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = model( 'Prestamo', PrestamoSchema );