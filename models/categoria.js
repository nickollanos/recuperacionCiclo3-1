const mongoose = require('mongoose');
const { Schema } = mongoose;
// const mongoose = require("mongoose");


const categoriaSchema = new Schema({
    nombre: {
        type : String,
        required : true,
        maxlength : 100,
        unique : true 
    }, // String is shorthand for {type: String}
    descripcion: {
        type : String,
        required : true,
        maxlength : 255, 
    },
    estado: {
        type : Number,
        default : 1     
    },
    createAt: { type: Date, default: Date.now },
  });

//   Convertirlo en un modelo

const Categoria = mongoose.model('categoria', categoriaSchema);

module.exports = Categoria;