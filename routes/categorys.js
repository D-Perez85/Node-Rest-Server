const { Router} = require('express');
const router = Router();
const { check } = require('express-validator');

//Controllers
const { createCategory, getCategorys, getCategory } = require('../controllers/categorys');
//Helpers
const { existCategoryById } = require('../helpers/db-validators');
//Middlewares
const { validateJWT, validateFields} = require('../middlewares');

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
], createCategory)

router.put('/:id', (req, res) => {
  res.json({
    msg: 'PUT'
  })
})

router.delete('/:id', (req, res) => {
  res.json({
    msg: 'DELETE'
  })
})
module.exports = router;