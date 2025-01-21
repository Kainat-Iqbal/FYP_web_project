const express=require("express");
const { viewResultApproval, viewSelectedResult, approveResult, disapproveResult } = require("../controller/hodResultApproval");
const resultApprovalHodRouter=express.Router();

resultApprovalHodRouter.route('/View').get(viewResultApproval)
resultApprovalHodRouter.route('/Get/:assignId').get(viewSelectedResult)
// resultApprovalHodRouter.route('/Disapprove/:id').put(addDisapprove)
resultApprovalHodRouter.route('/Approve/:id').put(approveResult)
resultApprovalHodRouter.route('/DisApprove/:id').put(disapproveResult)

module.exports = {resultApprovalHodRouter}