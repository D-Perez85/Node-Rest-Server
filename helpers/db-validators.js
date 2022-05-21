const Role = require('../models/role');
const User = require('../models/user');

const esRoleValid = async(rol = '') => {
    //IS THE ROL EXIST
    const rolExist = await Role.findOne({ rol });
    if ( !rolExist ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}
const emailExist = async( correo = '' ) => {
    //IS THE MAIL EXIST
    const isemailExist = await User.findOne({correo})
    if(isemailExist){
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}
module.exports = { esRoleValid, emailExist}

