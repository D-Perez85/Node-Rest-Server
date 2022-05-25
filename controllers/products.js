const {response} = require('express'); 
const {Product} = require('../models'); 

// Create a new Product
const createProduct = async (req, res = response) => {
    const { estado, user, ...body } = req.body;
    // Match using findOne - Product Exist?
    const productDB = await Product.findOne({ nombre: body.nombre });
        if ( productDB ) {
            return res.status(400).json({
            msg: `El producto ${ productDB.nombre }, ya existe`
            });
        }
    // Generate data to save
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        user: req.user._id
    }
    //Create a new instance of Product - set of data
    const product = new Product( data );
    // Save at DB
    await product.save();
    //Response
    res.status(201).json(product); 
}
// Get all the Products with paginate  & user data
const getProducts = async (req, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'nombre')
            .populate('category', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limit ))
    ]);
        res.json({
            total,
            products
        });
    }
// Get a Product - populate make a return of the user data 
const getProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById( id )
                            .populate('user', 'nombre')
                            .populate('category', 'nombre');
    res.json( product );
}
// Update a Product by Id - anyone with a valid Token
const productPut = async (req, res = response) => {
    const { id } = req.params;
    const { estado, user, ...data } = req.body;
        if( data.nombre ) {
            data.nombre  = data.nombre.toUpperCase();
        }
    data.user = req.user._id;
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    res.json( product );
}
//Low logic of a Product - Only an admin role can do this
const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
    const productDeleted = await Product.findByIdAndUpdate( id, { estado: false }, {new: true });
    res.json( productDeleted );
}
module.exports = {createProduct, getProducts, getProduct, productPut, deleteProduct}


