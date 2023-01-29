module.exports = function(express){
    //routers
    const router = express.Router();
    router.use('/game', require("./view")(express));
    return router;
}