const express = require('express')
require('dotenv').config(); 

const port = process.env.PORT; 
const app = express(); 

app.get('/',(req, res) =>{
  res.send('Hello Mundo')
})

app.listen(port, ()=>{
    console.log(`listen at port ${port}`);
}); 



