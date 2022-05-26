const path = require('path');
const fs   = require('fs');
const { response } = require('express');
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

//Helpers
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
    // Clean previous images
    if ( modelo.img ) {
        // We must delete the image from the server
        const pathImage = path.join( __dirname, '../uploads', colecction, modelo.img );
        if ( fs.existsSync( pathImage ) ) {
            fs.unlinkSync( pathImage );
        }
    }


    const name = await loadFile( req.files, undefined, colecction );
    modelo.img = name;
    await modelo.save();
    res.json( modelo );
}

const updateImageCloudinary = async(req, res = response ) => {
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
    // Clean previous images
    if ( modelo.img ) {
        // We must delete the image from the server
        const nameArr = modelo.img.split('/');
        const name    = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
    }
    const { tempFilePath } = req.files.file
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath); 
    modelo.img = secure_url;
    await modelo.save();
    res.json( modelo );
}

const showImage = async(req, res = response ) => {
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
    // Clean previous images
    if ( modelo.img ) {
        // We must delete the image from the server
        const pathImage = path.join( __dirname, '../uploads', colecction, modelo.img );
        if ( fs.existsSync( pathImage ) ) {
            return res.sendFile( pathImage );
        }
    }
    const pathImage = path.join( __dirname, '../assets/no-image.jpg');
        res.sendFile( pathImage );
}
module.exports = { uploadFiles, updateImage, showImage, updateImageCloudinary}