'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AsignacionSchema = Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'usuarios' },
    dieta: { type: Schema.Types.ObjectId, ref: 'dietas'}
});

module.exports = mongoose.model('asignacion', AsignacionSchema);