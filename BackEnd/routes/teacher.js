const express=require("express");
const { addTeacher, viewTeacher, getTeacher, updateTeacher } = require("../controller/teacher");
const teacherRouter=express.Router();

teacherRouter.route('/Add').post(addTeacher)
teacherRouter.route('/View').get(viewTeacher)
teacherRouter.route('/Edit/:id').get(getTeacher)
teacherRouter.route('/Update/:id').put(updateTeacher)

module.exports={teacherRouter}