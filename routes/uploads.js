const { Router } = require('express');
const { check } = require('express-validator');

//Controllers
const { uploadFiles, updateImage, showImage} = require('../controllers/uploads');
//Helpers
const { allowedColecctions } = require('../helpers');
//Middlewares
const { validateFields, validateUploadFile } = require('../middlewares');

const router = Router();

router.post( '/', validateUploadFile, uploadFiles); 

router.put('/:colecction/:id', [
    validateUploadFile,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('colecction').custom( c => allowedColecctions( c, ['users','products'] ) ),
    validateFields
], updateImage); 

router.get('/:colecction/:id', [
    check('id','El id debe de ser de mongo').isMongoId(),
    check('colecction').custom( c => allowedColecctions( c, ['users','products'] ) ),
    validateFields
], showImage  )

module.exports = router;