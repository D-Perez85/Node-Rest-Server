const { Router } = require('express');
const router = Router();

//Controllers
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');

//Endpoints
router.get('/', usersGet); 
router.put('/:id', usersPut); 
router.post('/', usersPost); 
router.delete('/', usersDelete); 

module.exports = router;