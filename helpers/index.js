const dbValidators = require('./db-validators');
const generateJWT  = require('./generate-jwt');
const googleVerify = require('./google-verify');
const loadFile  = require('./uploading-file'); 

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...loadFile,
    ...googleVerify,
}


// const dbValidators = require('./db-validators');
// const generarJWT   = require('./generar-jwt');
// const googleVerify = require('./google-verify');
// const subirArchivo = require('./subir-archivo');


// module.exports = {
//     ...dbValidators,
//     ...generarJWT,
//     ...googleVerify,
//     ...subirArchivo,
// }