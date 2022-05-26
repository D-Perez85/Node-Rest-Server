const { response } = require('express');
//Helper
const { loadFile } = require('../helpers');
//Models
const {User, Product} = require('../models'); 

const uploadFiles = async(req, res = response) => {
    try {
        // const name = await loadFile(req.files, ['txt', 'md'], 'texts' );
        const name = await loadFile(req.files, undefined, 'imgs' );
        res.json({ name });
    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const updateImage = async(req, res = response ) => {
    const { id, colecction } = req.params;
    let modelo;
    switch ( colecction ) {
        case 'users':
            modelo = await User.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }       
        break;
        case 'products':
            modelo = await Product.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }

    const name = await loadFile( req.files, undefined, colecction );
    modelo.img = name;
    await modelo.save();
    res.json( modelo );
}
module.exports = { uploadFiles, updateImage}