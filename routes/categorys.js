const { Router} = require('express');
const router = Router();
const { check } = require('express-validator');

//Controllers
const { createCategory, getCategorys, getCategory, categoryPut, deleteCategory } = require('../controllers/categorys');
//Helpers
const { existCategoryById } = require('../helpers/db-validators');
//Middlewares
const { validateJWT, validateFields, isAdminRole} = require('../middlewares');

/** {{url}}/api/categorias */

//Get of all categorys
router.get('/', getCategorys); 

//Get of one category by ID
router.get('/:id', [
    check('id').custom(existCategoryById),
    validateFields
],getCategory); 

//Create a category - private - any person can create with a valid token 
router.post('/', [
    validateJWT,
    check('nombre', 'El nombre es required').notEmpty(),
    validateFields
], createCategory); 

//Modify a name of a category - any person can modify with a valid token 
router.put('/:id',[
  validateJWT,
  check('nombre', 'Este campo es requerido').notEmpty(),
  check('id').custom(existCategoryById),
  validateFields
],categoryPut); 

// Delete a category - Admin
router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom( existCategoryById ),
  validateFields,
],deleteCategory);


module.exports = router;