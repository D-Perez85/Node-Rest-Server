const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//Controllers
const { createProduct, getProducts, getProduct, productPut, deleteProduct } = require('../controllers/products');
//Helpers
const { existCategoryById } = require('../helpers/db-validators');
//Middlewares
const { validateFields, validateJWT } = require('../middlewares');

/**  {{url}}/api/products  */

// Get all products - public
router.get('/', getProducts);

// Get of one product by Id - public
router.get('/:id', getProduct);

// Create a product - private - any person can create with a valid token 
router.post('/', [ 
    validateJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('category','No es un id de Mongo').isMongoId(),
    check('category').custom( existCategoryById),
    validateFields
], createProduct);

// Modify a name of a category - any person can modify with a valid token 
router.put('/:id', productPut);

// Delete one category - Admin
router.delete('/:id', deleteProduct);

module.exports = router;