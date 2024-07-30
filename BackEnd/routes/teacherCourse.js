const express=require("express")
const {viewTeacherCourse}= require("../controller/teacherCourses");
const teacherCourseRouter=express.Router();

teacherCourseRouter.route('/view').get(viewTeacherCourse)

module.exports={teacherCourseRouter};