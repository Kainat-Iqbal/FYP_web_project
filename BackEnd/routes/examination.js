const express=require("express");
const { addExamination, viewExamination, getExamination,updateExamination,getExaminationNotifications }=require("../controller/examination");
const examinationRouter=express.Router();

examinationRouter.route('/Add').post(addExamination)
examinationRouter.route('/View').get(viewExamination)
examinationRouter.route('/Edit/:id').get(getExamination)
examinationRouter.route('/Update/:id').put(updateExamination)
examinationRouter.route('/Get/Notification/:id').get(getExaminationNotifications)
module.exports = {examinationRouter}
