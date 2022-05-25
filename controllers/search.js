const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');
const allowedCollections = [ 'users', 'categorys', 'products', 'roles'];

// Search users by name or email
const searchUsers = async( description = '', res = response ) => {
    const isMongoID = ObjectId.isValid( description ); // TRUE 
        if ( isMongoID ) {
            const user = await User.findById(description);
            return res.json({
                results: ( user ) ? [ user ] : []
            });
        }
    const regex = new RegExp( description, 'i' );
    const users = await User.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
        res.json({
            results: users
    });
}
// Search a category by name
const searchCategorys = async( description = '', res = response ) => {
    const isMongoID = ObjectId.isValid( description ); // TRUE 
        if ( isMongoID ) {
            const category = await Category.findById(description);
            return res.json({
                results: ( category ) ? [ category ] : []
            });
        }
    const regex = new RegExp( description, 'i' );
    const categorys = await Category.find({ nombre: regex, estado: true });
        res.json({
            results: categorys
    });
}
// Search a product by name
const searchProducts = async( description = '', res = response ) => {
    const isMongoID = ObjectId.isValid( description ); // TRUE 
        if ( isMongoID ) {
            const product = await Product.findById(description)
                        .populate('category','nombre');
            return res.json({
                results: ( product ) ? [ product ] : []
            });
        }
    const regex = new RegExp( description, 'i' );
    const products = await Product.find({ nombre: regex, estado: true })
                    .populate('category','nombre')
        res.json({
            results: products
    });
}
// Function to search an allowed colecction using a Switch Case
const search = ( req, res = response ) => {
    const { colecction, description  } = req.params;
        if ( !allowedCollections.includes( colecction ) ) {
            return res.status(400).json({
                msg: `Las colecciones permitidas son: ${ allowedCollections }`
            })
        }
    switch (colecction) {
        case 'users':
            searchUsers(description, res);
            break;
        case 'categorys':
            searchCategorys(description, res);
            break;
        case 'products':
            searchProducts(description, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }
}
module.exports = { search }