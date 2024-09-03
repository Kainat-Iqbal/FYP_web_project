const express=require("express");
const { addRequest } = require("../controller/editRequest");
const requestRouter=express.Router();

requestRouter.route('/Add').post(addRequest)



module.exports = {requestRouter}