const {response, request} = require('express')
const bcryptjs = require('bcryptjs');
const User = require('../models/user'); 
const { validationResult } = require('express-validator');

const usersGet = (req = request, res = response) => {
    const {nombre, apiKey, page= 7}  = req.query; 
        res.json({
            ok: true, 
            msg: 'Get Success - Controller',
            nombre,
            apiKey,
            page //Si no viene data setea 7 por default
        })
    }
const usersPut = (req, res = response)=>{
    const {id} = req.params; 
        res.json({
            ok: true,
            msg: 'Put Success - Controller',
            id
        })
    }
const usersPost = async (req, res=response)=>{

    const { nombre, correo, password, rol } = req.body;
    const user = new User({ nombre, correo, password, rol });

    //IS THE MAIL EXIST
    const emailExist = await User.findOne({correo})
    if(emailExist){
        return res.status(400).json({
            msg: 'El correo ya existe'
        })
    }
    // Encrypt of Password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save(); 
            res.json({
                ok:true,
                user    
            })
        }
const usersDelete = (req, res = response) => {
        res.json({
            ok: true,
            msg: 'Delete Success - Controller'
        })
    }
module.exports = { 
        usersGet, 
        usersPost,  
        usersPut, 
        usersDelete
    }