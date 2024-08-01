const express=require("express");
const { viewResultApproval, viewSelectedResult, approveResult } = require("../controller/hodResultApproval");
const resultApprovalHodRouter=express.Router();

resultApprovalHodRouter.route('/View').get(viewResultApproval)
resultApprovalHodRouter.route('/Get/:assignId').get(viewSelectedResult)
// resultApprovalHodRouter.route('/Disapprove/:id').put(addDisapprove)
resultApprovalHodRouter.route('/Approve/:id').put(approveResult)


module.exports = {resultApprovalHodRouter}