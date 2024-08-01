const DB = require("../DB/dbConfig");

const viewResultApprovalExamination = async (req, res) => {
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
  s.approvedDean = 'Yes' AND
  s.approvedExamination IS NULL;
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

const viewSelectedResultExamination = async (req, res) => {
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

const approveResultExamination = async (req, res) => {
  const { id } = req.params;
  const {examinationId} = req.body;

  const queryToUpdateApproveRequest =
    "UPDATE `status` SET `examinationId`=?, `approvedExamination`=?, `studentView`=? WHERE assignId = ?";

  // Directly use the values without unnecessary variable assignments
  const values = [
    examinationId,
    "Yes", // currentHandle
    "Yes",
    id, // requestId
  ];

  DB.query(queryToUpdateApproveRequest, values, (err, results) => {
    if (err) {
      console.error("Error updating status:", err);
      return res.status(500).json("Failed to update status");
    } else {
      if (results.affectedRows > 0) {
        // console.log("approve",id);
        return res.json({ updated: true });
      } else {
        return res.status(404).json("Request not found");
      }
    }
  });
};

module.exports = { viewResultApprovalExamination,viewSelectedResultExamination,approveResultExamination };
