const express=require("express");
const { viewChangeReq, addDisapprove, viewDisapproveReq, approveReq } = require("../controller/changeReq");
const changeReqRouter=express.Router();

changeReqRouter.route('/View').get(viewChangeReq)
changeReqRouter.route('/ViewDisapprove').get(viewDisapproveReq)
changeReqRouter.route('/Disapprove/:id').put(addDisapprove)
changeReqRouter.route('/Approve/:id').put(approveReq)


module.exports = {changeReqRouter}