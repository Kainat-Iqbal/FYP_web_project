const express = require('express');
const cors = require('cors');
const { loginRouter } = require('./routes/login');
const app = express();
app.use(express.json());
app.use(cors());
const DB = require("./DB/dbConfig");
const { teacherRouter } = require('./routes/teacher');


app.use("/login",loginRouter)
app.use("/teacher",teacherRouter)


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
