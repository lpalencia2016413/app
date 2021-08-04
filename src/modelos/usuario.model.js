'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    correo: String,
    username: String,
    password: String,
    subscripcion: String,
    peso: Number,
    altura: Number,
    edad: Number,
    alergia: String,
    enfermedad: String,
    dietas:[{
        dieta: { type: Schema.Types.String, ref: 'dietas'}
    }],
    rol: String
});

module.exports = mongoose.model('usuarios', UsuarioSchema);