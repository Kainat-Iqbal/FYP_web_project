const express = require("express");
const { deanViewChangeReq, deanAddDisapprove, deanViewDisapproveReq, deanApproveReq } = require("../controller/deanChangeReq");
const deanChangeReqRouter = express.Router();

deanChangeReqRouter.route('/deanView').get(deanViewChangeReq)
deanChangeReqRouter.route('/deanViewDisapprove').get(deanViewDisapproveReq)
deanChangeReqRouter.route('/deanDisapprove/:id').put(deanAddDisapprove)
deanChangeReqRouter.route('/deanApprove/:id').put(deanApproveReq)


module.exports = {deanChangeReqRouter}