const DB = require("../DB/dbConfig");

const addLockResultStatus = async (req, res) => {
    const queryToAddRequest = "INSERT INTO `status`(`assignId`,`teacherId`, `lockResult`) VALUES (?)";
    const VALUES = [
        req.body.AssignId,
        req.body.teacherID,
        req.body.lockResult
      ];
      console.log("SDXDSDDC",VALUES)
    //Execute the query
    DB.query(queryToAddRequest, [VALUES], (err, data) => {
        if (err) {
            console.error("Error adding request:", err);
            return res
              .status(500)
              .json({ success: false, message: "Failed to add request" });
          } 
          else {
            console.log("request added successfully");
            return res.json("success");
          }
    });
};

const viewLockResults = async (req, res) => {
    // Query to fetch all teachers from the database
    const queryToViewBatch = "SELECT * FROM status";
    // Execute the query
    DB.query(queryToViewBatch, (err, results) => {
        if (err) {
            console.error("Error fetching status:", err);
            return res.status(500).json("Failed to fetch status");
        } 
        else {
            // If there are results, return them
            if (results.length > 0) {
                // console.log(results)
                return res.json(results);
            } 
            else {
                // If no teachers are found, return an appropriate message
                return res.json("No status found");
            }
        }
    });
  };

module.exports = {addLockResultStatus,viewLockResults}