const { response } = require('express');
const jwt = require('jsonwebtoken'); 

const User = require('../models/user')

const validateJWT = async (req = request, res = response, next ) =>{
    const token = req.header('x-token'); 
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
       const {uid} =  jwt.verify(token, process.env.PRIVATEKEY); 
       //READ USER FROM THE UID
        const user = await User.findById(uid); 
        //VALIDATION OF EXISTENCE OF AUTH USER 
            if(!user){
            return res.status(401).json({
                msg: "Token no valid - User Auth doesn't exist in DB"
            })
        }
        //VALIDATION OF THE STATE OF USER AUTH
        if(!user.estado){
            return res.status(401).json({
                msg: 'Token no valid - User Auth state false'
            })
        }
        req.user = user; 
        req.uid = uid; 
        next(); 
    } catch (error) {
        res.status(401).json({
        msg: 'Token no Valido'
    })
  }
}
module.exports = {validateJWT}