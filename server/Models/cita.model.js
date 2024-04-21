const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citaSchema = new Schema({
    nombre_paciente: {
        type: String,
        required: true
    },
    correo_paciente: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true
    },
    nombre_doctor: {
        type: String
    },
    fecha: {
        type: Date,
        required: true
    },
    maquina: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
})


const Cita = mongoose.model('citas', citaSchema);

module.exports = Cita;