const express = require('express')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.routes();
    }
    routes() {
        this.app.get('/', (req, res) => {
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