const DB = require("../DB/dbConfig");

const addRequest = async (req, res) => {
    const queryToAddRequest = "INSERT INTO`requests`(`teacherId`,`course_code`, `course_name`, `description`, `dateCreated`, `dateUpdated`, `currentHandle`, `status`) VALUES (?)";
    const VALUES = [
        req.body.teacherID,
        req.body.courseCode,
        req.body.courseName,
        req.body.description,
        req.body.dateCreated,
        req.body.dateUpdated,
        req.body.currentHandle,
        req.body.status
      ];
      console.log(VALUES)
    // Execute the query
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