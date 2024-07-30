const DB = require("../DB/dbConfig");

const addRequest = async (req, res) => {
    const queryToAddRequest = "INSERT INTO`requests`(`assignId`, `teacherId`,`course_code`, `course_name`, `description`, `dateCreated`, `dateUpdated`, `currentHandle`, `status`) VALUES (?)";
    const VALUES = [
      req.body.values.AssignId,
        req.body.values.teacherID,
        req.body.values.courseCode,
        req.body.values.courseName,
        req.body.reason,
        req.body.values.dateCreated,
        req.body.values.dateUpdated,
        req.body.values.currentHandle,
        req.body.values.status
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

module.exports = {addRequest}