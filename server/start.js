//folder paths
const path = require('path')
const folder_node = '../server/scripts/node_modules';
//extensions
const express = require(path.join(folder_node, '/express'));
const session = require(path.join(folder_node, '/express-session'));
//functions
const app = express();
app.set('views', path.join(__dirname, '../view'));
app.set('view engine', 'ejs');
app.use(express.json(), session({ secret: 'qwerty', resave: true, saveUninitialized: true }));
//middleware
app.use(express.static(path.join(__dirname, '../public/')));
//routes
app.use('/', require("../routers/index")(express));
//listen to 'localhost:port'
app.listen(8080, function (err) {
    if (err) { console.log(err.message); }
    else { console.log("Server connected"); }
});