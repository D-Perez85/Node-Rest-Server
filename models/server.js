const express = require('express')

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
        // Public Folder
        this.app.use(express.static('public'))
    }
    routes() {
        this.app.get('/test', (req, res) => {
            res.send('Hello Mundo')
        })
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`listen at the port ${this.port}`);
        });
    }

}

module.exports = Server;