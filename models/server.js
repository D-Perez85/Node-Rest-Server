const express = require('express'); 
const cors = require('cors'); 

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //Middlewares
        this.middlewares(); 
        //Routes
        this.routes();
    }
    middlewares(){
        // Cors
        this.app.use(cors())
        // Public Folder
        this.app.use(express.static('public'))
    }
    routes() {
        this.app.get('/test', (req, res) => {
            res.status(200).json({
                ok: true,
            msg: 'Get Sucess'
            }); 
        })
        this.app.put('/test', (req, res) => {
            res.status(200).json({
                ok: true,
            msg: 'Put Sucess'
            }); 
        })
        this.app.post('/test', (req, res) => {
            res.status(201).json({
            ok: true,
            msg: 'Post Sucess'
            }); 
        })
        this.app.delete('/test', (req, res) => {
            res.status(200).json({
                ok: true,
            msg: 'Delete Sucess'
            }); 
        })
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`listen at the port ${this.port}`);
        });
    }

}

module.exports = Server;