const express = require('express'); 
const cors = require('cors'); 

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'; 
        //Middlewares
        this.middlewares(); 
        //Routes
        this.routes();
    }
    middlewares(){
        // Cors
        this.app.use(cors())
        // Reading & Parse of body
        this.app.use(express.json()); 
        // Public Folder
        this.app.use(express.static('public'))
    }
    routes() {
      this.app.use(this.usersPath, require('../routes/users'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`listen at the port ${this.port}`);
        });
    }
}
module.exports = Server;