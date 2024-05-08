const express=require("express");
const { addTeacher, viewTeacher } = require("../controller/teacher");
const teacherRouter=express.Router();

teacherRouter.route('/Add').post(addTeacher)
teacherRouter.route('/View').get(viewTeacher)

module.exports={teacherRouter}