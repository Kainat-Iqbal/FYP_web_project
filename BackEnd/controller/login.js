const DB = require("../DB/dbConfig");
const bcrypt = require("bcryptjs");

// Helper function to verify hashed passwords
const verifyPassword = async (password, hashedPassword) => {
  console.log(
    "Verifying password. Types:",
    typeof password,
    typeof hashedPassword
  );
  if (typeof password !== "string" || typeof hashedPassword !== "string") {
    console.log(
      "Invalid types for password or hashedPassword:",
      typeof password,
      typeof hashedPassword
    );
    throw new Error("data and hash must be strings");
  }
  return await bcrypt.compare(password, hashedPassword);
};

const Login = async (req, res) => {
  const { email } = req.body;
  let password = req.body.password;

  // Ensure password is a string
  if (Array.isArray(password)) {
    password = password[0];
  }
  console.log("first",email,password)


  const queryForAdmin = "SELECT * FROM admin WHERE `adminEmail` = ?";
  const queryForHod = "SELECT * FROM hod WHERE `email` = ?";
  const queryForDean = "SELECT * FROM dean WHERE `email` = ?";
  const queryForExamination =
    "SELECT * FROM examination_controller WHERE `email` = ?";
  const queryForTeacher = "SELECT * FROM teacher WHERE `email` = ?";
  const queryForStudent = "SELECT * FROM student WHERE `email` = ?"; // New student query

  let loginSuccess = false;

  // Admin login
  DB.query(queryForAdmin, [email], async (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (data.length > 0) {
      const hashedPassword = data[0].adminPassword;
      if (await verifyPassword(password, hashedPassword)) {
        req.session.user = data[0].adminEmail;
        req.session.userId = data[0].adminId;
        req.session.userName = data[0].name;
        loginSuccess = true;
        return res.json("Admin");
      }
    } else {
      // HOD login
      DB.query(queryForHod, [email], async (err, data) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
        if (data.length > 0) {
          const hashedPassword = data[0].password;
          if (await verifyPassword(password, hashedPassword)) {
            req.session.user = data[0].email;
            req.session.userId = data[0].HODId;
            req.session.userName = data[0].name;
            loginSuccess = true;
            return res.json("HOD");
          }
        } else {
          // Dean login
          DB.query(queryForDean, [email], async (err, data) => {
            if (err) {
              return res.status(500).json({ message: "Internal Server Error" });
            }
            if (data.length > 0) {
              const hashedPassword = data[0].password;
              if (await verifyPassword(password, hashedPassword)) {
                req.session.user = data[0].email;
                req.session.userId = data[0].deanId;
                req.session.userName = data[0].name;
                loginSuccess = true;
                return res.json("Dean");
              }
            } else {
              // Examination login
              DB.query(queryForExamination, [email], async (err, data) => {
                if (err) {
                  return res
                    .status(500)
                    .json({ message: "Internal Server Error" });
                }
                if (data.length > 0) {
                  const hashedPassword = data[0].password;
                  if (await verifyPassword(password, hashedPassword)) {
                    req.session.user = data[0].email;
                    req.session.userId = data[0].examinationId;
                    req.session.userName = data[0].name;
                    loginSuccess = true;
                    return res.json("Examination");
                  }
                } else {
                  // Teacher login
                  DB.query(queryForStudent, [email], async (err, data) => {
                    if (err) {
                      return res
                        .status(500)
                        .json({ message: "Internal Server Error" });
                    }
                    if (data.length > 0) {
                      const hashedPassword = data[0].password;
                      if (await verifyPassword(password, hashedPassword)) {
                        req.session.user = data[0].email;
                        req.session.userId = data[0].juwId;
                        req.session.userName = data[0].name;
                        loginSuccess = true;
                        console.log("try for student")
                        return res.json("Student");
                      }
                    } else {
                      // Student login
                      DB.query(queryForTeacher, [email], async (err, data) => {
                        if (err) {
                          return res
                            .status(500)
                            .json({ message: "Internal Server Error" });
                        }
                        if (data.length > 0) {
                          const hashedPassword = data[0].password;
                          if (await verifyPassword(password, hashedPassword)) {
                            req.session.user = data[0].email;
                            req.session.userId = data[0].teacherId;
                            req.session.userName = data[0].name;
                            req.session.userDesignation = data[0].designation;
                            loginSuccess = true;
                            return res.json("Teacher");
                          }
                        } else {
                          if (!loginSuccess) {
                            return res.json("Failed");
                          }
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

module.exports = { Login /* ,Logout */ };
