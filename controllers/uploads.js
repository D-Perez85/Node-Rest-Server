const { response } = require('express');
//Helper
const { loadFile } = require('../helpers');

const uploadFiles = async(req, res = response) => {
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file){
        res.status(400).json({msg: 'No hay archivos para subir'}); 
        return; 
    }
    try {
        // const name = await loadFile(req.files, ['txt', 'md'], 'texts' );
        const name = await loadFile(req.files, undefined, 'imgs' );
        res.json({ name });
    } catch (msg) {
        res.status(400).json({ msg });
    }
}
module.exports = { uploadFiles}