const express=require("express");
const { addDean, viewDean, getDean, updateDean } = require("../controller/dean");
const deanRouter=express.Router();

deanRouter.route('/Add').post(addDean)
deanRouter.route('/View').get(viewDean)
deanRouter.route('/Edit/:id').get(getDean)
deanRouter.route('/Update/:id').put(updateDean)


module.exports = {deanRouter}