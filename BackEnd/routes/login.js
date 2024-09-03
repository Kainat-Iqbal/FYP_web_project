const express=require("express");
const {Login/* ,Logout */} = require("../controller/login");
const loginRouter=express.Router();
/* console.log(Logout) */

loginRouter.route('/').post(Login)
/* oginRouter.route('/logout').post(Logout) */



module.exports={loginRouter}