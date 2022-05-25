const {response} = require('express'); 
// Create a new Product
const createProduct = (req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: 'Product Created'
    })
}
// Get all the Products with paginate  & user data
const getProducts = (req, res = response) => {
    res.status(200).json({
        ok: true, 
        msg: 'Get of all the Products Success'
    })
}
// Get a Product - populate make a return of the user data 
const getProduct = (req, res = response) => {
    res.status(200).json({
        ok: true, 
        msg: 'Get of one Product By Id Success'
    })
}
//Update a Product by Id - anyone with a valid Token
const productPut = (req, res = response) => {
    res.status(200).json({
        ok: true, 
        msg: 'Update of one Product By Id Success'
    })
}
//Low logic of a Product - Only an admin role can do this
const deleteProduct = (req, res = response) => {
    res.status(200).json({
        ok: true, 
        msg: 'Delete of one Product By Id Success'
    })
}
module.exports = {createProduct, getProducts, getProduct, productPut, deleteProduct}


