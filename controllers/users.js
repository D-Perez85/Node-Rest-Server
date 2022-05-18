const {response} = require('express')

const usersGet = (req, res = response) => {
    res.json({
            ok: true, 
            msg: 'Get Success - Controller'
        })
}
const usersPut = (req, res = response)=>{
    res.json({
    ok: true,
    msg: 'Put Success - Controller'
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