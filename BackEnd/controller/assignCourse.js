const DB = require("../DB/dbConfig");

const getAll = (req, res) => {
    const queryToGetTeachers = "SELECT * FROM teacher";
    const queryToGetCourses = `
    SELECT c.courseId, c.course_title, c.course_code
    FROM course c
    LEFT JOIN assign_course ac ON c.courseId = ac.courseId
    WHERE ac.courseId IS NULL;
  `;
    const queryToGetBatch = "SELECT * FROM batch";
    const queryToGetSession = "SELECT * FROM session";
    const queryToGetclass = "SELECT * FROM degree_program";

    let results = {};
    let completedQueries = 0;
    const totalQueries = 5;

    const checkIfComplete = () => {
        completedQueries++;
        if (completedQueries === totalQueries) {
            res.json(results);
        }
    };

    DB.query(queryToGetTeachers, (err, teachers) => {
        if (err) {
            console.log("Error to get Teacher");
            results.teachers = [];
        } else {
            // console.log(teachers)
            results.teachers = teachers;
        }
        checkIfComplete();
    });

    DB.query(queryToGetCourses, (err, courses) => {
        if (err) {
            console.log("Error to get Courses");
            results.courses = [];
        } else {
            results.courses = courses;
        }
        checkIfComplete();
    });

    DB.query(queryToGetBatch, (err, batch) => {
        if (err) {
            console.log("Error to get Batch");
            results.batch = [];
        } else {
            results.batch = batch;
        }
        checkIfComplete();
    });

    DB.query(queryToGetSession, (err, session) => {
        if (err) {
            console.log("Error to get Session");
            results.session = [];
        } else {
            results.session = session;
        }
        checkIfComplete();
    });

    DB.query(queryToGetclass, (err, degree_program) => {
        if (err) {
            console.log("Error to get class");
            results.degree_program = [];
        } else {
            results.degree_program = degree_program;
        }
        checkIfComplete();
    });
};

const addAssignCourse = async (req, res) => {
    const HODId = 1;
    const queryToAdd = "INSERT INTO `assign_course`(`HODId`, `teacherId`, `courseId`, `sessionId`, `assignDate`) VALUES (?)";
    const VALUES = [
        HODId,
        req.body.teacherId,
        req.body.courseId,
        req.body.selectedSessionId,
        req.body.date
       // req.body.batchId,
    //req.body.classId,
      ];
      console.log(VALUES)
    // Execute the query
    DB.query(queryToAdd, [VALUES], (err, data) => {
        if (err) {
           console.log("Error",err)
          } 
          else {
            console.log("Course assigned successfully");
            return res.json("success");
          }
    });
};

module.exports = { getAll,addAssignCourse };
