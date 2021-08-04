'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DietaSchema = Schema({
    nombre: String,
    pesoMin: Number,
    pesoMax: Number,
    alturaMin: Number,
    alturaMax: Number,
    edadMin: Number,
    edadMax: Number,
    comidas: [{
        tiempo:String,
        comida: {type: Schema.Types.ObjectId, ref: 'comidas'},
        porciones: Number
    }]
});

module.exports = mongoose.model('dietas', DietaSchema);