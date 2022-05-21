const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//Controllers
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');

//Endpoints
router.get('/', usersGet); 
router.put('/:id', usersPut); 

router.post('/',[
    check('correo', 'El correo no es valido').isEmail()
], usersPost); 

router.delete('/', usersDelete); 

module.exports = router;