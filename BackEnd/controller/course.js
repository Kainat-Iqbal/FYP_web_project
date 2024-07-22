const DB = require("../DB/dbConfig");

const viewCourse = async (req, res) => {
    const queryToViewCourse = `
        SELECT c.* FROM assign_course ac 
        JOIN course c ON ac.courseId = c.courseId 
        JOIN teacher t ON ac.teacherId = t.teacherId 
        WHERE t.teacherId = 4
    `;
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
