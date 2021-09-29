const models = require('../models');
const bcrypt = require('bcryptjs');
var token = require('../services/token');
// var bcrypt = require('bcryptjs');

module.exports = {
    // agregar un nuevo
    add: async(req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error'
            });
            next(error);
        }
    },
    // consultar un usuario
    query: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findOne({_id : req.query._id});
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                })
            } else {
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message : 'Ocurrió un error'
            });
            next(error);
        }
    },
    // listar todos los usuarios
    list: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Usuario.find({ $or: [{ 'nombre': new RegExp(valor, 'i')},{'correo': new RegExp(valor, 'i')}]},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    // modificar algún dato del usuario
    update: async(req, res, next) => {
        try {
            let passwd = req.body.password;
            const reg0 = await models.Usuario.findOne({_id:req.body._id});
            if (passwd!=reg0.password){
                req.body.password = await bcrypt.hash(req.body.password,10); 
            }                 
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{
                rol:req.body.rol,
                nombre:req.body.nombre,
                password:req.body.password
            });
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    // eliminar un usuario
    remove: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    // activar un usuario
    enabled: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    // desactivar un usuario
    disabled: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //login del usuario
    login: async(req, res, next) => {
        try {
            console.log(req.body.correo)
            let user = await models.Usuario.findOne( 
                { 
                    correo : req.body.correo,
                    estado : 1
                 } 
            );
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    console.log(user.rol);
                    let tokenReturn = await token.encode(user);
                    res.status(200).json({ user, tokenReturn });
                } else {
                    res.status(401).send({
                        message: 'Password Incorrecto'
                    });
                }
            } else {
                res.status(404).send({
                    message: 'No existe el user'
                });
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }

}