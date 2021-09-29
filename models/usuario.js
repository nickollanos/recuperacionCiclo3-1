const mongoose = require('mongoose');
const { Schema } = mongoose;


const usuarioSchema = new Schema({
    nombre: {
        type : String,
        required : true,
        maxlength : 100,     
    }, // String is shorthand for {type: String}
    correo: {
        type : String,
        required : true,
        maxlength : 100,
        unique : true   
    },
    password: {
        type : String,
        required : true,
        maxlength : 100, 
    },
    rol:{
        type : String,
        required : true,
        maxlength : 100,     
    },
    estado: {
        type : Number,
        default : 1     
    },
    createAt: { type: Date, default: Date.now },
  });

//   Convertirlo en un modelo

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;