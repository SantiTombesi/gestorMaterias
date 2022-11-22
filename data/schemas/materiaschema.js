const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materiaSchema = new Schema({
    
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("materia", materiaSchema);
