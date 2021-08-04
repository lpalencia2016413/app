'use strict'
var express = require('express');
var comidasControlador = require('../controladores/comidas.controlador')
var md_autorization = require('../middlewares/authenticated')

var api = express.Router();

api.post('/agregarComida', md_autorization.ensureAuth, comidasControlador.agregarComida);
api.put('/editarComida/:id', md_autorization.ensureAuth, comidasControlador.editarComida);
api.delete('/eliminarComida/:id', md_autorization.ensureAuth, comidasControlador.eliminarComida);
api.get('/obtenerComidas',comidasControlador.obtenerComidas);
 
module.exports = api;
