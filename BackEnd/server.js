const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "demo"
})

app.post('/login', (req,res) => {
    const Query = "SELECT * FROM login WHERE `name` = ? AND `password` = ?";
    db.query(Query, [req.body.email,req.body.password], (err,data) => {
        console.log(req.body.email)
        if(err){
            return res.json("Login Failed");
        }
        if(data.length > 0){
            return res.json("success")
        }
        else{
            return res.json("fail");
        }
    })
})

app.get('/log',(req,res) =>{
    const sql = "SELECT * FROM login";
    db.query(sql, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/',(req,res) => {
    return res.json("From backend side");
})

app.listen(8081, ()=>{
    console.log("listening")
})