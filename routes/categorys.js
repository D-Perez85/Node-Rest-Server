const {Router} = require('express'); 
const router = Router(); 

//Endpoints
/**
 * {{url}}/api/categorias
*/
//Get of all categorys
router.get('/', (req, res)=>{
    res.json({
    msg: 'GET'
    })
})
//Get of one category by ID
router.get('/:id', (req, res)=>{
    res.json({
    msg: 'GET-ID'
    })
})
//Create a category - private - any person can create with a valid token 
router.post('/',(req, res)=>{
    res.json({
      msg: 'POST'
    })
})
//Update - private - any person can make an update with a valid token 
router.put('/:id', (req, res)=>{
    res.json({
      msg: 'PUT'
    })
})
//Delete one category - Low Logic - Only by the Admin  
router.delete('/:id', (req, res)=>{
    res.json({
      msg: 'DELETE'
    })
})
module.exports = router; 

