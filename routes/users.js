const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//Controllers
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');
const { validateFields,  } = require('../middlewares/validate-fields');

//Helpers
const { esRoleValid,emailExist} = require('../helpers/db-validators');

//Endpoints
router.get('/', usersGet); 
router.put('/:id', usersPut); 

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener 6 o más letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExist),
    check('rol').custom(esRoleValid),
    validateFields
], usersPost); 

router.delete('/', usersDelete); 

module.exports = router;