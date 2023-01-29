module.exports = function(express){
    const router = express.Router();
    router.get('/', function (req, res) {
        return res.render("game/index");
    });
    return router;
}