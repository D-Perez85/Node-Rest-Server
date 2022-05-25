const path = require('path'); 
const { response } = require('express');

const uploadFiles = async(req, res = response) => {
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file){
        res.status(400).json({msg: 'No hay archivos para subir'}); 
        return; 
    }
    const {file} = req.files; 
    const nameAbreviate = file.name.split('.'); 
    const extension = nameAbreviate[nameAbreviate.length - 1]; 

    //Extension Validate
    const validateExtensions = ['png', 'jpeg', 'jpg', 'gif']; 
    if(!validateExtensions.includes(extension)){
        return res.status(400).json({
            msg: `Extension ${extension} invalida - Pruebe con: ${validateExtensions}`
        })
    } 
    res.json({extension})

    // const uploadPath = path.join( __dirname, '../uploads/', file.name); 
    // file.mv(uploadPath, (err)=>{
    //     if(err){
    //         return res.status(500).json({err});
    //     }
    //     res.json({ msg: 'File Uploaded to ' + uploadPath})
    // });
}
module.exports = { uploadFiles}