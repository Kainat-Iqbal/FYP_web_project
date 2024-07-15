const express=require("express");
const { addDegree, viewDegree, getDegree, updateDegree } = require("../controller/degree");
const degreeRouter=express.Router();

degreeRouter.route('/Add').post(addDegree)
degreeRouter.route('/View').get(viewDegree)
degreeRouter.route('/Edit/:id').get(getDegree)
degreeRouter.route('/Update/:id').put(updateDegree)


module.exports = {degreeRouter}