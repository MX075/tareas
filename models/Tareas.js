const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TareaSchema = new Schema({
    Username: {
        type: String,
        required: true


    },
    Rol: {
        type: String,
    },
    Password: {
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