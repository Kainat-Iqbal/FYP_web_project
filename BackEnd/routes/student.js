const express=require("express");
const { addStudent, viewStudent } = require("../controller/student");
const studentRouter=express.Router();

studentRouter.route('/Add').post(addStudent)
studentRouter.route('/View').get(viewStudent)
// studentRouter.route('/Edit/:id').get(getBatch)
// studentRouter.route('/Update/:id').put(updateBatch)


module.exports = {studentRouter}