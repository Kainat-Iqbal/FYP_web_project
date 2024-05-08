const mysql = require("mysql");

const DB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "academicaccelerator"
})


module.exports = DB