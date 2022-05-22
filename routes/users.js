const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const {validateFields, validateJWT, isAdminRole, hasRole} = require('../middlewares')

//Controllers
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');

//Helpers
const { esRoleValid,emailExist, existUserById} = require('../helpers/db-validators');

//Endpoints
router.get('/', usersGet); 

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    check('rol').custom(esRoleValid),
    validateFields
],
 usersPut); 

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener 6 o más letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExist),
    check('rol').custom(esRoleValid),
    validateFields
], usersPost); 

router.delete('/:id',[
    validateJWT,
    // isAdminRole, 
    /** isAdminRole is very strict, we need something more flexible. 
     * I use hasRole to put there different options for the roles */
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    validateFields
],usersDelete );

module.exports = router;