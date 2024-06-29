const express=require("express");
const { getAll, addAssignCourse } = require("../controller/assignCourse");
const assignCourseRouter=express.Router();

assignCourseRouter.route('/Get').get(getAll)
assignCourseRouter.route('/Add').post(addAssignCourse)

module.exports = {assignCourseRouter}