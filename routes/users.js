const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//Controllers
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');

//Endpoints
router.get('/', usersGet); 
router.put('/:id', usersPut); 

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validateFields
], usersPost); 

router.delete('/', usersDelete); 

module.exports = router;