module.exports = function(express){
    const router = express.Router();
    router.get(['/', '/login', '/signin'], function (req, res) {
        return res.render("auth/index", {
            logged: req.session.logged,
            username: req.session.username,
            req_url: req.url
        });
    });
    router.get('/logout', function (req, res) {
        return req.session.destroy(function (err) {
            if (err) { console.log(err.message); }
            else { res.redirect('/'); }
        });
    });
    return router;
}