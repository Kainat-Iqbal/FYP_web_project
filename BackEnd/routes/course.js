const express=require("express")
const {viewCourse}= require("../controller/course");
const courseRouter=express.Router();

courseRouter.route('/view').get(viewCourse)

module.exports={courseRouter};