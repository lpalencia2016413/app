'use strict'
var Comida = require("../modelos/comida.model");
var Usuario = require('../modelos/usuario.model')
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../servicios/jwt");

function  agregarComida(req, res) {
    var comidaModelo = new Comida();
    var params = req.body

    if (req.user.rol == 'ROL_ADMIN') {
        comidaModelo.nombre = params.nombre;
        comidaModelo.calorias = params.calorias;
        comidaModelo.grasas = params.grasas;
        comidaModelo.carbohidratos = params.carbohidratos;
        comidaModelo.azucares = params.azucares;
        comidaModelo.fibra = params.fibra;
        comidaModelo.proteina = params.proteina;
        comidaModelo.vita_mineral = params.vita_mineral;
        comidaModelo.sodio = params.sodio;
        comidaModelo.colesterol = params.colesterol;
        comidaModelo.porciones = params.porciones;
        comidaModelo.ingredientes = params.ingredientes;
        comidaModelo.usuario = req.user.sub
        if (params.nombre && params.calorias && params.grasas && params.carbohidratos && 
            params.azucares && params.fibra && params.proteina && params.vita_mineral && 
            params.sodio && params.colesterol && params.porciones && params.ingredientes) {
            Usuario.findOne({ _id: comidaModelo.usuario }).exec((err, UsuarioEncontrado) => {
                if (err) return res.status(500).send({ mensaje: 'Usuario no encontrado' });
                if (UsuarioEncontrado.rol == 'ROL_ADMIN') {
                    Comida.find({ nombre: params.nombre }).exec((err, comidaEncontrada) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                        if (comidaEncontrada.length >= 1) {
                            res.status(500).send({ mensaje: 'Esta comida ya esta registrada' });
                        } else {
                            comidaModelo.save((err, comidaGuardada) => {
                                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                                if (comidaGuardada) {
                                    return res.status(200).send({ comidaGuardada });
                                } else {
                                    res.status(500).send({ mensaje: 'La comida no pudo ser registrada' })
                                }
                            });
                        }
                    })
                } 
            })
        }
    }
}


function editarComida(req, res) {
    var comidaId = req.params.id;
    var params = req.body;
    if (req.user.rol == 'ROL_ADMIN') {
        Comida.findByIdAndUpdate(comidaId, params, { new: true }, (err, comidaactualizada) => {
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" })
            if (!comidaactualizada) return res.status(500).send({ mensaje: "No se pudo editar la comida" });
            return res.status(200).send({ comidaactualizada });
        })
    } 
}


function eliminarComida(req, res) {
    var ComidaId = req.params.id;
    if (req.user.rol == 'ROL_ADMIN'){
    Comida.findByIdAndDelete(ComidaId, function(err, comidaEliminada) {
        if (err) return res.status(500).send({ mensaje: 'Error al intentar eliminar comida' })
        if (!comidaEliminada) return res.status(500).send({ mensaje: 'No se pudo eliminar usuario porque no hay datos' })
        return res.status(200).send({ comidaEliminada})
    });
    }
}

function obtenerComidas(req, res) {
        Comida.find().exec((err, usuariosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Usuarios' });
        if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'Error en la consutla de Usuarios o no tiene datos' });
        return res.status(200).send({ usuariosEncontrados });
    })
}

module.exports = {
    agregarComida,
    editarComida,
    eliminarComida,
    obtenerComidas
}