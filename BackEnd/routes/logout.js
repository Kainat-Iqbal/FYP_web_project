const express=require("express");
const { Logout } = require("../controller/logout");
const logoutRouter=express.Router();

logoutRouter.route('/').post(Logout)


module.exports={logoutRouter}