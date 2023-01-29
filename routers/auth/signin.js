module.exports = function(express, db, bcrypt, jwt, JWT_SECRET){
    const router = express.Router();
    router.post('/', async function (req, res) {
        if (!req.body.username) { return res.send({ message: "Username can't be empty!" }); }
        if (!req.body.password) { return res.send({ message: "Password can't be empty!" }); }
        if (!req.body.confirm_password) { return res.send({ message: "Confirm password!" }); }
        const username = req.body.username.toString();
        const password = req.body.password.toString();
        const confirm_password = req.body.confirm_password.toString();
        const schar = "123456789!@#$%^&*()[]{}<>?";
        const contain = function (p, c) {
            for (i = 0; i < c.length; i++) {
                if (p.includes(c[i])) { return false; }
            }
            return true;
        }
        if (password.length < 6) { return res.send({ message: "Password must be at least 6 characters long!" }); }
        if (contain(password, schar)) { return res.send({ message: "Password must contain at least one special character(" + schar + ")!" }); }
        if (password != confirm_password) { return res.send({ message: "Passwords don't match!" }); }
        //all good
        const password_checked = await bcrypt.hash(password, 10);
        //check if username alerady in use
        const sql = 'SELECT * FROM user_db.users WHERE username =?;';
        db.sql_query(sql, username, async function (err, sql_data) {
            if (err) { return console.log(err.message); }
            if (sql_data.length) { return res.send({ message: "Username already in use!" }); }
            //register new user
            const sql = 'INSERT INTO user_db.users VALUES (default, ?, ?);';
            db.sql_query(sql, [username, password_checked], async function (err, sql_data) {
                if (err) { return console.log(err.message); }
                req.session.logged = true;
                req.session.user_id = sql_data.insertId;
                req.session.username = username;
                const token = jwt.sign({ username: username }, JWT_SECRET)
                res.send({ message: 'ok', token: token });
            });
        });
    });
    return router;
}