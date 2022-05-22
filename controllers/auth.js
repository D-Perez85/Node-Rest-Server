const { response } = require("express");
const res = require("express")

const login = ( req, res=response ) =>{
    res.json({
        msg: 'Auth Succes'
    })
}

module.exports = { login }; 