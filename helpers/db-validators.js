const { Category } = require('../models');
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
const existUserById = async( id ) => {
    // IS THE USER EXIST
    const existUser = await User.findById(id);
        if ( !existUser ) {
            throw new Error(`El id ${ id } no existe en BDD `);
        }
    }

const existCategoryById = async (id) =>{
    //IS THE CATEGORY EXIST
    const existCategory = await Category.findById(id); 
        if(!existCategory){
            throw new Error(`El id ${id} no existe en BDD`)
        }
    }

module.exports = { esRoleValid, emailExist, existUserById, existCategoryById}

