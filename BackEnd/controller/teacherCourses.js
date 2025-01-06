const DB = require("../DB/dbConfig");

const viewTeacherCourse = async (req, res) => {
    const { teacherId, batchId, filter ,order,searchQuery} = req.query; // Get filter from query parameters
    const currentYear = new Date().getFullYear(); // Define currentYear for filtering
// Get both query parameters
    // console.log("teacherId",teacherId)
    // console.log("batchId",batchId)

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
    }

    if (batchId) {
        if (queryParams.length > 0) {
            queryToViewCourse += ' AND b.batchId = ?';
        } else {
            queryToViewCourse += ' WHERE b.batchId = ?';
        }
        queryParams.push(batchId);
    }
    // Filtering based on the selected tab
    if (filter === "current") {
        queryToViewCourse += `${queryParams.length ? ' AND' : ' WHERE'} YEAR(STR_TO_DATE(ac.assignDate, '%d-%m-%Y')) = ?`;
        queryParams.push(currentYear);
    } else if (filter === "past") {
        queryToViewCourse += `${queryParams.length ? ' AND' : ' WHERE'} YEAR(STR_TO_DATE(ac.assignDate, '%d-%m-%Y')) < ?`;
        queryParams.push(currentYear);
    }
    if (searchQuery) {
        queryToViewCourse += `${queryParams.length ? ' AND' : ' WHERE'} c.course_title LIKE ?`;
        queryParams.push(`%${searchQuery}%`);
    }// Sort based on the order parameter
    if (order === "name") {
        queryToViewCourse += ` ORDER BY c.course_title ASC`;
    } else if (order === "RecentlyAssigned") {
        queryToViewCourse += ` ORDER BY STR_TO_DATE(ac.assignDate, '%d-%m-%Y') DESC`; // Assuming last_accessed is a column
    }

    // console.log("Query:", queryToViewCourse);
    // console.log("Query Params:", queryParams);
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