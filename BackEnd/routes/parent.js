const express=require("express");
const { addParent } = require("../controller/parent");
const parentRouter=express.Router();

parentRouter.route('/Add').post(addParent)

module.exports = {parentRouter}