const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//Controllers
const { createProduct, getProducts, getProduct, productPut, deleteProduct } = require('../controllers/products');
//Helpers
const { existCategoryById, existProductById } = require('../helpers/db-validators');
//Middlewares
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

/**  {{url}}/api/products  */

// Get all products - public
router.get('/', getProducts);

// Get of one product by Id - public
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById),
    validateFields,
], getProduct);

// Create a product - private - any person can create with a valid token 
router.post('/', [ 
    validateJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('category','No es un id de Mongo').isMongoId(),
    check('category').custom( existCategoryById),
    validateFields
], createProduct);

// Modify a name of a product - any person can modify with a valid token 
router.put('/:id',[
    validateJWT,
    check('id').custom( existProductById ),
    validateFields
], productPut);

// Delete one product - Admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    validateFields,
], deleteProduct);

module.exports = router;