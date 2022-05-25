const path = require('path'); 
const {v4: uuidv4} = require('uuid'); 

const loadFile = (files, validateExtensions = ['png', 'jpeg', 'jpg', 'gif'], folder='') =>{

    return new Promise((resolve, reject) =>{
        const {file} = files; 
        const nameAbreviate = file.name.split('.'); 
        const extension = nameAbreviate[nameAbreviate.length - 1]; 

        //Extension Validate
        if(!validateExtensions.includes(extension)){
            return reject(`Extension ${extension} invalida - Pruebe con: ${validateExtensions}`)
        } 
            const tempName = uuidv4() + '.' + extension; 
            const uploadPath = path.join( __dirname, '../uploads/', folder, tempName); 
            file.mv(uploadPath, (err)=>{
                if(err){
                    reject(err); 
                }
                resolve(tempName);
            });
        })
    }
module.exports = {loadFile}; 