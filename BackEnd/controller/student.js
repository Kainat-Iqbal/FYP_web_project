const DB = require("../DB/dbConfig");

const addStudent = async (req, res) => {
    // Query to fetch all teachers from the database
    const adminId = req.body.adminId;
    console.log("adminId",adminId)
    const queryToAddStudent = "INSERT INTO `student`(`batchId`, `name`, `juwId`, `fatherName`, `email`, `password`, `CNIC`, `address`, `enrollment`, `seatNo`, `photo`, `dateOfAdmission`, `date_of_completion`, `matricMarks`, `matricPercentage`, `interMarks`, `interPercentage`, `position`, `status`, `degreeAwarded`, `transcriptIssued`) VALUES  (?)";
    const VALUES = [
        req.body.batchId,
        req.body.name,
        req.body.juwId,
        req.body.fatherName,
        req.body.email,
        req.body.password,
        req.body.CNIC,
        req.body.address,
        req.body.enrollment,
        req.body.seatNo,
        req.body.photo,
        req.body.dateOfAdmission,
        req.body.date_of_completion,
        req.body.matricMarks,
        req.body.matricPercentage,
        req.body.interMarks,
        req.body.interPercentage,
        req.body.position,
        req.body.status,
        req.body.degreeAwarded,
        req.body.transcriptIssued,
        req.body.phoneNo
      ];
      console.log(VALUES)
    // Execute the query
    DB.query(queryToAddStudent, [VALUES], (err, data) => {
        if (err) {
            console.error("Error adding student:", err);
            return res
              .status(500)
              .json({ success: false, message: "Failed to add student" });
          } 
          else {
            console.log("student added successfully");
            return res.json("success");
          }
    });
};

const viewStudent = async (req, res) => {
    // Query to fetch all teachers from the database
    const queryToViewStudent = "SELECT * FROM student";
    // Execute the query
    DB.query(queryToViewStudent, (err, results) => {
        if (err) {
            console.error("Error fetching student:", err);
            return res.status(500).json("Failed to fetch stdent");
        } 
        else {
            // If there are results, return them
            if (results.length > 0) {
                // console.log(results)
                return res.json(results);
            } 
            else {
                // If no teachers are found, return an appropriate message
                return res.json("No student found");
            }
        }
    });
  };

module.exports = {addStudent,viewStudent}