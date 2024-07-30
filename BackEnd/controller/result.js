const DB = require("../DB/dbConfig");

const addResult = async (req, res) => {
    const queryToAddResult = "INSERT INTO `result` (`studentId`, `assignId`, `terminalMarks`, `midMarks`, `labMarks`, `totalMarks`, `isAttempt`, `GPA`, `examDate`, `submissionDate`, `resultCode`) VALUES (?)";
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
        req.body.resultCode= " "
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

    DB.query(queryToUpdate, values, (err, result) => {
        if (err) {
            console.error("Error updating result:", err);
            return res.status(500).json({ success: false, message: "Failed to update result" });
        } else {
            return res.json({ updated: true });
        }
    });
};

module.exports = { addResult, getResult, updateResult };
