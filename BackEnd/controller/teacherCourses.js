const DB = require("../DB/dbConfig");

const viewTeacherCourse = async (req, res) => {
    const { teacherId, batchId } = req.query; // Get both query parameters
    console.log("teacherId",teacherId)
    console.log("batchId",batchId)

    let queryToViewCourse = `
        SELECT ac.*, c.*, t.*, s.*, dp.*, b.*, st.* 
        FROM assign_course ac 
        JOIN course c ON ac.courseId = c.courseId 
        JOIN teacher t ON ac.teacherId = t.teacherId 
        JOIN session s ON ac.sessionId = s.sessionId 
        JOIN degree_program dp ON s.programId = dp.programId 
        JOIN batch b ON s.batchId = b.batchId 
        JOIN student st ON st.batchId = b.batchId`;

    const queryParams = [];

    if (teacherId) {
        queryToViewCourse += ' WHERE t.teacherId = ?';
        queryParams.push(teacherId);
    } else if (batchId) {
        queryToViewCourse += ' WHERE b.batchId = ?';
        queryParams.push(batchId);
    }

    DB.query(queryToViewCourse, queryParams, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json("Failed to fetch data");
        } else {
            if (results.length > 0) {
                // console.log("firstcvcv",results)
                return res.json(results);
            } else {
                return res.json("No data found");
            }
        }
    });
};

module.exports = { viewTeacherCourse };