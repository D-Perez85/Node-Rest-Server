const { Router } = require('express');
const router = Router();

//Controllers
const { createProduct, getProducts, getProduct, productPut, deleteProduct } = require('../controllers/products');

/**  {{url}}/api/products  */

// Get all products - public
router.get('/', getProducts);

// Get of one product by Id - public
router.get('/:id', getProduct);

// Create a product - private - any person can create with a valid token 
router.post('/', createProduct);

// Modify a name of a category - any person can modify with a valid token 
router.put('/:id', productPut);

// Delete one category - Admin
router.delete('/:id', deleteProduct);

module.exports = router;