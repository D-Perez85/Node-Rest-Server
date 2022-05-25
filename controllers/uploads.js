const { response } = require('express');
//Helper
const { loadFile } = require('../helpers');

const uploadFiles = async(req, res = response) => {
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file){
        res.status(400).json({msg: 'No hay archivos para subir'}); 
        return; 
    }
//Images
const name = await loadFile(req.files );
res.json({name })
}
module.exports = { uploadFiles}