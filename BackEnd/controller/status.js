const DB = require("../DB/dbConfig");

const addStatus = async (req, res) => {
    const queryToAddStatus = "INSERT INTO`status`(`resultId`,`teacherId`, `lockResult`, `currentStatus`, `Department`) VALUES (?)";
    const VALUES = [
        req.body.resultId,
        req.body.teacherID,
        req.body.lockResult,
        req.body.currentStatus,
        req.body.Department,
      ];
      console.log(VALUES)
    // Execute the query
    DB.query(queryToAddStatus, [VALUES], (err, data) => {
        if (err) {
            console.error("Error adding status:", err);
            return res
              .status(500)
              .json({ success: false, message: "Failed to add status" });
          } 
          else {
            console.log("status added successfully");
            return res.json("success");
          }
    });
};
const checkLockStatus  = async (req, res) => {
    const queryToVCheckLockStatus = 'SELECT COUNT(*) as count FROM status WHERE lockResult = true';
    DB.query(queryToVCheckLockStatus, (err, data) => {
      if (err) {
        console.error("Error checking lock status:", err);
        return res.status(500).json({ success: false, message: "Failed to check lock status" });
      } 
      const isLocked = data[0].count > 0;
      res.status(200).json({ isLocked });
    });};

module.exports = {addStatus,checkLockStatus}