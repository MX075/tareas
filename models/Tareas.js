const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TareaSchema = new Schema({
    Name: {
        type: String,
        required: true


    },
    Avance: {
        type: String,
    },
    Description: {
        type: String,
        require: true
    },
    Fecha: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true,
})



// crear modelo
const Tarea = mongoose.model('Tarea ', TareaSchema);

module.exports = Tarea;