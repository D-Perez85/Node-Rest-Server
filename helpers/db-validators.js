const { Role, User, Category, Product } = require('../models');

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
const existProductById = async( id ) => {
    // IS THE PRODUCT EXIST
    const existProduct = await Product.findById(id);
    if ( !existProduct ) {
        throw new Error(`El id no existe ${ id }`);
    }
}
const allowedColecctions = ( colecction = '', colecctions = []) => {
    // IS THE COLECCION ALLOWED
    const included = colecctions.includes( colecction );
    if ( !included ) {
        throw new Error(`La colección ${ colecction } no es permitida, ${ colecctions }`);
    }
    return true;
}
module.exports = { esRoleValid, emailExist, existUserById, existCategoryById, existProductById, allowedColecctions}

