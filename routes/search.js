const { Router } = require('express');
const { search } = require('../controllers/search');
const router = Router();

router.get('/:colecction/:description', search )

module.exports = router;