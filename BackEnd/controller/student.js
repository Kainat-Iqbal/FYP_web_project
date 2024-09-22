const DB = require("../DB/dbConfig");

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Hashing error:", error);
    return null;
  }
};

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
    DB.query(checkEmailQuery, [email, email, email, email, email, email, email], async (err, result) => {
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
                // Encrypt the password
                const hashedPassword = await hashPassword(req.body.password);

        const VALUES = [
          req.body.batchId,
          req.body.name,
          req.body.juwId,
          req.body.fatherName,
          req.body.email,
          hashedPassword,
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

  const viewStudentPieChart = async (req, res) => {
    // Query to fetch all teachers from the database
    const queryToViewStudent = `SELECT 
    s.studentId, 
    s.name, 
    b.year,
    b.session,
    AVG(r.GPA) AS CGPA,
    SUM(CASE WHEN r.GPA >= 2.00 THEN 1 ELSE 0 END) AS passCount,
    SUM(CASE WHEN r.GPA < 2.00 THEN 1 ELSE 0 END) AS failCount
FROM 
    student s
JOIN 
    result r ON s.studentId = r.studentId
JOIN 
    batch b ON s.batchId = b.batchId  -- Assuming batchId links the student to their batch
GROUP BY 
    s.studentId, s.name, b.year;
`;
    // Execute the query
    DB.query(queryToViewStudent, (err, results) => {
        if (err) {
            console.error("Error fetching student:", err);
            return res.status(500).json("Failed to fetch stdent pie chart data");
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

  const viewAllIndividualStudentDetails = async (req, res) => {
    // Query to fetch all student details along with their results and course titles
    const queryToViewStudent = `        SELECT 
            s.*,               -- All columns from the student table
            r.*,               -- All columns from the result table
            c.*,     -- Course title from the course table
            b.year,
            b.session,
            AVG(r.GPA) AS CGPA,
            SUM(CASE WHEN r.GPA >= 2.00 THEN 1 ELSE 0 END) AS passCount,
            SUM(CASE WHEN r.GPA < 2.00 THEN 1 ELSE 0 END) AS failCount
        FROM 
            student s
        JOIN 
            result r ON s.studentId = r.studentId
        JOIN 
            assign_course ac ON r.assignId = ac.assignId
        JOIN 
            course c ON ac.courseId = c.courseId
        JOIN 
            batch b ON s.batchId = b.batchId  -- Assuming batchId links the student to their batch
        WHERE 
            s.studentId = ?  -- Replace ? with actual studentId from the request params
        GROUP BY 
            s.studentId, r.assignId;  -- Group by student and course to get averages`;

    const studentId = req.params.studentId;  // Get studentId from request parameters

    // Execute the query
    DB.query(queryToViewStudent, [studentId], (err, results) => {
        if (err) {
            console.error("Error fetching student:", err);
            return res.status(500).json("Failed to fetch student pie chart data");
        } else {
            // If there are results, return them
            if (results.length > 0) {
                return res.json(results);
            } else {
                // If no students are found, return an appropriate message
                return res.json("No student found");
            }
        }
    });
};

const viewStudentDetailsAccordingToSemester = async (req, res) => {
  // Query to fetch all student details along with their results and course titles
  const queryToViewStudent = `SELECT 
    r.*,  -- All columns from the result table
    s.*,  -- All columns from the session table
    AVG(r.GPA) AS CGPA,  -- Calculate average CGPA for the student
    b.*   -- All columns from the batch table
FROM 
    result r
JOIN 
    assign_course ac ON r.assignId = ac.assignId
JOIN 
    session s ON ac.sessionId = s.sessionId
JOIN 
    batch b ON s.batchId = b.batchId  -- Join the batch table to get batch details
WHERE 
    r.studentId = ?  -- Use a placeholder for the specific student ID
GROUP BY 
    s.academic_year,  -- Group by academic year
    s.semester,       -- Group by semester
    b.batchId,       -- Include batchId if necessary for further sorting
    r.studentId      -- Include studentId to avoid grouping issues
ORDER BY 
    s.academic_year,  -- Order by academic year
    s.semester;       -- Order by semester to maintain order

`;

  const studentId = req.params.studentId;  // Get studentId from request parameters

  // Execute the query
  DB.query(queryToViewStudent, [studentId], (err, results) => {
      if (err) {
          console.error("Error fetching student:", err);
          return res.status(500).json("Failed to fetch student pie chart data");
      } else {
          // If there are results, return them
          if (results.length > 0) {
              return res.json(results);
          } else {
              // If no students are found, return an appropriate message
              return res.json("No student found");
          }
      }
  });
};


module.exports = {addStudent,viewStudent,viewStudentPieChart,viewAllIndividualStudentDetails,viewStudentDetailsAccordingToSemester}