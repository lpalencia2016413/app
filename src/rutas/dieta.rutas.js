'use strict'
var express = require('express');
var dietasControlador = require('../controladores/dietas.controlador')
var md_autorization = require('../middlewares/authenticated')

var api = express.Router();

api.post('/agregarDieta', md_autorization.ensureAuth, dietasControlador.agregarDieta);
api.put('/editarDieta/:id', md_autorization.ensureAuth, dietasControlador.editarDieta);
api.delete('/eliminarDieta/:id', md_autorization.ensureAuth, dietasControlador.eliminarDieta);
api.post('/agregarComidaDietas/:id', dietasControlador.agregarComidaDietas);
api.post('/asignarDieta/:id', md_autorization.ensureAuth, dietasControlador.asignarDieta);
api.get('/obtenerDietas',dietasControlador.obtenerDietas);
api.get('/dietasAsignadas', dietasControlador.obtenerDietasAsignadas);
 
module.exports = api;
