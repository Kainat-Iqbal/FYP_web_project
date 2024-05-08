const express=require("express");
const Login = require("../controller/login");
const loginRouter=express.Router();

loginRouter.route('/').post(Login)

module.exports={loginRouter}