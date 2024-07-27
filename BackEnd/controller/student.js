const DB = require("../DB/dbConfig");

const addStudent = async (req, res) => {
    const adminId = req.body.adminId;
    const email = req.body.email;
  
    console.log("adminId", adminId);
  
    // Query to check if the email exists in any table
    const checkEmailQuery = `
      SELECT 'exists' 
      FROM (
          SELECT email FROM dean WHERE email = ? 
          UNION
          SELECT adminEmail FROM admin WHERE adminEmail = ? 
          UNION
          SELECT email FROM examination_controller WHERE email = ?
          UNION
          SELECT email FROM parents WHERE email = ? 
          UNION
          SELECT email FROM student WHERE email = ?
          UNION
          SELECT email FROM teacher WHERE email = ? 
          UNION
          SELECT email FROM hod WHERE email = ?
      ) AS email_check
      LIMIT 1
    `;
  
    // Execute the email check query
    DB.query(checkEmailQuery, [email, email, email, email, email, email, email], (err, result) => {
      if (err) {
        console.error("Error checking email:", err);
        return res.status(500).json({ success: false, message: "Failed to check email" });
      }
  
      if (result.length > 0) {
        // Email already exists
        return res.json("emailAlreadyExist");
      } else {
        // Email does not exist, proceed with inserting the student
        const queryToAddStudent = `
          INSERT INTO student (
            batchId, name, juwId, fatherName, email, password, CNIC, address, enrollment, seatNo, 
            photo, dateOfAdmission, date_of_completion, matricMarks, matricPercentage, interMarks, 
            interPercentage, position, status, degreeAwarded, transcriptIssued, phoneNo
          ) VALUES (?)
        `;
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
        console.log(VALUES);
  
        // Execute the query
        DB.query(queryToAddStudent, [VALUES], (err, data) => {
          if (err) {
            console.error("Error adding student:", err);
            return res.status(500).json({ success: false, message: "Failed to add student" });
          } else {
            console.log("Student added successfully");
            return res.json("success");
          }
        });
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