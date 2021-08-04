'use strict'

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
//const cors = require("cors");
var usuario_rutas = require("./src/rutas/usuario.rutas");
var comida_rutas = require("./src/rutas/comida.rutas")
var dieta_rutas = require("./src/rutas/dieta.rutas");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(cors());

app.use('/api', usuario_rutas, comida_rutas, dieta_rutas);

module.exports = app;