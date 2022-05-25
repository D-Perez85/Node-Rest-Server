const { Router } = require('express');

//Controllers
const { uploadFiles} = require('../controllers/uploads');

const router = Router();

router.post( '/', uploadFiles); 

module.exports = router;