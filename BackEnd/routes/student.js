const express=require("express");
const { addStudent, viewStudent, viewStudentPieChart, viewAllIndividualStudentDetails, viewStudentDetailsAccordingToSemester } = require("../controller/student");
const studentRouter=express.Router();

studentRouter.route('/Add').post(addStudent)
studentRouter.route('/View').get(viewStudent)
studentRouter.route('/ViewPieChart').get(viewStudentPieChart)
studentRouter.route('/ViewIndividualStudentDetail/:studentId').get(viewAllIndividualStudentDetails);
studentRouter.route('/ViewStudentDetailWRTSesmester/:studentId').get(viewStudentDetailsAccordingToSemester);

// studentRouter.route('/Edit/:id').get(getBatch)
// studentRouter.route('/Update/:id').put(updateBatch)


module.exports = {studentRouter}