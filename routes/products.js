const { response } = require('express');
const { Router } = require('express');

const router = Router();

/**
 * {{url}}/api/products
 */

// Get all products - public
router.get('/', (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'Succes Get of products'
    })
});

// Get of one product by Id - public
router.get('/:id', (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'Succes Get of product by Id'
    })
});

//Create a product - private - any person can create with a valid token 
router.post('/', (req, res = response)=>{
    res.json({
        ok: true, 
        msg: 'Succes Post of product'
    })
});

//Modify a name of a category - any person can modify with a valid token 
router.put('/:id', (req, res=response) =>{
    res.json({
        ok: true,
        msg: 'Succes Put of product'

    })
});

// Delete one category - Admin
router.delete('/:id', (req, res)=>{
    res.json({
        ok: true,
        msg: 'Succes Delete of product'

    })
});
module.exports = router;