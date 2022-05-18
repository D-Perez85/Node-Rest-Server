const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
    msg: 'Get Success'
    }); 
})

router.put('/', (req, res) => {
    res.status(200).json({
        ok: true,
    msg: 'Put Success'
    }); 
})

router.post('/', (req, res) => {
    res.status(201).json({
    ok: true,
    msg: 'Post Success'
    }); 
})

router.delete('/', (req, res) => {
    res.status(200).json({
        ok: true,
    msg: 'Delete Success'
    }); 
})
module.exports = router;