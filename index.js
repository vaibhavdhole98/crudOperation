const express = require('express')
const app = express()
const port = 3000
var mysql = require("mysql");
app.set('view engine', 'ejs');


var bodyParser = require("body-parser"); //we use bodyParser to get data from json
app.use(bodyParser.urlencoded({ extented: true }));
app.use(bodyParser.json());

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
})

conn.connect(function(err) {
    if (err) throw err;
    console.log("mysql connected");
})

app.get('/', (req, res) => {
    res.render("insert");
})


//Add 
app.post("/insert", function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let sql = `insert into users(user_name,user_email,user_password) values('${name}','${email}','${password}')`;

    conn.query(sql, function(err, results) {
        if (err) throw err;
        res.redirect('/show');
        // res.send("<h1>Data Sent.</h1>")

    })
})

//Read
app.get('/show', function(req, res) {
    let sql = 'select * from users';
    conn.query(sql, function(err, results) {
        if (err) throw err;
        res.render('show', { users: results });
    })
})


//Delete
app.get('/delete/:id', function(req, res) {
    let id = req.params.id;
    let sql = `delete from users where user_id=${id} `;
    conn.query(sql, function(err, results) {
        if (err) throw err;
        res.redirect('/show');
    })
})


//Edit
app.get('/edit/:id', function(req, res) {
    let id = req.params.id;
    let sql = `select *  from users where user_id=${id} `;
    conn.query(sql, function(err, results) {
        if (err) throw err;
        res.render('edit', { users: results })
            //res.redirect('/show');
    })
})

app.post("/update/:id", function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let id = req.params.id;

    let sql = `update users set user_name='${name}' ,user_email='${email}',user_password='${password}' where user_id='${id}'`;

    conn.query(sql, function(err, results) {
        if (err) throw err;
        res.redirect('/show');
        // res.send("<h1>Data Sent.</h1>")

    })
})




app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})