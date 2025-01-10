const express=require("express");
const { getAll, addAssignCourse, getAllCourses ,addAssignCourseToSession} = require("../controller/assignCourse");
const assignCourseRouter=express.Router();

assignCourseRouter.route('/Get').get(getAll)
assignCourseRouter.route('/Add').post(addAssignCourse)
assignCourseRouter.route('/GetAllCourses').get(getAllCourses)


module.exports = {assignCourseRouter}