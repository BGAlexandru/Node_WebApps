module.exports = function(express){
    const router = express.Router();
    //authentification
    router.use('/', require("./auth/index")(express));
    //game
    router.use('/', require("./game/index")(express));
    //start page
    router.use('/', require("./view")(express));
    return router;
}