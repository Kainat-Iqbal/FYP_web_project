const express=require("express");
const { viewResultApproval, viewSelectedResult } = require("../controller/hodResultApproval");
const resultApprovalHodRouter=express.Router();

resultApprovalHodRouter.route('/View').get(viewResultApproval)
resultApprovalHodRouter.route('/Get/:assignId').get(viewSelectedResult)
// resultApprovalHodRouter.route('/Disapprove/:id').put(addDisapprove)
// resultApprovalHodRouter.route('/Approve/:id').put(approveReq)


module.exports = {resultApprovalHodRouter}