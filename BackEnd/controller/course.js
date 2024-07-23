const DB = require("../DB/dbConfig");

const viewCourse = async (req, res) => {
    const queryToViewCourse = `
SELECT ac.*, c.*, t.*,  s.*, dp.*, b.*,st.* FROM  assign_course ac 
JOIN course c ON ac.courseId = c.courseId 
JOIN teacher t ON ac.teacherId = t.teacherId 
JOIN session s ON ac.sessionId = s.sessionId 
JOIN degree_program dp ON s.programId = dp.programId 
JOIN batch b ON s.batchId=b.batchId
JOIN student st ON st.batchId=b.batchId
WHERE t.teacherId = 4`;
    DB.query(queryToViewCourse, (err, results) => {
        if (err) {
            console.error("Error fetching course:", err);
            return res.status(500).json("Failed to fetch course");
        } else {
            if (results.length > 0) {
                return res.json(results);
            } else {
                return res.json("No course found");
            }
        }
    });
};

module.exports = { viewCourse };
