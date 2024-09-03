const express=require("express");
const { addResult, getResult, updateResult, getSelectedResults, getResultForGraph, viewResultOfSpecificCourse } = require("../controller/result");

const resultRouter=express.Router();

resultRouter.route('/Add').post(addResult)
resultRouter.route('/Get/:studentId/:assignId').get(getResult)
resultRouter.route('/Update/:id').put(updateResult)
resultRouter.route('/GetSelected').get(getSelectedResults)
resultRouter.route('/Get/:assignId').get(getResultForGraph)
resultRouter.route('/GetResult/:assignId').get(viewResultOfSpecificCourse)

module.exports={resultRouter}