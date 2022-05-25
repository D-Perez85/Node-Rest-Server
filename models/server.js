const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth:      '/api/auth',
      categorys: '/api/categorys',
      products : '/api/products',
      search: '/api/search',
      users:     '/api/users',
    }
    // DataBase conect
    this.conectDB();
    // Middlewares
    this.middlewares();
    // Routes
    this.routes();
  }
  async conectDB() {
    await dbConnection();
  }
  middlewares() {
    // Cors
    this.app.use(cors());
    // Reading & Parse of body
    this.app.use(express.json());
    // Public Folder
    this.app.use(express.static("public"));
  }
  routes() {
     this.app.use(this.paths.auth, require("../routes/auth")); 
     this.app.use(this.paths.categorys, require("../routes/categorys")); 
     this.app.use(this.paths.products, require("../routes/products")); 
     this.app.use(this.paths.search, require("../routes/search")); 
     this.app.use(this.paths.users, require("../routes/users"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`listen at the port ${this.port}`);
    });
  }
}
module.exports = Server;
