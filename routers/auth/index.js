module.exports = function(express){
    //modules
    const folder_node = '../../server/scripts/node_modules/';
    const path = require('path');
    const bcrypt = require(path.join(folder_node, '/bcrypt'));
    const jwt = require(path.join(folder_node, '/jsonwebtoken'));
    const JWT_SECRET = 'qwerty';
    const db = require('../../server/database');
    //routers
    const router = express.Router();
    router.use('/server/auth/signin', require("./signin")(express, db, bcrypt, jwt, JWT_SECRET));
    router.use('/server/auth/login', require("./login")(express, db, bcrypt, jwt, JWT_SECRET));
    router.use('/auth', require("./view")(express));
    return router;
}