const express=require("express");
const { addResult, getResult, updateResult } = require("../controller/result");

const resultRouter=express.Router();

resultRouter.route('/Add').post(addResult)
resultRouter.route('/Get/:id').get(getResult)
resultRouter.route('/Update/:id').put(updateResult)
module.exports={resultRouter}