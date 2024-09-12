const DB = require("../DB/dbConfig");

const addResult = async (req, res) => {
    const queryToAddResult = "INSERT INTO `result` (`studentId`, `assignId`, `terminalMarks`, `midMarks`, `labMarks`, `totalMarks`, `isAttempt`, `GPA`, `examDate`, `submissionDate`, `resultCode`,`selectedStudent`) VALUES (?)";
    const VALUES = [
        req.body.studentId,
        req.body.assignId,
        req.body.terminalSessionalMarks,
        req.body.midMarks,
        req.body.labMarks,
        req.body.totalMarks,
        req.body.isAttempt,
        req.body.GPA,
        req.body.examDate=" ",
        req.body.submissionDate=" ",
        req.body.resultCode= " ",
        req.body.selectedStudent
    ];
// console.log(VALUES)
    DB.query(queryToAddResult, [VALUES], (err, result) => {
        if (err) {
            console.error("Error adding result:", err);
            return res.status(500).json({ success: false, message: "Failed to add result" });
        } else {
            const insertedId = result.insertId; // Get the last inserted ID
            return res.json("success");
        }
    });
};

const getResult = async (req, res) => {
    const queryToGet = `SELECT * 
FROM result 
WHERE studentId = ? AND assignId = ?;
`;
    const id = req.params.studentId;
    const assing_id = req.params.assignId;

    DB.query(queryToGet, [id,assing_id], (err, result) => {
        if (err) {
            return res.json({ Error: err });
        } else {
            // console.log("SDC",result)
            return res.json(result[0]);
        }
    });
};

const getResultForGraph = async (req, res) => {
    const queryToGet = `SELECT * 
FROM result 
WHERE assignId = ?;
`;
    const assing_id = req.params.assignId;

    DB.query(queryToGet, [assing_id], (err, result) => {
        if (err) {
            return res.json({ Error: err });
        } else {
            // console.log("SDC",result)
            return res.json(result);
        }
    });
};

const updateResult = async (req, res) => {
    const queryToUpdate = 
       ` UPDATE result
        SET
            studentId = ?,
            assignId = ?,
            terminalMarks = ?,
            midMarks = ?,
            labMarks = ?,
            totalMarks = ?,
            isAttempt = ?,
            GPA = ?,
            examDate = ?,
            submissionDate = ?,
            resultCode = ?
        WHERE resultId = ?`
    ;
    const id = req.params.id;
    const values = [
        req.body.studentId,
        req.body.assignId,
        req.body.terminalSessionalMarks,
        req.body.midMarks,
        req.body.labMarks,
        req.body.totalMarks,
        req.body.isAttempt,
        req.body.GPA,
        req.body.examDate,
        req.body.submissionDate,
        req.body.resultCode,
        id
    ];
console.log("UPDATE,,",values)
    DB.query(queryToUpdate, values, (err, result) => {
        if (err) {
            console.error("Error updating result:", err);
            return res.status(500).json({ success: false, message: "Failed to update result" });
        } else {
            return res.json({ updated: true });
        }
    });
};

const getSelectedResults = (req, res) => {
    // Retrieve the assignId from query parameters
    const assignId = req.query.assignId;

    // Define the SQL query
    const query = `
        SELECT * FROM result
        WHERE assignId = ? AND selectedStudent = "True"
    `;

    // Execute the query
    DB.query(query, [assignId], (err, results) => {
        if (err) {
            // Log the error for debugging
            console.error("Error fetching selected results:", err);
            // Send a 500 error response
            return res.status(500).json({ success: false, message: "Failed to fetch results" });
        }

        // Ensure results is an array before trying to use it
        if (!Array.isArray(results)) {
            console.error("Unexpected result format:", results);
            return res.status(500).json({ success: false, message: "Unexpected result format" });
        }

        // Send the results back to the client with success status
        // console.log("SD",assignId)
        // console.log(",,dfd",results)
        res.json({ success: true, data: results });
    });
};

const viewResultOfSpecificCourse = async (req, res) => {
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



module.exports = { addResult, getResult, updateResult,getSelectedResults,getResultForGraph,viewResultOfSpecificCourse};
