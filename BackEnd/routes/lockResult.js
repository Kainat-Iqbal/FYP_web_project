const express=require("express");
const { addLockResultStatus, viewLockResults } = require("../controller/lockResult");
const lockResultRouter=express.Router();

lockResultRouter.route('/Add').post(addLockResultStatus)
lockResultRouter.route('/View').get(viewLockResults)
// changeReqRouter.route('/Disapprove/:id').put(addDisapprove)
// changeReqRouter.route('/Approve/:id').put(approveReq)


module.exports = {lockResultRouter}