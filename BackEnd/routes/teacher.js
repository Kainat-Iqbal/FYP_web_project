const express=require("express");
const { addTeacher, viewTeacher, updateTeacher } = require("../controller/teacher");
const teacherRouter=express.Router();

teacherRouter.route('/Add').post(addTeacher)
teacherRouter.route('/View').get(viewTeacher)
teacherRouter.route('/Update').get(updateTeacher)

module.exports={teacherRouter}