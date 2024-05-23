const express = require('express');
const cors = require('cors');
const { loginRouter } = require('./routes/login');
const app = express();
const DB = require("./DB/dbConfig");
const { teacherRouter } = require('./routes/teacher');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true
}));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false,
        maxAge: 1000 *60*60*24
     } // Set to true if using HTTPS
}));
app.use("/login",loginRouter)
app.use("/teacher",teacherRouter)

app.get('/session', (req,res) => {
    if(req.session.user){
        return res.json({valid: true, user: req.session.user})
    }
    else{
        return res.json({valid:false})
    }
})

DB.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});
app.listen(8081, ()=>{
    console.log("listening")
})
