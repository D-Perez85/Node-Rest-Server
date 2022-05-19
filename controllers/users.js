const {response, request} = require('express')

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
const usersPost = (req, res=response)=>{
    const {nombre, edad} = req.body; 
        res.json({
            ok:true,
            msg: 'Post Success - Controller',
            nombre, 
            edad    
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