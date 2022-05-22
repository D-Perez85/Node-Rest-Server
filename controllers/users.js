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
const usersDelete = async (req, res = response) => {
        const {id} = req.params; 
        const uid = req.uid; 
        //BAJA FISICA
        // const user = await User.findByIdAndDelete(id); 
        //BAJA LOGICA
        const user = await User.findByIdAndUpdate( id, { estado: false }, {new: true} );
        res.json( {user, uid})
    }
module.exports = { usersGet, usersPost, usersPut, usersDelete}