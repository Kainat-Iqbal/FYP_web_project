const DB = require("../DB/dbConfig");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// Helper function to hash passwords
const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Hashing error:", error);
    return null;
  }
};

// Route to add a new parent
const addParent = async (req, res) => {
  const { name, email, phone, cnic, password, studentJuwId } = req.body;

  // Check if the student's JUW ID exists
  const studentQuery = `SELECT studentId FROM student WHERE juwId = ?`;
  DB.query(studentQuery, [studentJuwId], async (err, studentResult) => {
    if (err) {
      console.error("Error checking student:", err);
      return res.status(500).json({ success: false, message: "Failed to check student" });
    }

    if (studentResult.length === 0) {
      return res.status(400).json({ success: false, message: "Student not found with this JUW ID" });
    }

    const studentId = studentResult[0].studentId;
    // Check if a parent is already registered for this student
    const checkParentQuery = `SELECT * FROM parents WHERE studentId = ?`;
    DB.query(checkParentQuery, [studentId], async (err, parentResult) => {
      if (err) {
        console.error("Error checking parent:", err);
        return res.status(500).json({ success: false, message: "Failed to check parent" });
      }

      if (parentResult.length > 0) {
        return res.status(400).json({ success: false, message: "A parent is already registered for this student" });
      }
    // Check if the email already exists in the system
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

    DB.query(checkEmailQuery, [email, email, email, email, email, email, email], async (err, result) => {
      if (err) {
        console.error("Error checking email:", err);
        return res.status(500).json({ success: false, message: "Failed to check email" });
      }

      if (result.length > 0) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      } else {
        // Encrypt the parent's password
        const hashedPassword = await hashPassword(password);

        const addParentQuery = `
          INSERT INTO parents (studentId, name, email, phone, cnic, password) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        const VALUES = [
          studentId,
          name,
          email,
          phone,
          cnic,
          hashedPassword
        ];

        DB.query(addParentQuery, VALUES, (err, data) => {
          if (err) {
            console.error("Error adding parent:", err);
            return res.status(500).json({ success: false, message: "Failed to add parent" });
          } else {
            console.log("Parent added successfully");
            return res.json({ success: true, message: "Parent added successfully" });
          }
        });
      }
    });
  });
});
};


module.exports = {
  addParent
};
