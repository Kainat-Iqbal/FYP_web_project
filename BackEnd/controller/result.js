const DB = require("../DB/dbConfig");

const addResult = async (req, res) => {
    const queryToAddResult = "INSERT INTO `result` (`studentId`, `assignId`, `terminalSessionalMarks`, `midMarks`, `labMarks`, `totalMarks`, `isAttempt`, `GPA`, `examDate`, `submissionDate`, `resultCode`) VALUES (?)";
    const VALUES = [
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
        req.body.resultCode
    ];

    DB.query(queryToAddResult, [VALUES], (err, result) => {
        if (err) {
            console.error("Error adding result:", err);
            return res.status(500).json({ success: false, message: "Failed to add result" });
        } else {
            const insertedId = result.insertId; // Get the last inserted ID
            return res.json({ success: true, resultId: insertedId });
        }
    });
};

const getResult = async (req, res) => {
    const queryToGet = `SELECT r.midMarks,r.terminalSessionalMarks,r.labMarks,r.totalMarks,r.s.name,s.enrollement,s.seatNo,s.fatherName FROM result r JOIN s.studentId=r.studentId WHERE resultId = ?`;
    const id = req.params.id;
    DB.query(queryToGet, [id], (err, result) => {
        if (err) {
            return res.json({ Error: err });
        } else {
            return res.json(result[0]);
        }
    });
};

const updateResult = async (req, res) => {
    const quertToUpdate = "UPDATE `result` SET `studentId`=?,`assignId`=?,`terminalSessionalMarks`=?,`midMarks`=?,`labMarks`=?,`totalMarks`=?,`isAttempt`=?,`GPA`=?,`examDate`=?,`submissionDate`=?,`resultCode`=? WHERE resultId= ?";
    const id = req.params.id;
    const VALUE = [
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

    DB.query(quertToUpdate, VALUE, (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json({ updated: true });
        }
    });
};

module.exports = { addResult, getResult, updateResult };
