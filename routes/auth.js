const {Router} = require('express'); 
const { check } = require('express-validator');
const router = Router(); 

//Controller
const { login, googleSignIn } = require('../controllers/auth');

//Middleware
const { validateFields } = require('../middlewares/validate-fields');

//Endpoints
router.post('/login', [
    check('correo', 'Email es campo requerido').isEmail(),
    check('password', 'Password es campo requerido').notEmpty(), 
    validateFields
], login); 

router.post('/google', [
    check('id_token', 'id_token es necesario').notEmpty(), 
    validateFields
], googleSignIn); 
module.exports = router; 