const bcryptjs = require("bcryptjs");
const { response } = require("express");
const User = require("../models/user");
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require("../helpers/google-verify");
const { json } = require("express/lib/response");

const login = async (req, res = response) => {
  const { correo, password } = req.body;
    try {
        // Is the email exist 
        const user = await User.findOne({ correo });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password are not corrects - correo'
            });
        }
        // Is the user active 
            if ( !user.estado ) {
            return res.status(400).json({
                msg: 'User / Password are not corrects - estado: false'
            });
        }
        // Check the password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password are not corrects - password'
            });
        }        
        // Generate JWT
        const token = await generateJWT( user.id );

        res.json({ user,token})
 
    }catch (error) {
        return res.status(500).json({
        msg: "Contact the Admin",
        });
    }
};
const googleSignIn = async(req, res=response)=>{
    const {id_token} = req.body; 
        try {
            const googleUser = await googleVerify(id_token);  
            console.log(googleUser);
            res.json({
                msg: 'OK',
                id_token
            })
        } catch (error) {
            json.status(400).json({
                ok: false,
                msg: 'El Token no se pudo verificar'
            })
        }
}
module.exports = { login, googleSignIn };
