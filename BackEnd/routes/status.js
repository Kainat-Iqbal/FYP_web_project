const express=require("express");
const { addStatus } = require("../controller/status");
const {checkLockStatus}=require("../controller/status")
const statusRouter=express.Router();

statusRouter.route('/Add').post(addStatus)
statusRouter.route('/checkStatus').get(checkLockStatus)



module.exports = {statusRouter}