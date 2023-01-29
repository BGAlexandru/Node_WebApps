module.exports = function(express, db, bcrypt, jwt, JWT_SECRET){
    const router = express.Router();
    router.post('/', async function (req, res) {
        if (!req.body.username) { return res.send({ message: "Username can't be empty!" }); }
        if (!req.body.password) { return res.send({ message: "Password can't be empty!" }); }
        const username = req.body.username.toString();
        const password = req.body.password.toString();
        let sql = 'SELECT * FROM user_db.users WHERE username =?;';
        db.sql_query(sql, username, async function (err, sql_data) {
            if (err) { return console.log(err.message); }
            if (!sql_data[0]) { return res.send({ message: "Your username is wrong!" }); }
            if (!(await bcrypt.compare(password, sql_data[0].password))) { return res.send({ message: "Your Password is wrong!" }); }
            req.session.logged = true;
            req.session.user_id = sql_data[0].user_id;
            req.session.username = username;
            const token = jwt.sign({ username: username }, JWT_SECRET);
            res.send({ message: 'ok', token: token });
        });
    });
    return router;
}