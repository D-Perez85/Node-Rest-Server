const path = require('path'); 
const { response } = require('express');

const uploadFiles = async(req, res = response) => {
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file){
        res.status(400).json({msg: 'No hay archivos para subir'}); 
        return; 
    }
    const {file} = req.files; 
    const uploadPath = path.join( __dirname, '../uploads/', file.name); 
    file.mv(uploadPath, (err)=>{
        if(err){
            return res.status(500).json({err});
        }
        res.json({ msg: 'File Uploaded to ' + uploadPath})
    });
}
module.exports = { uploadFiles}