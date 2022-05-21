const {response, request} = require('express')
const bcryptjs = require('bcryptjs');
const User = require('../models/user'); 

const usersGet = async (req = request, res = response) => {
    const { limit = 5, desde = 13 } = req.query;
    const query = { estado: true };
    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( desde ) )
            .limit(Number( limit ))
    ]);    
        res.json({
            total,
            users
        })
    }
const usersPut = async (req, res = response)=>{
    const {id} = req.params; 
    const {_id, password, ...rest} = req.body; 

        if(password){
            // Encrypt of Password
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync( password, salt );
        }
    const user = await User.findByIdAndUpdate(id, rest, {new: true})
        res.json(user)
    }
const usersPost = async (req, res=response)=>{
    const { nombre, correo, password, rol } = req.body;
    const user = new User({ nombre, correo, password, rol });

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
module.exports = { usersGet, usersPost, usersPut, usersDelete}