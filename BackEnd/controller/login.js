const DB = require("../DB/dbConfig")

const Login = async (req,res) => {
    const Query = "SELECT * FROM admin WHERE `adminEmail` = ? AND `adminPassword` = ?";
    const{email,password}=req.body;
    DB.query(Query, [email,password], (err,data) => {
        if(err){
            return res.json("Login Failed");
        }
        if(data.length > 0){
            req.session.user = data[0].adminEmail;
            req.session.userId = data[0].adminId;
            // console.log("first",req.session.userId);
            return res.json("success")
        }
        else{
            return res.json("fail");
        }
    })
}

module.exports=Login;