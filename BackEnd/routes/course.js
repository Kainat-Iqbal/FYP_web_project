const express=require("express");
const { addCourse, viewCourse, getCourse, updateCourse } = require("../controller/course");
const courseRouter=express.Router();

courseRouter.route('/Add').post(addCourse)
courseRouter.route('/View').get(viewCourse)
courseRouter.route('/Edit/:id').get(getCourse)
courseRouter.route('/Update/:id').put(updateCourse)


module.exports = {courseRouter}