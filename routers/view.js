module.exports = function(express){
    const router = express.Router();
    router.get('/', function (req, res) {
        return res.render("index", {
            logged: req.session.logged,
            username: req.session.username,
            req_url: req.url
        });
    });
    return router;
}