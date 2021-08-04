'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ComidaSchema = Schema({
    nombre: String,
    calorias: Number,
    grasas: Number,
    carbohidratos: Number,
    azucares: Number,
    fibra: Number,
    proteina: Number,
    vita_mineral: Number,
    sodio: Number,
    colesterol: Number,
    porciones: String,
    ingredienres: Number,
    usuario: { type: Schema.Types.ObjectId, ref: 'usuarios' }

});

module.exports = mongoose.model('comidas', ComidaSchema);