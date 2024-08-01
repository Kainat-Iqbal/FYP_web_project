const express=require("express");
const { viewResultApprovalExamination, viewSelectedResultExamination, approveResultExamination } = require("../controller/examinationResultApproval");
const resultApprovalExaminationRouter=express.Router();

resultApprovalExaminationRouter.route('/View').get(viewResultApprovalExamination)
resultApprovalExaminationRouter.route('/Get/:assignId').get(viewSelectedResultExamination)
// resultApprovalExaminationRouter.route('/Disapprove/:id').put(addDisapprove)
resultApprovalExaminationRouter.route('/Approve/:id').put(approveResultExamination)


module.exports = {resultApprovalExaminationRouter}