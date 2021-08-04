'use strict'
var Comida = require("../modelos/comida.model");
var Dieta = require("../modelos/dieta.model");
var Asignacion = require("../modelos/asignacion.model");
var Usuario = require("../modelos/usuario.model");
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../servicios/jwt");

function agregarDieta(req,res){

    if(req.user.rol == "ROL_ADMIN"){
        var dieta = new Dieta();
         var params = req.body;
       
        if(params.nombre && params.pesoMin && params.pesoMax && params.alturaMin && params.alturaMax && params.edadMin && params.edadMax){
            dieta.nombre = params.nombre;
            dieta.pesoMin = params.pesoMin;
            dieta.pesoMax = params.pesoMax;
            dieta.alturaMin = params.alturaMin;
            dieta.alturaMax = params.alturaMax;
            dieta.edadMin = params.edadMin;
            dieta.edadMax = params.edadMax;
            dieta.comidas = [];
        
            Dieta.find({nombre: dieta.nombre}).exec((err, dietaEncontrada)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la solicitud de dieta'});
        
                if(dietaEncontrada && dietaEncontrada.length >=1){
                    return res.status(200).send({mensaje:'Esta Dieta ya existe'});
                }else{
        
                    dieta.save((err, dietaGuardada)=>{
                        if(err) return res.status(500).send({mensaje: 'Error al guardar la dieta'});
        
                        if (dietaGuardada){
                           return res.status(200).send(dietaGuardada);
                        }else{
                           return res.status(500).send({ mensaje: 'No se ha podido guardar la dieta'});
                        }
                    })
                    
                }
            })
        }else{
            return res.status(500).send({mensaje:"no se enviaron todos los parametros"})
        }
    }else{
        return res.status(500).send({ mensaje:"no posee los derechos para editar esta dieta"});
    }

}

function editarDieta(req, res){

    if(req.user.rol == "ROL_ADMIN"){
        
        var dietaId = req.params.id;
        var params = req.body;

        console.log(dietaId);
            Dieta.find({ nombre: params.nombre }).exec((err, dietaEncontrada) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion de dieta' });
                if (dietaEncontrada && dietaEncontrada.length >= 1) {
                    return res.status(500).send({ mensaje: 'Esta dieta ya existe' });
                }else{
                    Dieta.findByIdAndUpdate(dietaId, params, { new: true }, (err, dietaActualizada) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                        if (!dietaActualizada) return res.status(500).send({ mensaje: 'No se a podido editar la dieta' });
                
                        return res.status(200).send({ dietaActualizada })
                    })
                }
            
        })
    }else{
        return res.status(500).send({ mensaje:"no posee los derechos para editar esta dieta"});
    }
}

function eliminarDieta(req, res){

    if(req.user.rol == "ROL_ADMIN"){
        var idDieta = req.params.id;
        Dieta.findByIdAndDelete(idDieta, (err, dietaEliminada) =>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!dietaEliminada) return res.status(500).send({mensaje:"No se ha eliminado la dieta"});

        return res.status(200).send({mensaje: "Dieta Eliminada"});
    }) 
    }else{
        return res.status(500).send({ mensaje:"no posee los derechos para editar esta dieta"});
    }
      

}

function agregarComidaDietas(req, res) {
    var dietaId = req.params.id;
    var params = req.body;

    Dieta.findByIdAndUpdate(dietaId, 
        { $push: { comidas: { tiempo: params.tiempo, comida: params.comida, porciones: params.porciones } } },
        {new: true}, (err, comidaAgregada)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion del agregar comida a la dieta' });
            if(!comidaAgregada) return res.status(500).send({mensaje: 'Error al guardar la comida'});

            return res.status(200).send({ comidaAgregada })
        })
}

function asignarDieta(req, res){
    var dietaId = req.params.id;
    var asignacion = new Asignacion();

            asignacion.usuario = req.user.sub;
            asignacion.dieta = dietaId;

            asignacion.save((err, dietaAsignada)=>{
                if(err) return res.status(500).send({mensaje: 'Error al guardar la dieta'});

                if (dietaAsignada){
                   return res.status(200).send(dietaAsignada);
                }else{
                   return res.status(500).send({ mensaje: 'No se ha podido guardar la dieta'});
                }
            })
            

}


function obtenerDietas(req, res) {
    Dieta.find().exec((err, dietasObtenidas)=>{
        if(err) return res.status(500).send({mensaje:"Error en la peticion"});
        if(!dietasObtenidas) return res.status(500).send({mensaje:"No se encontraron dietas"});
        return res.status(200).send({dietasObtenidas})
    })
}

function obtenerDietasAsignadas(req, res) {
    var username = req.user.sub;

    Asignacion.find({"usuario": username },(err, dietasAEncontrada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de dietas'});
        if(!dietasAEncontrada) return res.status(500).send({mensaje: 'Error al obtener las dietas' });

        return res.status(200).send({ dietasAEncontrada });
    })

}

module.exports = {
    agregarDieta,
    editarDieta,
    eliminarDieta,
    agregarComidaDietas,
    asignarDieta,
    obtenerDietas,
    obtenerDietasAsignadas
}