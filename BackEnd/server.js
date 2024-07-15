const express = require('express');
const cors = require('cors');
const { loginRouter } = require('./routes/login');
const app = express();
const DB = require("./DB/dbConfig");
const { teacherRouter } = require('./routes/teacher');
const { deanRouter } = require('./routes/dean');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { examinationRouter } = require('./routes/examination');
const { hodRouter } = require('./routes/hod');
const { courseRouter } = require('./routes/course');
const { degreeRouter } = require('./routes/degree');

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
app.use("/dean",deanRouter)
app.use("/examination",examinationRouter)
app.use("/hod",hodRouter)
app.use("/course",courseRouter)
app.use("/degree",degreeRouter)

app.get('/session', (req,res) => {
    if(req.session.user){
        // console.log(req.session.user)
        // console.log(req.session.userId)
        return res.json({valid: true, user: req.session.user, userId : req.session.userId})
    }
    else{
        // console.log("CFCFDC")
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
