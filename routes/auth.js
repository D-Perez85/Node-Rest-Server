const {Router} = require('express'); 
const { check } = require('express-validator');
const router = Router(); 

//Controller
const { login } = require('../controllers/auth');

//Middleware
const { validateFields } = require('../middlewares/validate-fields');

//Endpoint
router.post('/login', [
    check('correo', 'Email es campo requerido').isEmail(),
    check('password', 'Password es campo requerido').notEmpty(), 
    validateFields
], login); 

module.exports = router; 