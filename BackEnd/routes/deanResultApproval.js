const express=require("express");
const { viewResultApprovalDean, viewSelectedResultDean, approveResultDean } = require("../controller/deanResultApproval");
const resultApprovalDeanRouter=express.Router();

resultApprovalDeanRouter.route('/View').get(viewResultApprovalDean)
resultApprovalDeanRouter.route('/Get/:assignId').get(viewSelectedResultDean)
// resultApprovalDeanRouter.route('/Disapprove/:id').put(addDisapprove)
resultApprovalDeanRouter.route('/Approve/:id').put(approveResultDean)


module.exports = {resultApprovalDeanRouter}