const bcryptjs = require("bcryptjs");
const { response } = require("express");
const User = require("../models/user");
const { generateJWT } = require('../helpers/generate-jwt');

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
module.exports = { login };
