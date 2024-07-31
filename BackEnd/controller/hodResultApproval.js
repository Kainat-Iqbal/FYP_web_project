const DB = require("../DB/dbConfig");

const viewResultApproval = async (req, res) => {
  const queryToViewResults = `SELECT
  s.assignId,
  t.teacherId,
  t.name AS teacherName,
  c.courseId,
  c.course_title AS courseTitle,
  c.course_code,
  b.batchId,
  b.year,
  b.session
FROM
  status s
JOIN
  assign_course ac ON s.assignId = ac.assignId
JOIN
  teacher t ON ac.teacherId = t.teacherId
JOIN
  course c ON ac.courseId = c.courseId
JOIN
  session sess ON ac.sessionId = sess.sessionId
JOIN
  batch b ON sess.batchId = b.batchId
WHERE
  s.lockResult = 'Yes' AND
  s.approvedHod IS NULL;
`;
  // Execute the query
  DB.query(queryToViewResults, (err, results) => {
    if (err) {
      console.error("Error fetching requests:", err);
      return res.status(500).json("Failed to fetch requests");
    } else {
      // If there are results, return them
      if (results.length > 0) {
        console.log("dcd", results);
        return res.json(results);
      } else {
        // If no teachers are found, return an appropriate message
        return res.json("No requests found");
      }
    }
  });
};

const viewSelectedResult = async (req, res) => {
  const assing_id = req.params.assignId;

  const queryToViewResults = `SELECT 
  r.*, 
  s.* 
FROM 
  result r
JOIN 
  student s ON r.studentId = s.studentId
WHERE 
  r.assignId = ?;
`;
  // Execute the query
  DB.query(queryToViewResults,assing_id, (err, results) => {
    if (err) {
      console.error("Error fetching requests:", err);
      return res.status(500).json("Failed to fetch requests");
    } else {
      // If there are results, return them
      if (results.length > 0) {
        console.log("dcd", results);
        return res.json(results);
      } else {
        // If no teachers are found, return an appropriate message
        return res.json("No results found");
      }
    }
  });
};

module.exports = { viewResultApproval,viewSelectedResult };
