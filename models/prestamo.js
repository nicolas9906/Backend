const { Schema, model } = require('mongoose');

const PrestamoSchema = Schema({
    
    nombrevideo: {
        type: String,
        required: [true, 'El id del videobeam es obligatorio']
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
}); 

PrestamoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = model( 'Prestamo', PrestamoSchema );